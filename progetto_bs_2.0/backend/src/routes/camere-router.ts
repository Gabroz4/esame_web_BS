import { Router } from "express"
import * as camereController from "../controllers/camere-controller"
import multer from 'multer';

const router: Router = Router()

// Configurazione del middleware di caricamento di file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/gabri/Desktop/informatica/secondo_anno/ingegneria_dei_sistemi_web/esame_web_BS/progetto_bs_2.0/backend/public/img');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      // Personalizza la logica di filtraggio se necessario
      cb(null, true);
    },
  }).fields([
    { name: 'imgcamera1', maxCount: 1 },
    { name: 'imgcamera2', maxCount: 1 },
  ]);

router.get("/api/camere", camereController.allRooms)
router.get("/api/camere/:nomecamera", camereController.oneRoom)
router.post('/api/admin/nuova-camera', upload, camereController.creaStanza)

export default router
