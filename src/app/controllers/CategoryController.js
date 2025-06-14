import * as yup from "yup";
import Category from "../models/category.js";
import User from "../models/User.js";

class CategoryController {
  // Método para criar uma nova categoria
  async store(request, response) {
    const schema = yup.object({
      name: yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    // ✅ VERIFICAÇÃO ADICIONADA PARA EVITAR ERRO DE "undefined"
    if (!request.file) {
      return response.status(400).json({ error: 'Arquivo não enviado.' });
    }

    const { filename: path } = request.file;

    const { name } = request.body;

    const categoryExists = await Category.findOne({
      where: { name },
    });

    if (categoryExists) {
      return response.status(400).json({ error: "Category already exists" });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return response.status(201).json({ id, name });
  }

  async update(request, response) {
    const schema = yup.object({
      name: yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);

    if (!isAdmin) {
      return response.status(401).json();
    }

    const { id } = request.params;
    const categoryExists = await Category.findByPk(id);

    if (!categoryExists) {
      return response.status(400).json({ message: 'Make sure your category Id is cor' });
    }

    let path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name } = request.body;

 


    if (name) { 
      const categoryNameExists = await Category.findOne({
        where: { name }, 
      });

      if (categoryNameExists && categoryExists.id === +id) { 
        return response.status(400).json({ error: "Category already exists" });
      }
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: { id },
      }
    );

    return response.status(200).json();
  }

  // Listar todas as categorias
  async index(request, response) {
    const categories = await Category.findAll();
    return response.json(categories);
  }
}

export default new CategoryController();
