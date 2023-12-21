import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allAuthors(req: Request, res: Response) {
  connection.execute(
    `SELECT username, nome, GROUP_CONCAT(DISTINCT nomecategoria) as argomenti
     FROM categoria, articolo, autore, articolo_ha_categoria
     WHERE idarticolo=articolo AND categoria=idcategoria AND autore=idautore AND attivo=1
     GROUP BY username, nome`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function authorFromID(req: Request, res: Response) {
  connection.execute(
    `SELECT username, nome, GROUP_CONCAT(DISTINCT nomecategoria) as argomenti
     FROM categoria, articolo, autore, articolo_ha_categoria
     WHERE idarticolo=articolo AND categoria=idcategoria AND autore=idautore AND attivo=1 AND idautore=?
     GROUP BY username, nome`,
    [req.params.id],
    function(err, results, fields) {
      res.json(results)
    }
  )
}
