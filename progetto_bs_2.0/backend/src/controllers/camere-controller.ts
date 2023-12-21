import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function oneRoom(req: Request, res: Response) {
  connection.execute(
    `SELECT nomecamera, postiletto, prezzonotte, descrizione
     FROM camere
     WHERE idnomecamera=nomecamera`,
    [req.params.idnomecamera],
    function (err, results, fields) {
      res.json(results)
    }
  )
}
/*
export async function lastNArticles(req: Request, res: Response) {
  connection.execute(
    `SELECT idarticolo, titoloarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore WHERE idautore=autore
     ORDER BY dataarticolo DESC LIMIT ?`,
    [req.params.n],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function articleFromID(req: Request, res: Response) {
  connection.execute(
    `SELECT idarticolo, titoloarticolo, dataarticolo, testoarticolo, imgarticolo, nome
     FROM articolo, autore
     WHERE idautore=autore AND idarticolo=?`,
    [req.params.id],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function articlesOfCategory(req: Request, res: Response) {
  connection.execute(
    `SELECT idarticolo, titoloarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore, articolo_ha_categoria
     WHERE idarticolo=articolo AND autore=idautore AND categoria = ?`,
    [req.params.idcategory],
    function (err, results, fields) {
      res.json(results)
    }
  )
}

export async function articlesOfAuthor(req: Request, res: Response) {
  connection.execute(
    `SELECT idarticolo, dataarticolo, anteprimaarticolo, imgarticolo, nome
     FROM articolo, autore
     WHERE autore=idautore AND autore = ?`,
    [req.params.idautore],
    function (err, results, fields) {
      res.json(results)
    }
  )
}*/
