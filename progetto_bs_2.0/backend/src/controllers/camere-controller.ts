import { Request, Response } from "express";
import { connection } from "../utils/db";
import fs from "fs";
import path from "path";

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
  const { nomecamera, postiletto, prezzonotte, descrizione }: { nomecamera: string; postiletto: number; prezzonotte: number; descrizione: string } = req.body;

  // Verifica se req.files è un oggetto e se il campo immagini esiste
  const imgcamera1 = (req.files && 'immagini' in req.files) ? req.files['immagini'][0] : undefined;
  // Verifica se req.files è un oggetto e se il campo imgcamera2 esiste
  const imgcamera2 = (req.files && 'imgcamera2' in req.files) ? req.files['imgcamera2'][0] : undefined;
  console.log('Contenuto di req.files:', req.files);
  console.log('Contenuto di imgcamera1:', imgcamera1);

  try {
    if (!nomecamera || !postiletto || !prezzonotte) {
      return res.json({ success: false, message: 'Compila tutti i campi del modulo' });
    }

    const query = 'INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`, `descrizione`, `imgcamera1`, `imgcamera2`) VALUES (?, ?, ?, ?, ?, ?)';
    const [results] = await connection.promise().query(query, [nomecamera, postiletto, prezzonotte, descrizione, imgcamera1?.originalname || null, imgcamera2?.originalname || null]);

    // Salva le immagini nella cartella public/img
    if (imgcamera1) {
      console.log('nell\'if imgcamera1');
      const img1Path = path.join(__dirname, '../../public/img', imgcamera1.originalname);
      fs.writeFileSync(img1Path, imgcamera1.buffer);
      console.log('Percorso immagine 1:', img1Path);
      console.log('Contenuto immagine 1:', imgcamera1);
    }

    if (imgcamera2) {
      const img2Path = path.join(__dirname, '../../public/img', imgcamera2.originalname);
      fs.writeFileSync(img2Path, imgcamera2.buffer);
    }


   

    res.json({ success: true, message: 'Stanza creata con successo' });
  } catch (err) {
    console.error('Errore nella query al database:', err);
    res.json({ success: false, message: 'Errore durante la creazione della stanza - backend' });
  }
}
