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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const camereController = __importStar(require("../controllers/camere-controller"));
//libreria per la gestione del caricamento di file multipart/form-data
const multer_1 = __importDefault(require("multer"));
/*
C:/Users/tomma/Desktop/Esame-Web/esame_web_BS/progetto_bs_2.0/backend/public/img
C:/Users/gabri/Desktop/informatica/secondo_anno/ingegneria_dei_sistemi_web/esame_web_BS/progetto_bs_2.0/backend/public/img

percorsi assoluti dei nostri pc
*/
const router = (0, express_1.Router)();
//configurazione del caricamento di file
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        //percorso di destinazione delle imamgini
        cb(null, 'C:/Users/gabri/Desktop/informatica/secondo_anno/ingegneria_dei_sistemi_web/esame_web_BS/progetto_bs_2.0/backend/public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
}).fields([
    { name: 'imgcamera1', maxCount: 1 },
    { name: 'imgcamera2', maxCount: 1 },
]);
router.get("/api/camere", camereController.allRooms);
router.get("/api/camere/:nomecamera", camereController.oneRoom);
router.post('/api/admin/nuova-camera', upload, camereController.creaStanza);
exports.default = router;
