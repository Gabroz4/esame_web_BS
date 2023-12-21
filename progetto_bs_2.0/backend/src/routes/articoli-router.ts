import { Router } from "express"
import * as articoliController from "../controllers/articoli-controller"

const router: Router = Router()

router.get("/api/articoli", articoliController.allArticles)
router.get("/api/articoli/:n", articoliController.lastNArticles)
router.get("/api/articoli/categoria/:idcategory", articoliController.articlesOfCategory)
router.get("/api/articoli/autore/:idautore", articoliController.articlesOfAuthor)
router.get("/api/articolo/:id", articoliController.articleFromID)

export default router
