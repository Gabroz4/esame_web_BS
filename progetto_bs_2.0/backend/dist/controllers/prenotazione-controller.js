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
exports.inserisciPrenotazione = void 0;
const db_1 = require("../utils/db");
function inserisciPrenotazione(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //estrae i dati dalla richiesta
        const { datainizio, datafine, prezzo, nomecamera, userToken, emailToken, } = req.body;
        try {
            //verifica se l'utente è loggato
            if (userToken != "IsLoggedIn") {
                return res
                    .status(401)
                    .json({ success: false, message: "Utente non autorizzato" });
            }
            //verifica se questi campi sono stati compilati
            if (!datainizio || !datafine || !prezzo || !nomecamera) {
                return res
                    .status(400)
                    .json({
                    success: false,
                    message: "Per favore, compila tutti i campi del modulo",
                });
            }
            //verifica se la camera è disponibile per le date specificate
            const cameraDisponibile = yield verificaDisponibilitaCamera(nomecamera, datainizio, datafine);
            //se la camera non è disponibile, restituisce errore
            if (!cameraDisponibile) {
                return res
                    .status(400)
                    .json({
                    success: false,
                    message: "La camera non è disponibile per le date selezionate",
                });
            }
            //verifica se l'utente è admin
            if (userToken !== "IsLoggedIn" && userToken !== "Admin") {
                return res
                    .status(401)
                    .json({ success: false, message: "Utente non autorizzato" });
            }
            //inserisce la nuova prenotazione nel database
            const query = "INSERT INTO prenotazione (datainizio, datafine, prezzo, email, nomecamera) VALUES (?, ?, ?, ?, ?)";
            const [results] = yield db_1.connection
                .promise()
                .query(query, [datainizio, datafine, prezzo, emailToken, nomecamera]);
            //successo
            res
                .status(201)
                .json({ success: true, message: "Prenotazione inserita con successo" });
        }
        catch (err) {
            //gestione degli errori (debugging)
            if (err.message === "Camera già prenotata in quel periodo") {
                return res
                    .status(400)
                    .json({
                    success: false,
                    message: "La camera è già prenotata per le date selezionate",
                });
            }
            else {
                return res
                    .status(500)
                    .json({
                    success: false,
                    message: "Errore durante l'inserimento della prenotazione",
                    error: err.message,
                });
            }
        }
    });
}
exports.inserisciPrenotazione = inserisciPrenotazione;
//verifica la disponibilità della camera per le date specificate
function verificaDisponibilitaCamera(nomecamera, datainizio, datafine) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT COUNT(*) as count 
  FROM prenotazione 
  WHERE nomecamera = ? AND ((datainizio <= ? AND datafine >= ?) 
  OR (datainizio <= ? AND datafine >= ?) 
  OR (datainizio >= ? AND datafine <= ?))`;
        try {
            //prova la query
            const [results] = yield db_1.connection
                .promise()
                .query(query, [
                nomecamera,
                datainizio,
                datainizio,
                datafine,
                datafine,
                datainizio,
                datafine,
            ]);
            //accede alla prima riga di risultati e recupera count, altrimenti assegna 0.
            const count = (_b = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0;
            //se la camera è già prenotata lancia un errore
            if (count !== 0) {
                throw new Error("Camera già prenotata in quel periodo");
            }
            //se count è 0 la camera è disponibile
            return count === 0;
        }
        catch (error) {
            throw error;
        }
    });
}
