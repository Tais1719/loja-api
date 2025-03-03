import Sequelize from "sequelize";
import config from './config/database.js';  // Agora está correto para ES Modules
import User from "./app/controllers/models/User.js";  // Caminho corrigido

const models = [User];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(config);  // Usa a configuração importada
        models.forEach(model => model.init(this.connection));
    }
}

export default new Database();
