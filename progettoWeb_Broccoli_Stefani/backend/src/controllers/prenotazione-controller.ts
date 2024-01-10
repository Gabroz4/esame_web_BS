import { Request, Response } from "express";
import { connection } from "../utils/db";
import { RowDataPacket } from "mysql2";

export async function inserisciPrenotazione(req: Request, res: Response) {
  //estrae i dati dalla richiesta
  const {
    datainizio,
    datafine,
    prezzo,
    nomecamera,
    userToken,
    emailToken,
  }: {
    datainizio: string;
    datafine: string;
    prezzo: number;
    nomecamera: string;
    userToken: string;
    emailToken: string;
  } = req.body;

  try {
    //verifica se l'utente è loggato
    if (userToken != "IsLoggedIn") {
      return res
        .status(401)
        .json({ success: false, message: "Utente non autorizzato" });
    }

    //verifica se questi campi sono stati compilati
    if (!datainizio || !datafine || !prezzo || !nomecamera) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Per favore, compila tutti i campi del modulo",
        });
    }

    //verifica se la camera è disponibile per le date specificate
    const cameraDisponibile = await verificaDisponibilitaCamera(
      nomecamera,
      datainizio,
      datafine
    );

    //se la camera non è disponibile, restituisce errore
    if (!cameraDisponibile) {
      return res
        .status(400)
        .json({
          success: false,
          message: "La camera non è disponibile per le date selezionate",
        });
    }

    //verifica se l'utente è admin
    if (userToken !== "IsLoggedIn" && userToken !== "Admin") {
      return res
        .status(401)
        .json({ success: false, message: "Utente non autorizzato" });
    }

    //inserisce la nuova prenotazione nel database
    const query =
      "INSERT INTO prenotazione (datainizio, datafine, prezzo, email, nomecamera) VALUES (?, ?, ?, ?, ?)";
    const [results] = await connection
      .promise()
      .query(query, [datainizio, datafine, prezzo, emailToken, nomecamera]);

    //successo
    res
      .status(201)
      .json({ success: true, message: "Prenotazione inserita con successo" });
  } catch (err: any) {
    //gestione degli errori (debugging)
    if (err.message === "Camera già prenotata in quel periodo") {
      return res
        .status(400)
        .json({
          success: false,
          message: "La camera è già prenotata per le date selezionate",
        });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Errore durante l'inserimento della prenotazione",
          error: (err as any).message,
        });
    }
  }
}

//verifica la disponibilità della camera per le date specificate
async function verificaDisponibilitaCamera(
  nomecamera: string,
  datainizio: string,
  datafine: string
): Promise<boolean> {
  const query = `SELECT COUNT(*) as count 
  FROM prenotazione 
  WHERE nomecamera = ? AND ((datainizio <= ? AND datafine >= ?) 
  OR (datainizio <= ? AND datafine >= ?) 
  OR (datainizio >= ? AND datafine <= ?))`;

  try {
    //prova la query
    const [results] = await connection
      .promise()
      .query<RowDataPacket[]>(query, [
        nomecamera,
        datainizio,
        datainizio,
        datafine,
        datafine,
        datainizio,
        datafine,
      ]);
    //accede alla prima riga di risultati e recupera count, altrimenti assegna 0.
    const count = results[0]?.count ?? 0;

    //se la camera è già prenotata lancia un errore
    if (count !== 0) {
      throw new Error("Camera già prenotata in quel periodo");
    }

    //se count è 0 la camera è disponibile
    return count === 0;
  } catch (error) {
    
    throw error;
  }
}
