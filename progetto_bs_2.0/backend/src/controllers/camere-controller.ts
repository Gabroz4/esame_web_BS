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
};

export async function creaStanza(req: Request, res: Response) {
  const { nomecamera, postiletto, prezzonotte, descrizione }: { nomecamera: string; postiletto: number; prezzonotte: number; descrizione: string } = req.body;

  // Verifica se req.files è un oggetto e se il campo immagini esiste
  const imgcamera1 = (req.files && 'imgcamera1' in req.files) ? req.files['imgcamera1'][0] : undefined;
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
    if (imgcamera1 && imgcamera1.buffer) {
      const img1Path = path.join(__dirname, '../../public/img', imgcamera1.originalname);
      try {
        await fs.promises.writeFile(img1Path, imgcamera1.buffer.toString('binary'), 'binary');
        console.log('File written successfully:', img1Path);
      } catch (error) {
        console.error('Error writing file:', error);
        throw error;
      }
    }
    
    // Save image 2
    if (imgcamera2 && imgcamera2.buffer) {
      const img2Path = path.join(__dirname, '../../public/img', imgcamera2.originalname);
      try {
        await fs.promises.writeFile(img2Path, imgcamera2.buffer.toString('binary'), 'binary');
        console.log('File written successfully:', img2Path);
      } catch (error) {
        console.error('Error writing file:', error);
        throw error;
      }
    }

    res.json({ success: true, message: 'Stanza creata con successo' });
  } catch (error: any) {
    console.error('Errore durante la gestione della richiesta:', error);
    
    // Log dettagli sull'errore
    if (error instanceof Error) {
      console.error('Tipo di errore:', error.name);
      console.error('Messaggio di errore:', error.message);
      console.error('Stack trace:', error.stack);
    }
    
    // Se è un errore legato a fs.promises.writeFile, aggiungi un log specifico
    if (error.code === 'ERR_INVALID_ARG_TYPE') {
      console.error('Errore durante la scrittura del file:', error.message);
    }
  
    // Invia una risposta dettagliata al client
    res.status(500).json({ success: false, message: 'Errore interno del server durante la creazione della stanza', errorDetails: error.message });
  }
}


