"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profiloController = __importStar(require("../controllers/profiloadmin-controller"));
const router = (0, express_1.Router)();
//restituisce tutte le prenotazioni
router.get('/api/prenotazioni', profiloController.fetchPrenotazioni);
//restituisce tutte le camere
router.get('/api/camere', profiloController.fetchCamere);
//richiama la funzione per la cancellazione della prenotazione dato l'id
router.delete('/api/prenotazioni/:id', profiloController.eliminaPrenotazione);
//richiama la funzione per la cancellazione della camera dato il nome
router.delete('/api/camere/:nomecamera', profiloController.eliminaCamera);
//richiama la funzione per la modifica di una camera dato il nome
router.put('/api/camere/:nomecamera', profiloController.modificaCamera);
exports.default = router;
