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
exports.login = void 0;
const db_1 = require("../utils/db");
const crypto_1 = require("crypto");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Estrazione di email e password dalla richiesta
        const { email, password } = req.body;
        try {
            // Prevenzione dell'invio del modulo se i campi sono vuoti
            if (!email || !password) {
                return res.json({ success: false, message: 'Per favore, inserisci sia l\'email che la password' });
            }
            // Hash della password
            const hashedPassword = (0, crypto_1.createHash)('sha512').update(password).digest('hex').substring(0, 45);
            // Query per cercare l'utente nel database
            const query = 'SELECT email, password FROM utente WHERE email = ? AND password = ?';
            // Esecuzione della query nel database
            const [results] = yield db_1.connection.promise().query(query, [email, hashedPassword]);
            // Verifica se ci sono risultati nella query
            if (Array.isArray(results) && results.length > 0) {
                // Utilizzo del tipo più preciso per results[0]
                const user = results[0];
                if (user) {
                    res.json({ success: true, message: 'Login riuscito' });
                }
                else {
                    res.json({ success: false, message: 'Credenziali non valide' });
                }
            }
            else {
                res.json({ success: false, message: 'Credenziali non valide' });
            }
        }
        catch (err) {
            console.error('Errore nella query al database:', err);
            res.json({ success: false, message: 'Errore nel login' });
        }
    });
}
exports.login = login;
