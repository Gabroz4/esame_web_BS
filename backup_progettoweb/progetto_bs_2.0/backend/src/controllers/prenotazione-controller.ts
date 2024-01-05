import { Request, Response } from "express";
import { connection } from "../utils/db";

export async function inserisciPrenotazione(req: Request, res: Response) {
    const { datainizio, datafine, prezzo, nomecamera, userToken, emailToken }: { datainizio: string; datafine: string; prezzo: number; nomecamera: string; userToken: string; emailToken: string } = req.body;
  
    try {
      if (userToken != 'IsLoggedIn') {
        return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
      }
  
      if (!datainizio || !datafine || !prezzo || !nomecamera) {
        return res.status(400).json({ success: false, message: 'Per favore, compila tutti i campi del modulo' });
      }

      if (userToken !== 'IsLoggedIn' && userToken !== 'Admin') {
        return res.status(401).json({ success: false, message: 'Utente non autorizzato' });
      }
  
      const query = 'INSERT INTO prenotazione (datainizio, datafine, prezzo, email, nomecamera) VALUES (?, ?, ?, ?, ?)';
      const [results] = await connection.promise().query(query, [datainizio, datafine, prezzo, emailToken, nomecamera]);
  
      res.status(201).json({ success: true, message: 'Prenotazione inserita con successo' });
    } catch (err) {
      console.error('Errore nella query al database:', err);
      res.status(500).json({ success: false, message: 'Errore durante l\'inserimento della prenotazione', error: (err as any).message });
    }    
};
