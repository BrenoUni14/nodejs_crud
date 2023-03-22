const express = require("express")
const app = express()

const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({defaultLayout:"main"}))
app.set("view engine", "handlebars")

//---------------------------------------------------------------/
//criando uma rota para o diretório principal do domínio
app.get("/", function(req, res) {
    res.render("primeira_pagina")
})


//---------------------------------------------------------------/
//criando servidor web na porta 8081
app.listen(8081, function() {
    console.log("Servidor Ativo!!")
})