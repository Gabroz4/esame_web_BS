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
exports.eliminaPrenotazione = exports.fetchPrenotazioni = void 0;
const db_1 = require("../utils/db");
function fetchPrenotazioni(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM prenotazione';
            const [results] = yield db_1.connection.promise().query(query);
            res.json(results);
        }
        catch (error) {
            console.error('Errore nella query al database:', error);
            res.status(500).json({ success: false, message: 'Errore durante il recupero delle prenotazioni' });
        }
    });
}
exports.fetchPrenotazioni = fetchPrenotazioni;
function eliminaPrenotazione(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const prenotazioneId = req.params.id;
        try {
            const query = 'DELETE FROM prenotazione WHERE id = ?';
            yield db_1.connection.promise().query(query, [prenotazioneId]);
            res.json({ success: true, message: 'Prenotazione eliminata con successo' });
        }
        catch (error) {
            console.error('Errore nella query al database:', error);
            res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione della prenotazione' });
        }
    });
}
exports.eliminaPrenotazione = eliminaPrenotazione;
