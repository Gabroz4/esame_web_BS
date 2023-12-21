"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articoli_router_1 = __importDefault(require("./routes/articoli-router"));
const categorie_router_1 = __importDefault(require("./routes/categorie-router"));
const autori_router_1 = __importDefault(require("./routes/autori-router"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.static("dist-frontend"));
app.use(articoli_router_1.default);
app.use(categorie_router_1.default);
app.use(autori_router_1.default);
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina non trovata");
});
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});
