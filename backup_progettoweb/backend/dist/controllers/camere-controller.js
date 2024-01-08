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
Object.defineProperty(exports, "__esModule", { value: true });
exports.creaStanza = exports.oneRoom = exports.allRooms = void 0;
const db_1 = require("../utils/db");
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
function creaStanza(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nomecamera, postiletto, prezzonotte, descrizione, imgcamera1, imgcamera2 } = req.body;
        try {
            if (!nomecamera || !postiletto || !prezzonotte) {
                return res.json({ success: false, message: 'Compila tutti i campi del modulo' });
            }
            const query = 'INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`, `descrizione`, `imgcamera1`, `imgcamera2`) VALUES (?, ?, ?, ?, ?, ?)';
            const [results] = yield db_1.connection.promise().query(query, [nomecamera, postiletto, prezzonotte, descrizione, imgcamera1, imgcamera2]);
            res.json({ success: true, message: 'Stanza creata con successo' });
        }
        catch (err) {
            console.error('Errore nella query al database:', err);
            res.json({ success: false, message: 'Errore durante la creazione della stanza' });
        }
    });
}
exports.creaStanza = creaStanza;
