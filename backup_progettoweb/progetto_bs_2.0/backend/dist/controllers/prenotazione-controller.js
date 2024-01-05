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
        const { datainizio, datafine, prezzo, nomecamera, userToken, emailToken } = req.body;
        try {
            if (userToken != 'IsLoggedIn') {
                return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
            }
            if (!datainizio || !datafine || !prezzo || !nomecamera) {
                return res.status(400).json({ success: false, message: 'Per favore, compila tutti i campi del modulo' });
            }
            if (userToken !== 'IsLoggedIn' && userToken !== 'Admin') {
                return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
            }
            const query = 'INSERT INTO prenotazione (datainizio, datafine, prezzo, email, nomecamera) VALUES (?, ?, ?, ?, ?)';
            const [results] = yield db_1.connection.promise().query(query, [datainizio, datafine, prezzo, emailToken, nomecamera]);
            res.status(201).json({ success: true, message: 'Prenotazione inserita con successo' });
        }
        catch (err) {
            console.error('Errore nella query al database:', err);
            res.status(500).json({ success: false, message: 'Errore durante l\'inserimento della prenotazione', error: err.message });
        }
    });
}
exports.inserisciPrenotazione = inserisciPrenotazione;
;
