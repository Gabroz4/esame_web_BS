import { Request, Response } from "express";
import { connection } from "../utils/db";

//funzione per cercare un profilo e le prenotazioni data l'email
export async function getProfileAndPrenotazioni(req: Request, res: Response) {
  connection.execute(
    `SELECT nome, cognome, email 
     FROM utente 
     WHERE email = ?`,
    [req.params.email],
    function (err, profileResults) {
      if (err) {
        console.error('Errore nel recupero del profilo utente:', err);
        res.status(500).json({ success: false, message: 'Errore del server' });
        return;
      }

      //controllo del tipo di userprofile
      if (!Array.isArray(profileResults) || profileResults.length === 0) { 
        res.status(404).json({ error: "Utente non trovato" });
        return;
      }

      const userProfile = profileResults[0];

      //query per ottenere le prenotazioni di un determinato utente data l'email
      connection.execute(
        `SELECT p.*, c.descrizione AS descrizione_camera
         FROM prenotazione AS p
         JOIN camere AS c ON p.nomecamera = c.nomecamera
         WHERE p.email = ?`,
        [req.params.email],
        function (err, prenotazioniResults) {
          if (err) {
            console.error('Errore nel recupero delle prenotazioni utente:', err);
            res.status(500).json({ success: false, message: 'Errore del server' });
            return;
          }

          //il risultato sarà composto sia dal profilo ottenuto che dalle prenotazioni di quell'utente
          const responseData = {
            profile: userProfile,
            prenotazioni: prenotazioniResults,
          };

          res.json(responseData);
        }
      );
    }
  );
}
