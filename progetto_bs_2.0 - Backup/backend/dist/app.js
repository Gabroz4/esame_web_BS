"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const camere_router_1 = __importDefault(require("./routes/camere-router"));
const user_router_1 = __importDefault(require("./routes/user-router"));
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
// Usa il router utente per gestire il login
app.use(user_router_1.default);
// Gestione della risposta per le pagine non trovate
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Ops... Pagina non trovata');
});
// Avvio del server sulla porta specificata
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
