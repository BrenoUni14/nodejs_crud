const bodyParser = require("body-parser")
const express = require("express")
const { sequelize } = require("./models/banco")
const app = express()
const post = require("./models/post")

const handlebars = require("express-handlebars").engine

app.engine("handlebars", handlebars({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extend: false}))
app.use(bodyParser.json())


//---------------------------------------------------------------/
//criando uma rota para o diretório principal do domínio
app.get("/", function(req, res) {
    res.render("primeira_pagina")
})

//---------------------------------------------------------------/
//criando uma rota para a segunda página
app.get("/cadastra", function(req, res) {
    res.send("Formulário recebido!!")
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data: req.body.data,
        observacao: req.body.observacao
        
    }).then(function(){
        res.send("Dados enviados com sucesso!");
        res.redirect("/cadastrar");
    }).catch(function(erro){
        res.send("Falha ao cadastrar os dados: "+erro)
    });
})

//---------------------------------------------------------------/
//criando uma rota para a página de consulta
app.get("/consultar", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: "+ erro)
    })
})

//---------------------------------------------------------------/
//criando uma rota para a página de edição
app.get("/editar/:id", function(req, res){
    post.findAll({where: {'id': req.params.id}}).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: " + erro)
    })
})

//---------------------------------------------------------------/
//criando uma rota para a página de exclusão
app.get("/deletar/:id", function(req, res){
    const id = req.params.id;

    post.destroy({
        where: {
            id: id
        }
    }).then(function(){
        res.redirect('/consultar');
    }).catch(function(erro){
        console.log("Erro ao carregar dados do banco: "+ erro)
    })
})

//---------------------------------------------------------------/
//criando uma rota para a atualização na consulta
app.post("/atualizar", function(req, res){

    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    },{
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consultar")
    })
})

//---------------------------------------------------------------/
//criando servidor web na porta 8081
app.listen(8081, function() {
    console.log("Servidor Ativo!!")
})