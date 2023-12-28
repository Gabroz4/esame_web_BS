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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const camere_router_1 = __importDefault(require("./routes/camere-router"));
const db_1 = require("./utils/db");
const crypto_1 = require("crypto");
// Creazione di un'app Express
const app = (0, express_1.default)();
// Porta su cui il server ascolterà
const port = 3000;
// Middleware per la gestione delle route storiche
app.use(require('connect-history-api-fallback')());
// Utilizzo di middleware per il parsing dei dati JSON e URL-encoded
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Middleware per la gestione delle route statiche
app.use(express_1.default.static('public'));
app.use(express_1.default.static('dist-frontend'));
// Usa bodyParser per analizzare il corpo delle richieste POST
app.use(body_parser_1.default.json());
//stampa di tutte le camere nel db
app.use(camere_router_1.default);
// Endpoint di login
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Estrazione di email e password dalla richiesta
    const { email, password } = req.body;
    try {
        // Prevenzione dell'invio del modulo se i campi sono vuoti
        if (!email || !password) {
            return res.json({ success: false, message: 'Per favore, inserisci sia l\'email che la password' });
        }
        // Query per cercare l'utente nel database
        const query = 'SELECT email,password FROM utente WHERE email = ? AND password = ?';
        var hashedPassword = (0, crypto_1.createHash)('sha512').update(password).digest('hex');
        hashedPassword = hashedPassword.substring(0, 45);
        // Esecuzione della query nel database
        const [results] = yield db_1.connection.promise().query(query, [email, hashedPassword]);
        console.log('Risultati:', results);
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
}));
// Gestione della risposta per le pagine non trovate
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Ops... Pagina non trovata');
});
// Avvio del server sulla porta specificata
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
