import { Router } from 'express';
import * as profiloController from '../controllers/admin-controller';

const router: Router = Router();

router.get('/api/prenotazioni', profiloController.fetchPrenotazioni);
router.delete('/api/prenotazioni/:id', profiloController.eliminaPrenotazione);

export default router;