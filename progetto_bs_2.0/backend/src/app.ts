import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import camereRouter from "./routes/camere-router";
import history from "connect-history-api-fallback";
import { connection } from './utils/db';
import { createHash } from 'crypto';

// Creazione di un'app Express
const app: Express = express();
// Porta su cui il server ascolterà
const port: number = 3000;

// Middleware per la gestione delle route storiche
app.use(require('connect-history-api-fallback')());

// Utilizzo di middleware per il parsing dei dati JSON e URL-encoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware per la gestione delle route statiche
app.use(express.static('public'));
app.use(express.static('dist-frontend'));

// Usa bodyParser per analizzare il corpo delle richieste POST
app.use(bodyParser.json());


//stampa di tutte le camere nel db
app.use(camereRouter);

// Endpoint di login
app.post('/api/login', async (req: Request, res: Response) => {
  // Estrazione di email e password dalla richiesta
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // Prevenzione dell'invio del modulo se i campi sono vuoti
    if (!email || !password) {
      return res.json({ success: false, message: 'Per favore, inserisci sia l\'email che la password' });
    }

    // Query per cercare l'utente nel database
    const query = 'SELECT email,password FROM utente WHERE email = ? AND password = ?';
    var hashedPassword = createHash('sha512').update(password).digest('hex');
    hashedPassword = hashedPassword.substring(0, 45);

    // Esecuzione della query nel database
    const [results] = await connection.promise().query(query, [email, hashedPassword]);
    console.log('Risultati:', results);

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
});

// Gestione della risposta per le pagine non trovate
app.use((req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Ops... Pagina non trovata');
});

// Avvio del server sulla porta specificata
app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});