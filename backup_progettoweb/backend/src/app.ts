import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import camereRouter from './routes/camere-router';
import userRouter from './routes/user-router';
import registrazioneRouter from './routes/registrazione-router'; // Importa il router di registrazione
import history from 'connect-history-api-fallback';
import prenotazioneRouter from './routes/prenotazione-router';
import profiloRouter from './routes/profilo-router'
import path from 'path';


// Creazione di un'app Express
const app: Express = express();
// Porta su cui il server ascolterà
const port: number = 3000;

// Middleware per la gestione delle route storiche
app.use(history());

// Utilizzo di middleware per il parsing dei dati JSON e URL-encoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware per la gestione delle route statiche
app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname, '../../frontend/dist')));

// Usa bodyParser per analizzare il corpo delle richieste POST
app.use(bodyParser.json());

// Usa i router per gestire le varie route
app.use(camereRouter);
app.use(userRouter);
app.use(prenotazioneRouter);
app.use(profiloRouter);
app.use(registrazioneRouter); // Usa il router di registrazione

// Gestione della risposta per le pagine non trovate
app.use((req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Ops... Pagina non trovata');
});

// Avvio del server sulla porta specificata
app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
