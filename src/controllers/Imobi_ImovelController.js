const Condominio = require('../models/Condominio');
const Imobiliaria = require('../models/Imobiliaria');
const Imovel = require('../models/Imovel');

module.exports = {
    async index(req, res, next) {
        try {
            const { chave_condominio, id } = req.params;

            if (
                !(await Condominio.findOne({ where: { chave_condominio } })) ||
                !(await Imovel.findByPk(id))
              ) {
                const error = new Error("Make sure all parameters are correct");
                error.status = 400;
                throw error;
              }        
          let imoveis = await Imovel.findByPk(id, { include: { association: 'imobiliarias', through: { attributes: [] } } });
              return res.json(imoveis.imobiliarias);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
          const { chave_condominio, id } = req.params;
          const { chave_imobi } = req.body;
    
          if (!chave_imobi) {
            const error = new Error("Enter the fields correctly");
            error.status = 400;
            throw error;
          }
          
          if (
            !(await Condominio.findOne({ where: { chave_condominio } })) ||
            !(await Imovel.findByPk(id)) ||
            !(await Imobiliaria.findOne({ where: { chave_imobi } }))
          ) {
            const error = new Error("Make sure all parameters are correct");
            error.status = 400;
            throw error;
          }

          const condominio = await Condominio.findOne({ where: { chave_condominio }, include: { association: 'imobiliarias', through: { attributes: [] } } });
          let imobiliariaInCondominio = false;
          for (let imobi of condominio.imobiliarias) {
            if (imobi.chave_imobi === chave_imobi) {
              imobiliariaInCondominio = true;
            }
          }

          if (!imobiliariaInCondominio) {
            const error = new Error("Enter the fields correctly");
            error.status = 400;
            throw error;
          }
    
          const imobiliaria = await Imobiliaria.findOne({ where: { chave_imobi } });
    
          const imovel = await Imovel.findByPk(id);
          await imovel.addImobiliarias(imobiliaria);
    
          return res.status(201).send();
        } catch (err) {
          next(err);
        }
      },

      async delete(req, res, next) {
        try {
          const { chave_condominio, id, chave_imobi } = req.params;
    
          let isImobiInImovel = false;
          let imobiliariasDoImovel = await Imovel.findByPk(id, { include: { association: 'imobiliarias', through: { attributes: [] } } });
          for (let imobi of imobiliariasDoImovel.imobiliarias) {
            if (imobi.chave_imobi === chave_imobi) {
              isImobiInImovel = true;
            }
          }
    
          if (
            !(await Condominio.findOne({ where: { chave_condominio } })) ||
            !(await Imovel.findByPk(id)) ||
            !isImobiInImovel
          ) {
            const error = new Error("Make sure all parameters are correct");
            error.status = 400;
            throw error;
          }
    
          const imobiliaria = await Imobiliaria.findOne({ where: { chave_imobi } });
    
          const imovel = await Imovel.findByPk(id);
          await imovel.removeImobiliarias(imobiliaria);
    
          return res.status(200).send();
        } catch (err) {
          next(err);
        }
      }
};