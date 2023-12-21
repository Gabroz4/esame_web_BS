import { Router } from "express"
import * as categorieController from "../controllers/categorie-controller"

const router: Router = Router()

router.get("/api/categorie", categorieController.allCategories)
router.get("/api/categoria/:id", categorieController.categoryFromID)

export default router
