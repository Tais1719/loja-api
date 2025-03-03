import { Router } from "express";
import { v4 } from "uuid";  // Importando UUID
import User from "./app/controllers/models/User";

const routes = new Router();

routes.get('/', async (request, response) => {
    const user = await User.create({
        id: v4(),  // Gerando o UUID manualmente
        name: 'tais2',
        email: 'dev.taissantos2@gmail.com',
        password: 'jonatataiswswswqsw',  // Corrigido para 'password'
     
    });
    return response.status(201).json(user);
});

export default routes;
