import { Router } from "express"
import * as camereController from "../controllers/camere-controller"
//libreria per la gestione del caricamento di file multipart/form-data
import multer from 'multer';

const router: Router = Router()

//configurazione del caricamento di file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      /*
      C:/Users/tomma/Desktop/Esame-Web/esame_web_BS/progetto_bs_2.0/backend/public/img
      C:/Users/gabri/Desktop/informatica/secondo_anno/ingegneria_dei_sistemi_web/esame_web_BS/progetto_bs_2.0/backend/public/img
      qui va inserito il percorso in cui andranno le immagini
      */
      cb(null, 'C:/Users/tomma/Desktop/Esame-Web/esame_web_BS/progetto_bs_2.0/backend/public/img');
      
    },
    filename: function (req, file, cb) {//assegna alle immagini il loro nome originale
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
  }).fields([//inserimento dei file nella cartella di destinazione
    { name: 'imgcamera1', maxCount: 1 }, //nome della variabile dell'immagine da inserire
    { name: 'imgcamera2', maxCount: 1 },
  ]);

router.get("/api/camere", camereController.allRooms)
router.get("/api/camere/:nomecamera", camereController.oneRoom)
router.post('/api/admin/nuova-camera', upload, camereController.creaStanza)

export default router
