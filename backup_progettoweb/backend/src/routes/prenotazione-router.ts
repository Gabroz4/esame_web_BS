import { Router } from 'express';
import * as prenotazioneController from '../controllers/prenotazione-controller';


const router: Router = Router();

router.post('/api/camere/:nomecamera', prenotazioneController.inserisciPrenotazione);

export default router;
