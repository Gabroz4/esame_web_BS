import { Router } from 'express';
import * as prenotazioneController from '../controllers/prenotazione-controller';


const router: Router = Router();

//quando riceve la richiesta post in questa route, richiama la funzione inserisciPrenotazione
router.post('/api/camere/:nomecamera', prenotazioneController.inserisciPrenotazione);

export default router;
