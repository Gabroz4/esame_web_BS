import { Router } from 'express';
import * as userController from '../controllers/user-controller';

const router: Router = Router();

// Endpoint di login
router.post('/api/login', userController.login);

export default router;