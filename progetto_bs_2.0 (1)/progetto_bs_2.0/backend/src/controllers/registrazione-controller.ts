import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { createHash } from 'crypto';

export async function registraUtente(req: Request, res: Response) {
  const { nome, cognome, email, password }: { nome: string; cognome: string; email: string; password: string } = req.body;

  try {
    if (!nome || !cognome || !email || !password) {
      return res.json({ success: false, message: 'Compila tutti i campi del modulo' });
    }

    const hashedPassword = createHash('sha512').update(password).digest('hex').substring(0, 45);

    const query = 'INSERT INTO utente (nome, cognome, email, password) VALUES (?, ?, ?, ?)';
    const [results] = await connection.promise().query(query, [nome, cognome, email, hashedPassword]);

    res.json({ success: true, message: 'Registrazione avvenuta con successo' });
  } catch (err) {
    console.error('Errore nella query al database:', err);
    res.json({ success: false, message: 'Errore durante la registrazione' });
  }
}
