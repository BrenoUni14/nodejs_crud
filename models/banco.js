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


//Agendamentos.sync({force:true})

module.exports ={
  Sequelize: Sequelize,
  sequelize: sequelize
  }

