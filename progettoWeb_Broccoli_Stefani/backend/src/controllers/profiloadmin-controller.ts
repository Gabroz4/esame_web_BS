import { Request, Response } from 'express';
import { connection } from '../utils/db';

//funzione per ottenere tutte le prenotazioni
export async function fetchPrenotazioni(req: Request, res: Response) {
    try {
        const query = 'SELECT * FROM prenotazione';
        const [results] = await connection.promise().query(query);
        res.json(results);
    } catch (error) {
        console.error('Errore nella query al database:', error);
        res.status(500).json({ success: false, message: 'Errore durante il recupero delle prenotazioni' });
    }
}

//funzione per ottenere tutte le camere
export async function fetchCamere(req: Request, res: Response) {
    try {
        const query = 'SELECT * FROM camere';
        const [results] = await connection.promise().query(query);
        res.json(results);
    } catch (error) {
        console.error('Errore nella query al database:', error);
        res.status(500).json({ success: false, message: 'Errore durante il recupero delle camere' });
    }
}

//funzione per l'eliminazione di una determinata prenotazione dato il suo id
export async function eliminaPrenotazione(req: Request, res: Response) {
    const prenotazioneId = req.params.id;

    try {
        const query = 'DELETE FROM prenotazione WHERE id = ?';
        await connection.promise().query(query, [prenotazioneId]);

        res.json({ success: true, message: 'Prenotazione eliminata con successo' });
    } catch (error) {
        console.error('Errore nella query al database:', error);
        res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione della prenotazione' });
    }
}

//funzione per l'eliminazione di una determinata camera dato il suo nome
export async function eliminaCamera(req: Request, res: Response) {
    const nomeCamera = req.params.nomecamera;

    try {
        const query = 'DELETE FROM camere WHERE nomecamera = ?';
        await connection.promise().query(query, [nomeCamera]);

        res.json({ success: true, message: 'Camera eliminata con successo' });
    } catch (error) {
        console.error('Errore nella query al database:', error);
        res.status(500).json({ success: false, message: 'Errore durante l\'eliminazione della camera' });
    }
}

//funzione per la modificazione di una camera dato il suo nome
export async function modificaCamera(req: Request, res: Response) {
    const nomeCamera = req.params.nomecamera;
    const { postiletto, prezzonotte, descrizione } = req.body;
  
    try {
      const query = 'UPDATE camere SET postiletto = ?, prezzonotte = ?, descrizione = ? WHERE nomecamera = ?';
      await connection.promise().query(query, [postiletto, prezzonotte, descrizione, nomeCamera]);
  
      res.json({ success: true, message: 'Camera modificata con successo' });
    } catch (error) {
      console.error('Errore nella query al database:', error);
      res.status(500).json({ success: false, message: 'Errore durante la modifica della camera' });
    }
  };
