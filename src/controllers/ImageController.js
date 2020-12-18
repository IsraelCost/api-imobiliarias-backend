const { Op } = require("sequelize");
const Imagem = require("../models/Imagem");
const Condominio = require("../models/Condominio");

module.exports = {
  async index(req, res, next) {
    try {
      const { chave_condominio } = req.params;
      
      if (!await Condominio.findOne({ where: { chave_condominio } })) {
        const error = new Error('Make sure all parameters are correct');
        error.status = 400;
        throw error;
      }

      const images = await Imagem.findAll({ where: { chave_condominio } });

      return res.json(images);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { chave_condominio } = req.params;

      if (
        !await Condominio.findOne({ where: { chave_condominio } })
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

      const image = await Imagem.create({ url_image, chave_condominio });

      return res.status(201).json(image);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { chave_condominio, id } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } }) ||
        chave_condominio === "default" || !await Imagem.findByPk(id))
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

      await Imagem.update({ url_image }, { where: { id } });

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { chave_condominio, id } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } })) ||
        chave_condominio === "default" || !await Imagem.findByPk(id)
      ) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      await Imagem.destroy({ where: { id } });

      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
