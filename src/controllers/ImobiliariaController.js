const Imobiliaria = require("../models/Imobiliaria");
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

      const condominioId = await (await Condominio.findOne({ where: { chave_condominio } })).id;

      const condominio = await Condominio.findByPk(condominioId, {
          include: { association: 'imobiliarias', through: { attributes: [] } }
      });

      return res.status(200).json(condominio.imobiliarias);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { chave_condominio } = req.params;

      const condominio = await Condominio.findOne({ where: { chave_condominio } });

      if (!condominio) {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const {
        chave_imobi,
        nome_imobi,
        tel_fix_imobi,
        tel_whats_imobi,
        url_website_imobi,
        url_logo_intro_imobi,
        url_logo_mobile_imobi,
        url_logo_base_direita_imobi,
        url_logo_menu_imobi,
        url_logo_marca_dagua_imobi,
      } = req.body;

      const dataImobi = {
        chave_imobi,
        nome_imobi,
        tel_fix_imobi,
        tel_whats_imobi,
        url_website_imobi,
        url_logo_intro_imobi,
        url_logo_mobile_imobi,
        url_logo_base_direita_imobi,
        url_logo_menu_imobi,
        url_logo_marca_dagua_imobi,
      };

      for (let key in dataImobi) {
        if (!dataImobi[key]) {
          const error = new Error("Enter the fields correctly");
          error.status = 400;
          throw error;
        }
      }

      const [imobiliaria] = await Imobiliaria.findOrCreate({
        where: {
            chave_imobi
        },
        defaults: {
          ...dataImobi
        }
      });

      await condominio.addImobiliarias(imobiliaria);

      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { chave_condominio, chave_imobiliaria } = req.params;

      const condominio = await Condominio.findOne({ where: { chave_condominio } });

      if (!condominio || chave_condominio === 'default') {
        const error = new Error("Make sure all parameters are correct");
        error.status = 400;
        throw error;
      }

      const {
        chave_imobi,
        nome_imobi,
        tel_fix_imobi,
        tel_whats_imobi,
        url_website_imobi,
        url_logo_intro_imobi,
        url_logo_mobile_imobi,
        url_logo_base_direita_imobi,
        url_logo_menu_imobi,
        url_logo_marca_dagua_imobi,
      } = req.body;

      if (await Imobiliaria.findOne({ where: { chave_imobi } }) && chave_imobi !== chave_imobiliaria) {
        const error = new Error("Enter the fields correctly");
        error.status = 400;
        throw error;
      }

      const dataImobi = {
        chave_imobi,
        nome_imobi,
        tel_fix_imobi,
        tel_whats_imobi,
        url_website_imobi,
        url_logo_intro_imobi,
        url_logo_mobile_imobi,
        url_logo_base_direita_imobi,
        url_logo_menu_imobi,
        url_logo_marca_dagua_imobi,
      };

      for (let key in dataImobi) {
        if (!dataImobi[key]) {
          const error = new Error("Enter the fields correctly");
          error.status = 400;
          throw error;
        }
      }
  
        await Imobiliaria.update({ ...dataImobi }, { where: { chave_imobi: chave_imobiliaria } });
  
        return res.status(200).send();   
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
        const { chave_condominio, chave_imobiliaria } = req.params;

        const condominio = await Condominio.findOne({ where: { chave_condominio } });
  
        if (!condominio || !await Imobiliaria.findOne({ where: { chave_imobi: chave_imobiliaria } }) || chave_condominio === 'default') {
          const error = new Error("Make sure all parameters are correct");
          error.status = 400;
          throw error;
        }

        const imobiliaria = await Imobiliaria.findOne({ where: { chave_imobi: chave_imobiliaria } });
        console.log(imobiliaria)

        condominio.removeImobiliarias(imobiliaria);

        return res.status(200).send();
    } catch (err) {
      next(err);
    }
  },
};
