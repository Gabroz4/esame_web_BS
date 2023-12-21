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
exports.authorFromID = exports.allAuthors = void 0;
const db_1 = require("../utils/db");
function allAuthors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT username, nome, GROUP_CONCAT(DISTINCT nomecategoria) as argomenti
     FROM categoria, articolo, autore, articolo_ha_categoria
     WHERE idarticolo=articolo AND categoria=idcategoria AND autore=idautore AND attivo=1
     GROUP BY username, nome`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.allAuthors = allAuthors;
function authorFromID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT username, nome, GROUP_CONCAT(DISTINCT nomecategoria) as argomenti
     FROM categoria, articolo, autore, articolo_ha_categoria
     WHERE idarticolo=articolo AND categoria=idcategoria AND autore=idautore AND attivo=1 AND idautore=?
     GROUP BY username, nome`, [req.params.id], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.authorFromID = authorFromID;
