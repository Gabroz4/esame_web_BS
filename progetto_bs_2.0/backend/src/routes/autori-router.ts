import { Router } from "express"
import * as autoriController from "../controllers/autori-controller"

const router: Router = Router()

router.get("/api/autori", autoriController.allAuthors)
router.get("/api/autore/:id", autoriController.authorFromID)

export default router
