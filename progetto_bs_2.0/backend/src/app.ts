import express, { Express } from "express"
import camereRouter from "./routes/camere-router"
/*import categorieRouter from "./routes/categorie-router"
import autoriRouter from "./routes/autori-router"*/
import history from "connect-history-api-fallback"

const app: Express = express()
const port: number = 3000

app.use(history())
app.use(express.static("public"))
app.use(express.static("dist-frontend"))

app.use(camereRouter)
/*app.use(categorieRouter)
app.use(autoriRouter)*/

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`)
})
