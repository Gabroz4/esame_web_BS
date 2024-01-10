import { Request, Response } from 'express';
import { connection } from '../utils/db';
//libreria per l'hashing della password
import { createHash } from 'crypto';

//funzione per il login di un utente dati email e password
export async function login(req: Request, res: Response) {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    //se non sono stati inseriti i campi obbligatori restituisce errore
    if (!email || !password) {
      return res.json({ success: false, message: 'Per favore, inserisci sia l\'email che la password' });
    }

    //hashing della password con codifica sha512 e tagliata al 45esimo carattere(varchar(45) nel db)
    const hashedPassword = createHash('sha512').update(password).digest('hex').substring(0, 45);

    const query = 'SELECT email, password FROM utente WHERE email = ? AND password = ?';

    //esegue la query nel db 
    const [results] = await connection.promise().query(query, [email, hashedPassword]);

    //se result esiste come array e ha contenuto
    if (Array.isArray(results) && results.length > 0) {
      /*
      record definisce user come un oggetto composto da una chiave(string)
      e un elemento di tipo unknown, a cui verrà assegnato il risultato della query
      contenente l'email(string) e la password(unknown)
      */
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
