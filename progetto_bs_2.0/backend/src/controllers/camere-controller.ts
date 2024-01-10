import { Request, Response } from "express";
import { connection } from "../utils/db";
import fs from "fs";
import path from "path";

//funzione per chiamare tutte le stanze
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

//funzione per chiamare una singola stanza dato il nome
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

//funzione per creare una stanza
export async function creaStanza(req: Request, res: Response) {
  const {
    nomecamera,
    postiletto,
    prezzonotte,
    descrizione,
  }: {
    nomecamera: string;
    postiletto: number;
    prezzonotte: number;
    descrizione: string;
  } = req.body;

  //verifica se req.files è un oggetto e se le immagini esistono
  const imgcamera1 =
    req.files && "imgcamera1" in req.files
      ? req.files["imgcamera1"][0]
      : undefined;
  const imgcamera2 =
    req.files && "imgcamera2" in req.files
      ? req.files["imgcamera2"][0]
      : undefined;

  //stampa i contenuti
  console.log("Contenuto di req.files:", req.files);

  try {
    //controllo se i campi obbligatori sono stati inseriti
    if (!nomecamera || !postiletto || !prezzonotte) {
      return res.json({
        success: false,
        message: "Compila tutti i campi del modulo",
      });
    }

    //query per l'inserimento nel db di una nuova camera
    const query =
      "INSERT INTO `camere` (`nomecamera`, `postiletto`, `prezzonotte`, `descrizione`, `imgcamera1`, `imgcamera2`) VALUES (?, ?, ?, ?, ?, ?)";
    const [results] = await connection
      .promise()
      .query(query, [
        nomecamera,
        postiletto,
        prezzonotte,
        descrizione,
        imgcamera1?.originalname || null, //assegno all'immagine il suo nome originale
        imgcamera2?.originalname || null,
      ]);

    //salva le immagini nella cartella public/img
    if (imgcamera1 && imgcamera1.buffer) { //se imgcamera1 esiste e ha un buffer assegna il percorso
      const img1Path = path.join(
        __dirname,
        "../../public/img",
        imgcamera1.originalname
      );
      try {
        await fs.promises.writeFile(
          img1Path, //dove deve mettere il file
          imgcamera1.buffer.toString("binary"), //l'effettivo file da posizionare
          "binary" //il formato da considerare
        );
        console.log("File inserito con successo:", img1Path);
      } catch (error) {
        console.error("Errore durante l'inserimento del file:", error);
        throw error;
      }
    }
    //stessa logica dell'immagine 1
    if (imgcamera2 && imgcamera2.buffer) {
      const img2Path = path.join(
        __dirname,
        "../../public/img",
        imgcamera2.originalname
      );
      try {
        await fs.promises.writeFile(
          img2Path,
          imgcamera2.buffer.toString("binary"),
          "binary"
        );
        console.log("File inserito con successo:", img2Path);
      } catch (error) {
        console.error("Errore durante l'inserimento del file:", error);
        throw error;
      }
    }

    res.json({ success: true, message: "Stanza creata con successo" });
  } catch (error: any) {
    console.error("Errore durante la gestione della richiesta:", error);

    //dettagli sull'errore (in fase di debugging)

    //if (error instanceof Error) {
    //  console.error("Tipo di errore:", error.name);
    //  console.error("Messaggio di errore:", error.message);
    //  console.error("Stack trace:", error.stack);
    //}

    //se è un errore legato a fs.promises.writeFile, aggiungi un log specifico
    
    //if (error.code === "ERR_INVALID_ARG_TYPE") {
    //  console.error("Errore durante la scrittura del file:", error.message);
    //}
    //se fallisce restituisce l'errore al frontend
    res.status(500).json({
      success: false,
      message: "Errore interno del server durante la creazione della stanza",
      errorDetails: error.message,
    });
  }
}
