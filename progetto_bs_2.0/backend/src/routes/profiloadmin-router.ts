import { Router } from 'express';
import * as profiloController from '../controllers/profiloadmin-controller';

const router: Router = Router();

router.get('/api/prenotazioni', profiloController.fetchPrenotazioni);
router.get('/api/camere', profiloController.fetchCamere);
router.delete('/api/prenotazioni/:id', profiloController.eliminaPrenotazione);
router.delete('/api/camere/:nomecamera', profiloController.eliminaCamera);
router.put('/api/camere/:nomecamera', profiloController.modificaCamera);


export default router;
