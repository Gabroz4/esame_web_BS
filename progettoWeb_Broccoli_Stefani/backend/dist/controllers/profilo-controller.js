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
exports.getProfileAndPrenotazioni = void 0;
const db_1 = require("../utils/db");
//funzione per cercare un profilo e le prenotazioni data l'email
function getProfileAndPrenotazioni(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT nome, cognome, email 
     FROM utente 
     WHERE email = ?`, [req.params.email], function (err, profileResults) {
            if (err) {
                console.error('Errore nel recupero del profilo utente:', err);
                res.status(500).json({ success: false, message: 'Errore del server' });
                return;
            }
            //controllo del tipo di userprofile
            if (!Array.isArray(profileResults) || profileResults.length === 0) {
                res.status(404).json({ error: "Utente non trovato" });
                return;
            }
            const userProfile = profileResults[0];
            //query per ottenere le prenotazioni di un determinato utente data l'email
            db_1.connection.execute(`SELECT p.*, c.descrizione AS descrizione_camera
         FROM prenotazione AS p
         JOIN camere AS c ON p.nomecamera = c.nomecamera
         WHERE p.email = ?`, [req.params.email], function (err, prenotazioniResults) {
                if (err) {
                    console.error('Errore nel recupero delle prenotazioni utente:', err);
                    res.status(500).json({ success: false, message: 'Errore del server' });
                    return;
                }
                //il risultato sarà composto sia dal profilo ottenuto che dalle prenotazioni di quell'utente
                const responseData = {
                    profile: userProfile,
                    prenotazioni: prenotazioniResults,
                };
                res.json(responseData);
            });
        });
    });
}
exports.getProfileAndPrenotazioni = getProfileAndPrenotazioni;
