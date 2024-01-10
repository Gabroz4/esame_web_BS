import express, { Express, Request, Response } from 'express';
import camereRouter from './routes/camere-router';
import userRouter from './routes/user-router';
import registrazioneRouter from './routes/registrazione-router';
import history from 'connect-history-api-fallback';
import prenotazioneRouter from './routes/prenotazione-router';
import profiloRouter from './routes/profilo-router'
import adminRouter from './routes/profiloadmin-router'
import path from 'path';

//creazione del server express
const app: Express = express();
const port: number = 3000;

//gestione delle route storiche
app.use(history());

//middleware per il parsing dei dati
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware per la gestione delle route statiche
app.use('/img', express.static('public/img'));
app.use(express.static(path.resolve(__dirname, '../../frontend/dist')));

//gestione dei vari router
app.use(camereRouter);
app.use(userRouter);
app.use(prenotazioneRouter);
app.use(profiloRouter);
app.use(adminRouter);
app.use(registrazioneRouter);

//gestione della risposta per le pagine non trovate
app.use((req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Ops... Pagina non trovata');
});

//avvio del server sulla porta specificata
app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
