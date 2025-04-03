import { Router } from "express";
import multer from "multer";
import multerConfig from './config/multer.js';
import authMiddleware from "./app/middlewares/auth.js";
import UserController from "./app/controllers/UserController.js";
import categoryController from "./app/controllers/categoryController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import OrderController from "./app/controllers/OrderController.js";

const routes = new Router();
const upload = multer(multerConfig); 

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories', categoryController.store);
routes.get('/categories', categoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);

export default routes;
