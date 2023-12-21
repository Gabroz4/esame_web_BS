import express, { Express } from "express"
import esempioRouter from "./routes/esempio-router"
//vari altri router

const app: Express = express()
const port: number = 3000

app.use(express.static("public"))

app.use(esempioRouter)
//app.use(/*altro router*/)
//app.use(/*altro router*/)

app.use(function(req, res, next){
  res.setHeader("Content-Type", "text/plain")
  res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function () {
  console.log("Listening on port " + port)
})
