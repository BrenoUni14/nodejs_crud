const Sequelize = require("sequelize")
const sequelize = new Sequelize("test", "root", "", {
                  host: "localhost",
                  dialect: "mysql"
})

sequelize.authenticate().then(function(){
                  console.log("Banco de dados Ativo!")
}).catch(function(erro){
                  console.log("Falha ao conectar: "+erro)
})

const Agendamentos = sequelize.define("agendamentos",{
                  nome:{
                                    type: Sequelize.STRING
                  },
                  telefone:{
                                    type: Sequelize.INTEGER
                  },
                  origem:{
                                    type: Sequelize.STRING
                  },
                  data:{
                                    type: Sequelize.DATE
                  },
                  observacao:{
                    type: Sequelize.STRING
                  }


})

//Agendamentos.sync({force: true})
/*
Agendamentos.create({
                  nome: "Breno Santos do Carmo",
                  endereco: "Av Aguia de Haia",
                  bairro:"AE Carvalho",
                  cep:09823112,
                  cidade:"São Paulo",
                  estado:"SP",
                  observacao:"Realizar o alinhamento e balancemento da minha rotina"
})
*/