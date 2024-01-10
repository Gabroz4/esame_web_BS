import { Router } from "express"
import * as camereController from "../controllers/camere-controller"
//libreria per la gestione del caricamento di file multipart/form-data
import multer from 'multer';
import path from "path";

const router: Router = Router()

//configurazione del caricamento di file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     //percorso di destinazione delle imamgini
      cb(null, __dirname + '../../../public/img');
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
