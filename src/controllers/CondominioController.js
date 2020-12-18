const Condominio = require('../models/Condominio');

module.exports = {
    async index(req, res, next) {
        try {
            const results = await Condominio.findAll();
            return res.status(200).json(results);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const { nome_condominio, chave_condominio } = req.body;

            if (!nome_condominio || !chave_condominio || await Condominio.findOne({ where: { chave_condominio } })) {
                const error = new Error('Enter the fields correctly');
                error.status = 400;
                throw error;
            }

            await Condominio.create({ nome_condominio, chave_condominio });

            return res.status(201).send();
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const { chave } = req.params;

            if (!await Condominio.findOne({ where: { chave_condominio: chave } }) || chave === 'default') {
                const error = new Error('Make sure all parameters are correct');
                error.status = 400;
                throw error;
            }

            const { nome_condominio, chave_condominio } = req.body;

            if (!nome_condominio && !chave_condominio || await Condominio.findOne({ where: { chave_condominio } }) && chave !== chave_condominio) {
                const error = new Error('Enter the fields correctly');
                error.status = 400;
                throw error;
            }

            await Condominio.update({ nome_condominio, chave_condominio }, {
                where: { chave_condominio: chave }
            });

            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const { chave } = req.params;

            if (!await Condominio.findOne({ where: { chave_condominio: chave } }) || chave === 'default') {
                const error = new Error('Make sure all parameters are correct');
                error.status = 400;
                throw error;
            }

            await Condominio.destroy({ where: { chave_condominio: chave } });

            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    },
};