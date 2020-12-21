const Condominio = require("../models/Condominio");
const Imagem_Imovel = require("../models/Imagem_Imovel");
const Imovel = require("../models/Imovel");

module.exports = {
  async index(req, res, next) {
    try {
      const { chave_condominio, id_imovel } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } })) ||
        !(await Imovel.findOne({ where: { id: id_imovel } }))
      ) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const images = await Imagem_Imovel.findAll({ where: { id_imovel } });

      return res.json(images);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { chave_condominio, id_imovel } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } })) ||
        !(await Imovel.findOne({ where: { id: id_imovel } }))
      ) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const { url_image } = req.body;

      if (!url_image) {
        const error = new Error("Enter the fields correctly");
        error.status = 400;
        throw error;
      }

      await Imagem_Imovel.create({ url_image, id_imovel });

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { chave_condominio, id_imovel, id } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } })) ||
        !(await Imovel.findOne({ where: { id: id_imovel } })) ||
        !(await Imagem_Imovel.findOne({ where: { id } }))
      ) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const { url_image } = req.body;

      if (!url_image) {
        const error = new Error("Enter the fields correctly");
        error.status = 400;
        throw error;
      }

      await Imagem_Imovel.update({ url_image }, { where: { id } });

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { chave_condominio, id_imovel, id } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } })) ||
        !(await Imovel.findOne({ where: { id: id_imovel } })) ||
        !(await Imagem_Imovel.findOne({ where: { id } }))
      ) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      await Imagem_Imovel.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
