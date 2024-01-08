// Importa i moduli necessari
import { Request, Response } from "express";
import { connection } from "../utils/db";
import { RowDataPacket } from "mysql2";

// Funzione per inserire una nuova prenotazione
export async function inserisciPrenotazione(req: Request, res: Response) {
  // Estrai i dati dalla richiesta
  const { datainizio, datafine, prezzo, nomecamera, userToken, emailToken }: { datainizio: string; datafine: string; prezzo: number; nomecamera: string; userToken: string; emailToken: string } = req.body;

  try {
    // Verifica se l'utente è loggato
    if (userToken != 'IsLoggedIn') {
      return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
    }

    // Verifica se tutti i campi sono stati compilati
    if (!datainizio || !datafine || !prezzo || !nomecamera) {
      return res.status(400).json({ success: false, message: 'Per favore, compila tutti i campi del modulo' });
    }

    // Verifica se la camera è disponibile per le date specificate
    const cameraDisponibile = await verificaDisponibilitaCamera(nomecamera, datainizio, datafine);
    
    // Se la camera non è disponibile, restituisci un errore
    if (!cameraDisponibile) {
      return res.status(400).json({ success: false, message: 'La camera non è disponibile per le date selezionate' });
    }

    // Verifica se l'utente è autorizzato
    if (userToken !== 'IsLoggedIn' && userToken !== 'Admin') {
      return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
    }

    // Inserisci la nuova prenotazione nel database
    const query = 'INSERT INTO prenotazione (datainizio, datafine, prezzo, email, nomecamera) VALUES (?, ?, ?, ?, ?)';
    const [results] = await connection.promise().query(query, [datainizio, datafine, prezzo, emailToken, nomecamera]);

    // Restituisci un messaggio di successo
    res.status(201).json({ success: true, message: 'Prenotazione inserita con successo' });
  } catch (err: any) {
    // Gestisci gli errori
    if (err.message === 'Camera già prenotata in quel periodo') {
      return res.status(400).json({ success: false, message: 'La camera è già prenotata per le date selezionate' });
    } else {
      return res.status(500).json({ success: false, message: 'Errore durante l\'inserimento della prenotazione', error: (err as any).message });
    }
  }    
};

// Funzione per verificare la disponibilità della camera per le date specificate
async function verificaDisponibilitaCamera(nomecamera: string, datainizio: string, datafine: string): Promise<boolean> {
  // Query per controllare se la camera è già prenotata
  const query = 'SELECT COUNT(*) as count FROM prenotazione WHERE nomecamera = ? AND ((datainizio <= ? AND datafine >= ?) OR (datainizio <= ? AND datafine >= ?) OR (datainizio >= ? AND datafine <= ?))';

  try {
    // Esegui la query
    const [results] = await connection.promise().query<RowDataPacket[]>(query, [nomecamera, datainizio, datainizio, datafine, datafine, datainizio, datafine]);
    // Estrai la proprietà count dal primo risultato
    const count = results[0]?.count ?? 0;

    // Se la camera è già prenotata, lancia un errore
    if (count !== 0) {
      throw new Error('Camera già prenotata in quel periodo');
    }

    // Se count è 0, la camera è disponibile
    return count === 0;
  } catch (error) {
    // Gestione dell'errore
    throw error;
  }
}
