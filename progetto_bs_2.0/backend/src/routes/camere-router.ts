import { Router } from "express"
import * as camereController from "../controllers/camere-controller"

const router: Router = Router()

router.get("/api/camere/:idnomecamera", camereController.oneRoom)
/*router.get("/api/articoli/:n", camereController.lastNArticles)
router.get("/api/articoli/categoria/:idcategory", camereController.articlesOfCategory)
router.get("/api/articoli/autore/:idautore", camereController.articlesOfAuthor)
router.get("/api/articolo/:id", camereController.articleFromID)*/

export default router
