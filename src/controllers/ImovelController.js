const { Op } = require("sequelize");
const Imovel = require("../models/Imovel");
const Condominio = require("../models/Condominio");

module.exports = {
  async index(req, res, next) {
    try {
      const { chave_condominio } = req.params;

      if (!await Condominio.findOne({ where: { chave_condominio } })) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const imoveis = await Imovel.findAll({ where: { chave_condominio } });

      return res.json(imoveis);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { chave_condominio } = req.params;

      if (
        !(await Condominio.findOne({ where: { chave_condominio } }))
      ) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const dataImovel = {
        titulo_imovel: req.body.titulo_imovel,
        qtd_dormitorios_imovel: req.body.qtd_dormitorios_imovel,
        area_imovel: req.body.area_imovel,
        valor_imovel: req.body.valor_imovel,
        url_thumb_imovel: req.body.url_thumb_imovel,
        url_galeria_imovel: req.body.url_galeria_imovel,
        url_vt360_imovel: req.body.url_vt360_imovel,
        onclick_function_imovel_location:
          req.body.onclick_function_imovel_location,
        nomes_lotes_for_hotspots: req.body.nomes_lotes_for_hotspots,
      };

      for (let key in dataImovel) {
        if (!dataImovel[key]) {
          const error = new Error("Enter the fields correctly");
          error.status = 400;
          throw error;
        }
      }

      await Imovel.create({ ...dataImovel, chave_condominio });

      return res.status(201).send();
      
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
        const { chave_condominio, id } = req.params;

        if (
          !(await Condominio.findOne({ where: { chave_condominio } })) ||
          chave_condominio === "default" || !await Imovel.findByPk(id)
        ) {
          const error = new Error("Make sure all parameters are correct");
          error.status = 400;
          throw error;
        }
  
        const dataImovel = {
          titulo_imovel: req.body.titulo_imovel,
          qtd_dormitorios_imovel: req.body.qtd_dormitorios_imovel,
          area_imovel: req.body.area_imovel,
          valor_imovel: req.body.valor_imovel,
          url_thumb_imovel: req.body.url_thumb_imovel,
          url_galeria_imovel: req.body.url_galeria_imovel,
          url_vt360_imovel: req.body.url_vt360_imovel,
          onclick_function_imovel_location:
            req.body.onclick_function_imovel_location,
          nomes_lotes_for_hotspots: req.body.nomes_lotes_for_hotspots,
        };
  
        for (let key in dataImovel) {
          if (!dataImovel[key]) {
            const error = new Error("Enter the fields correctly");
            error.status = 400;
            throw error;
          }
        }
  
        await Imovel.update({ ...dataImovel }, { where: { id } });
  
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
          chave_condominio === "default" || !await Imovel.findByPk(id)
        ) {
          const error = new Error("Make sure all parameters are correct");
          error.status = 400;
          throw error;
        }
  
        await Imovel.destroy({ where: { id } });
  
        return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
