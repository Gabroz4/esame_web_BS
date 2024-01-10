"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const camere_router_1 = __importDefault(require("./routes/camere-router"));
const user_router_1 = __importDefault(require("./routes/user-router"));
const registrazione_router_1 = __importDefault(require("./routes/registrazione-router"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const prenotazione_router_1 = __importDefault(require("./routes/prenotazione-router"));
const profilo_router_1 = __importDefault(require("./routes/profilo-router"));
const profiloadmin_router_1 = __importDefault(require("./routes/profiloadmin-router"));
const path_1 = __importDefault(require("path"));
//creazione del server express
const app = (0, express_1.default)();
const port = 3000;
//gestione delle route storiche
app.use((0, connect_history_api_fallback_1.default)());
//middleware per il parsing dei dati
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//middleware per la gestione delle route statiche
app.use('/img', express_1.default.static('public/img'));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../frontend/dist')));
//gestione dei vari router
app.use(camere_router_1.default);
app.use(user_router_1.default);
app.use(prenotazione_router_1.default);
app.use(profilo_router_1.default);
app.use(profiloadmin_router_1.default);
app.use(registrazione_router_1.default);
//gestione della risposta per le pagine non trovate
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Ops... Pagina non trovata');
});
//avvio del server sulla porta specificata
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
