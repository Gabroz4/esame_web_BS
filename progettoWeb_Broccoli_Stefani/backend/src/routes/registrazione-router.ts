import { Router } from 'express';
import * as registrazioneController from '../controllers/registrazione-controller';

const router: Router = Router();

//richiama la funzione per la registrazione dell'utente
router.post('/api/registrati', registrazioneController.registraUtente);

export default router;
