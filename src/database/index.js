 import Sequelize from "sequelize";


 import User from "../app/models/User.js"; // Caminho certo

 
 import configDatabase from './config/database.js';  // Caminho correto para o arquivo de configuração
 const models = [User];

 class Database {
   constructor() {
     this.init();
   }

  init() {
    this.connection = new Sequelize(configDatabase);
    models.map((model) => model.init(this.connection));
   } }

 export default new Database();
