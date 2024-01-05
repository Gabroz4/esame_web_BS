import { Router } from 'express';
import * as profiloController from '../controllers/profilo-controller';

const router: Router = Router();

// Endpoint per ottenere il profilo e le prenotazioni dell'utente
router.get('/api/user/:email', profiloController.getProfileAndPrenotazioni);

export default router;
