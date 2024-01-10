import { Router } from 'express';
import * as userController from '../controllers/user-controller';

const router: Router = Router();

//richiama la funzione per il login
router.post('/api/login', userController.login);

export default router;
