import express, { Express } from "express";
import bodyParser from 'body-parser';
import camereRouter from "./routes/camere-router";
/*import categorieRouter from "./routes/categorie-router";
import autoriRouter from "./routes/autori-router";*/
import history from "connect-history-api-fallback";
import { connection } from './utils/db'; // Assicurati di fornire il percorso corretto al tuo modulo di connessione

const app: Express = express();
const port: number = 3000;

app.use(history());
app.use(express.static("public"));
//app.use(express.static("dist-frontend"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(camereRouter);
/*app.use(categorieRouter);
app.use(autoriRouter);*/

// Aggiungi il tuo endpoint di login qui
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Qui dovresti verificare l'email e la password con il tuo database
  // Per ora, useremo un controllo fittizio
  if (email === 'test@example.com' && password === 'password') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).send("Ops... Pagina non trovata");
});

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});