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
//libreria per l'hashing della password
const crypto_1 = require("crypto");
//funzione per il login di un utente dati email e password
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            //se non sono stati inseriti i campi obbligatori restituisce errore
            if (!email || !password) {
                return res.json({ success: false, message: 'Per favore, inserisci sia l\'email che la password' });
            }
            //hashing della password con codifica sha512 e tagliata al 45esimo carattere(varchar(45) nel db)
            const hashedPassword = (0, crypto_1.createHash)('sha512').update(password).digest('hex').substring(0, 45);
            const query = 'SELECT email, password FROM utente WHERE email = ? AND password = ?';
            //esegue la query nel db 
            const [results] = yield db_1.connection.promise().query(query, [email, hashedPassword]);
            //se result esiste come array e ha contenuto
            if (Array.isArray(results) && results.length > 0) {
                /*
                record definisce user come un oggetto composto da una chiave(string)
                e un elemento di tipo unknown, a cui verrà assegnato il risultato della query
                contenente l'email(string) e la password(unknown)
                */
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
