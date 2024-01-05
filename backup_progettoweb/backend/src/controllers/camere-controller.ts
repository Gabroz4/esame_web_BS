import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allRooms(req: Request, res: Response) {
  connection.execute(
    `SELECT *
     FROM camere`,
    [],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Errore Server" });
        return;
      }
      res.json(results);
    }
  );
}

export async function oneRoom(req: Request, res: Response) {
  connection.execute(
    `SELECT *
     FROM camere
     WHERE nomecamera = ?`,
    [req.params.nomecamera],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Errore Server" });
        return;
      }
      res.json(results);
    }
  );
}

export async function creaStanza(req: Request, res: Response) {
  const { nomecamera, postiletto, prezzonotte, descrizione, imgcamera1, imgcamera2 }: { nomecamera: string; postiletto: number; prezzonotte: number; descrizione: string; imgcamera1: string; imgcamera2: string } = req.body;

  try {
    if (!nomecamera || !postiletto || !prezzonotte) {
      return res.json({ success: false, message: 'Compila tutti i campi del modulo' });
    }

    const query = 'INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`, `descrizione`, `imgcamera1`, `imgcamera2`) VALUES (?, ?, ?, ?, ?, ?)';
    const [results] = await connection.promise().query(query, [nomecamera, postiletto, prezzonotte, descrizione, imgcamera1, imgcamera2]);

    res.json({ success: true, message: 'Stanza creata con successo' });
  } catch (err) {
    console.error('Errore nella query al database:', err);
    res.json({ success: false, message: 'Errore durante la creazione della stanza' });
  }
}