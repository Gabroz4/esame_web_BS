"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const camere_router_1 = __importDefault(require("./routes/camere-router"));
/*import categorieRouter from "./routes/categorie-router";
import autoriRouter from "./routes/autori-router";*/
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.static("dist-frontend"));
// Usa bodyParser per analizzare il corpo delle richieste POST
app.use(body_parser_1.default.json());
app.use(camere_router_1.default);
/*app.use(categorieRouter);
app.use(autoriRouter);*/
// Aggiungi il tuo endpoint di login qui
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // Qui dovresti verificare l'email e la password con il tuo database
    // Per ora, useremo un controllo fittizio
    if (email === 'test@example.com' && password === 'password') {
        res.json({ success: true });
    }
    else {
        res.json({ success: false });
    }
});
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina non trovata");
});
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
