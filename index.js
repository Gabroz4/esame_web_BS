const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res){
    res.status(404).send("Ops, pagina non trovata");
    res.sendFile(__dirname + "/index.html");
});

http.listen(3000, ()=>{
    console.log("listening on port 3000");
});
