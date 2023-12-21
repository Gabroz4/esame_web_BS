import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allCategories(req: Request, res: Response) {
  connection.execute(
    `SELECT idcategoria, nomecategoria
     FROM categoria`,
    [],
    function(err, results, fields) {
      res.json(results)
    }
  )
}

export async function categoryFromID(req: Request, res: Response) {
  connection.execute(
    `SELECT idcategoria, nomecategoria
     FROM categoria
     WHERE idcategoria=?`,
    [req.params.id],
    function(err, results, fields) {
      res.json(results)
    }
  )
}
