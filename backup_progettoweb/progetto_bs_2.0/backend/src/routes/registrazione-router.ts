import { Router } from 'express';
import * as registrazioneController from '../controllers/registrazione-controller';

const router: Router = Router();

router.post('/api/registrati', registrazioneController.registraUtente);

export default router;
