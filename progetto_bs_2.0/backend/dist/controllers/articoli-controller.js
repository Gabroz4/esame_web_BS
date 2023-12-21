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
exports.articlesOfAuthor = exports.articlesOfCategory = exports.articleFromID = exports.lastNArticles = exports.allArticles = void 0;
const db_1 = require("../utils/db");
function allArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idarticolo, titoloarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore
     WHERE idautore=autore`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.allArticles = allArticles;
function lastNArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idarticolo, titoloarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore WHERE idautore=autore
     ORDER BY dataarticolo DESC LIMIT ?`, [req.params.n], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.lastNArticles = lastNArticles;
function articleFromID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idarticolo, titoloarticolo, dataarticolo, testoarticolo, imgarticolo, nome
     FROM articolo, autore
     WHERE idautore=autore AND idarticolo=?`, [req.params.id], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.articleFromID = articleFromID;
function articlesOfCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idarticolo, titoloarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore, articolo_ha_categoria
     WHERE idarticolo=articolo AND autore=idautore AND categoria = ?`, [req.params.idcategory], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.articlesOfCategory = articlesOfCategory;
function articlesOfAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore
     WHERE autore=idautore AND autore = ?`, [req.params.idautore], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.articlesOfAuthor = articlesOfAuthor;
