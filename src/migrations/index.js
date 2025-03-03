

import  Sequelize  from "sequelize";

import config from "../app/controlles"

import User from "../models/User";

 const models = [User]


 class Detabase{
    constructor(){
        this.init()

    
        }
    
        init(){
            this.connection = new Sequelize(config)
            models.map(model => model.init(this.connection))
         }

    }

   export default new Detabase()