import { Request, Response } from 'express';
import { connection } from '../utils/db';

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
