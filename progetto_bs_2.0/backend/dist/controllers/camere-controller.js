"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creaStanza = exports.oneRoom = exports.allRooms = void 0;
const db_1 = require("../utils/db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function allRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM camere`, [], function (err, results, fields) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Errore Server" });
                return;
            }
            res.json(results);
        });
    });
}
exports.allRooms = allRooms;
function oneRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM camere
     WHERE nomecamera = ?`, [req.params.nomecamera], function (err, results, fields) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Errore Server" });
                return;
            }
            res.json(results);
        });
    });
}
exports.oneRoom = oneRoom;
;
function creaStanza(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nomecamera, postiletto, prezzonotte, descrizione } = req.body;
        // Verifica se req.files è un oggetto e se il campo immagini esiste
        const imgcamera1 = (req.files && 'imgcamera1' in req.files) ? req.files['imgcamera1'][0] : undefined;
        const imgcamera2 = (req.files && 'imgcamera2' in req.files) ? req.files['imgcamera2'][0] : undefined;
        console.log('Contenuto di req.files:', req.files);
        console.log('Contenuto di imgcamera1:', imgcamera1);
        try {
            if (!nomecamera || !postiletto || !prezzonotte) {
                return res.json({ success: false, message: 'Compila tutti i campi del modulo' });
            }
            const query = 'INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`, `descrizione`, `imgcamera1`, `imgcamera2`) VALUES (?, ?, ?, ?, ?, ?)';
            const [results] = yield db_1.connection.promise().query(query, [nomecamera, postiletto, prezzonotte, descrizione, (imgcamera1 === null || imgcamera1 === void 0 ? void 0 : imgcamera1.originalname) || null, (imgcamera2 === null || imgcamera2 === void 0 ? void 0 : imgcamera2.originalname) || null]);
            // Salva le immagini nella cartella public/img
            if (imgcamera1 && imgcamera1.buffer) {
                const img1Path = path_1.default.join(__dirname, '../../public/img', imgcamera1.originalname);
                try {
                    yield fs_1.default.promises.writeFile(img1Path, imgcamera1.buffer.toString('binary'), 'binary');
                    console.log('File written successfully:', img1Path);
                }
                catch (error) {
                    console.error('Error writing file:', error);
                    throw error;
                }
            }
            // Save image 2
            if (imgcamera2 && imgcamera2.buffer) {
                const img2Path = path_1.default.join(__dirname, '../../public/img', imgcamera2.originalname);
                try {
                    yield fs_1.default.promises.writeFile(img2Path, imgcamera2.buffer.toString('binary'), 'binary');
                    console.log('File written successfully:', img2Path);
                }
                catch (error) {
                    console.error('Error writing file:', error);
                    throw error;
                }
            }
            res.json({ success: true, message: 'Stanza creata con successo' });
        }
        catch (error) {
            console.error('Errore durante la gestione della richiesta:', error);
            // Log dettagli sull'errore
            if (error instanceof Error) {
                console.error('Tipo di errore:', error.name);
                console.error('Messaggio di errore:', error.message);
                console.error('Stack trace:', error.stack);
            }
            // Se è un errore legato a fs.promises.writeFile, aggiungi un log specifico
            if (error.code === 'ERR_INVALID_ARG_TYPE') {
                console.error('Errore durante la scrittura del file:', error.message);
            }
            // Invia una risposta dettagliata al client
            res.status(500).json({ success: false, message: 'Errore interno del server durante la creazione della stanza', errorDetails: error.message });
        }
    });
}
exports.creaStanza = creaStanza;
