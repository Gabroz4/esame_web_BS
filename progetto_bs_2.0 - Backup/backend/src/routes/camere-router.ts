import { Router } from "express"
import * as camereController from "../controllers/camere-controller"

const router: Router = Router()

router.get("/api/camere", camereController.allRooms)

export default router
