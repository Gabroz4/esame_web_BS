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
exports.eliminaPrenotazione = exports.inserisciPrenotazione = void 0;
const db_1 = require("../utils/db");
// Funzione per inserire una nuova prenotazione
function inserisciPrenotazione(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Estrai i dati dalla richiesta
        const { datainizio, datafine, prezzo, nomecamera, userToken, emailToken } = req.body;
        try {
            // Verifica se l'utente è loggato
            if (userToken != 'IsLoggedIn') {
                return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
            }
            // Verifica se tutti i campi sono stati compilati
            if (!datainizio || !datafine || !prezzo || !nomecamera) {
                return res.status(400).json({ success: false, message: 'Per favore, compila tutti i campi del modulo' });
            }
            // Verifica se la camera è disponibile per le date specificate
            const cameraDisponibile = yield verificaDisponibilitaCamera(nomecamera, datainizio, datafine);
            // Se la camera non è disponibile, restituisci un errore
            if (!cameraDisponibile) {
                return res.status(400).json({ success: false, message: 'La camera non è disponibile per le date selezionate' });
            }
            // Verifica se l'utente è autorizzato
            if (userToken !== 'IsLoggedIn' && userToken !== 'Admin') {
                return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
            }
            // Inserisci la nuova prenotazione nel database
            const query = 'INSERT INTO prenotazione (datainizio, datafine, prezzo, email, nomecamera) VALUES (?, ?, ?, ?, ?)';
            const [results] = yield db_1.connection.promise().query(query, [datainizio, datafine, prezzo, emailToken, nomecamera]);
            // Restituisci un messaggio di successo
            res.status(201).json({ success: true, message: 'Prenotazione inserita con successo' });
        }
        catch (err) {
            // Gestisci gli errori
            if (err.message === 'Camera già prenotata in quel periodo') {
                return res.status(400).json({ success: false, message: 'La camera è già prenotata per le date selezionate' });
            }
            else {
                return res.status(500).json({ success: false, message: 'Errore durante l\'inserimento della prenotazione', error: err.message });
            }
        }
    });
}
exports.inserisciPrenotazione = inserisciPrenotazione;
;
// Funzione per verificare la disponibilità della camera per le date specificate
function verificaDisponibilitaCamera(nomecamera, datainizio, datafine) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        // Query per controllare se la camera è già prenotata
        const query = 'SELECT COUNT(*) as count FROM prenotazione WHERE nomecamera = ? AND ((datainizio <= ? AND datafine >= ?) OR (datainizio <= ? AND datafine >= ?) OR (datainizio >= ? AND datafine <= ?))';
        try {
            // Esegui la query
            const [results] = yield db_1.connection.promise().query(query, [nomecamera, datainizio, datainizio, datafine, datafine, datainizio, datafine]);
            // Estrai la proprietà count dal primo risultato
            const count = (_b = (_a = results[0]) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0;
            // Se la camera è già prenotata, lancia un errore
            if (count !== 0) {
                throw new Error('Camera già prenotata in quel periodo');
            }
            // Se count è 0, la camera è disponibile
            return count === 0;
        }
        catch (error) {
            // Gestione dell'errore
            throw error;
        }
    });
}
function eliminaPrenotazione(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Estrai l'id della prenotazione dalla richiesta
        const prenotazioneId = parseInt(req.params.id, 10);
        try {
            // Verifica se l'utente è autorizzato
            const userToken = req.headers.authorization || '';
            const adminToken = req.headers.authorization || '';
            if (userToken !== 'IsLoggedIn' && adminToken !== 'Admin') {
                return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
            }
            // Verifica se l'id della prenotazione è valido
            if (isNaN(prenotazioneId)) {
                return res.status(400).json({ success: false, message: 'ID prenotazione non valido' });
            }
            // Esegui la query per eliminare la prenotazione
            const query = 'DELETE FROM prenotazione WHERE id = ?';
            const [results] = yield db_1.connection.promise().query(query, [prenotazioneId]);
            // Verifica se la prenotazione è stata eliminata con successo
            if ('affectedRows' in results && results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Prenotazione non trovata' });
            }
            // Restituisci un messaggio di successo
            res.json({ success: true, message: 'Prenotazione eliminata con successo' });
        }
        catch (err) {
            // Gestisci gli errori
            return res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione della prenotazione', error: err.message });
        }
    });
}
exports.eliminaPrenotazione = eliminaPrenotazione;
