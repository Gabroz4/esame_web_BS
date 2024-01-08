"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const camere_router_1 = __importDefault(require("./routes/camere-router"));
const user_router_1 = __importDefault(require("./routes/user-router"));
const registrazione_router_1 = __importDefault(require("./routes/registrazione-router")); // Importa il router di registrazione
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const prenotazione_router_1 = __importDefault(require("./routes/prenotazione-router"));
const profilo_router_1 = __importDefault(require("./routes/profilo-router"));
const profiloadmin_router_1 = __importDefault(require("./routes/profiloadmin-router"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const camere_controller_1 = require("./controllers/camere-controller");
// Creazione di un'app Express
const app = (0, express_1.default)();
// Porta su cui il server ascolterà
const port = 3000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Middleware per la gestione delle route storiche
app.use((0, connect_history_api_fallback_1.default)());
// Utilizzo di middleware per il parsing dei dati JSON e URL-encoded
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Middleware per la gestione delle route statiche
//app.use(express.static('public'));
app.use('/img', express_1.default.static('public/img'));
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../frontend/dist')));
app.use(upload.array('immagini', 2));
// Usa bodyParser per analizzare il corpo delle richieste POST
app.use(body_parser_1.default.json());
// Usa i router per gestire le varie route
app.use(camere_router_1.default);
app.use(user_router_1.default);
app.use(prenotazione_router_1.default);
app.use(profilo_router_1.default);
app.use(profiloadmin_router_1.default);
app.use(registrazione_router_1.default); // Usa il router di registrazione
app.post('/api/admin/nuova-camera', upload.array('immagini', 2), camere_controller_1.creaStanza);
// Gestione della risposta per le pagine non trovate
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Ops... Pagina non trovata');
});
// Avvio del server sulla porta specificata
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
