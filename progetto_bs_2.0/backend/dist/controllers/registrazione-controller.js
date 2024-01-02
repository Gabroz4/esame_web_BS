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
exports.registraUtente = void 0;
const db_1 = require("../utils/db");
const crypto_1 = require("crypto");
function registraUtente(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, cognome, email, password } = req.body;
        try {
            if (!nome || !cognome || !email || !password) {
                return res.json({ success: false, message: 'Per favore, compila tutti i campi del modulo' });
            }
            const hashedPassword = (0, crypto_1.createHash)('sha512').update(password).digest('hex').substring(0, 45);
            const query = 'INSERT INTO utente (nome, cognome, email, password) VALUES (?, ?, ?, ?)';
            const [results] = yield db_1.connection.promise().query(query, [nome, cognome, email, hashedPassword]);
            res.json({ success: true, message: 'Registrazione avvenuta con successo' });
        }
        catch (err) {
            console.error('Errore nella query al database:', err);
            res.json({ success: false, message: 'Errore durante la registrazione' });
        }
    });
}
exports.registraUtente = registraUtente;
