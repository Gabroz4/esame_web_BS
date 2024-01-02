import { Request, Response } from 'express';
import { connection } from '../utils/db';
import { createHash } from 'crypto';

export async function login(req: Request, res: Response) {
  // Estrazione di email e password dalla richiesta
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // Prevenzione dell'invio del modulo se i campi sono vuoti
    if (!email || !password) {
      return res.json({ success: false, message: 'Per favore, inserisci sia l\'email che la password' });
    }

    // Hash della password
    const hashedPassword = createHash('sha512').update(password).digest('hex').substring(0, 45);

    // Query per cercare l'utente nel database
    const query = 'SELECT email, password FROM utente WHERE email = ? AND password = ?';

    // Esecuzione della query nel database
    const [results] = await connection.promise().query(query, [email, hashedPassword]);

    // Verifica se ci sono risultati nella query
    if (Array.isArray(results) && results.length > 0) {
      // Utilizzo del tipo più preciso per results[0]
      const user: Record<string, unknown> = results[0] as Record<string, unknown>;
      if (user) {        
        res.json({ success: true, message: 'Login riuscito' });
      } else {
        res.json({ success: false, message: 'Credenziali non valide' });
      }
    } else {
      res.json({ success: false, message: 'Credenziali non valide' });
    }
  } catch (err) {
    console.error('Errore nella query al database:', err);
    res.json({ success: false, message: 'Errore nel login' });
  }
}
