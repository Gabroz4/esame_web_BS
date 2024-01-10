import { Router } from 'express';
import * as profiloController from '../controllers/profiloadmin-controller';

const router: Router = Router();

//restituisce tutte le prenotazioni
router.get('/api/prenotazioni', profiloController.fetchPrenotazioni);
//restituisce tutte le camere
router.get('/api/camere', profiloController.fetchCamere);

//richiama la funzione per la cancellazione della prenotazione dato l'id
router.delete('/api/prenotazioni/:id', profiloController.eliminaPrenotazione);
//richiama la funzione per la cancellazione della camera dato il nome
router.delete('/api/camere/:nomecamera', profiloController.eliminaCamera);

//richiama la funzione per la modifica di una camera dato il nome
router.put('/api/camere/:nomecamera', profiloController.modificaCamera);


export default router;
