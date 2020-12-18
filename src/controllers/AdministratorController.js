const Administrador = require('../models/Administrador');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = {
    async index(req, res, next) {
        try {
            const administrator = await Administrador.findOne();

            if (administrator) {
                administrator.password = undefined;
            }

            return res.json(administrator);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const administratorAlreadyExists = await Administrador.findOne();

            if (administratorAlreadyExists) {
                const error = new Error('Administrator already exists');
                error.status = 400;
                throw error;
            }

            const { username, password } = req.body;
            console.log(req.body)

            if (!username || !password) {
                const error = new Error('Enter the fields correctly');
                error.status = 400;
                throw error;
            }

            const administrator = await Administrador.create({ username, password });

            return res.status(201).send();
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const administratorExists = await Administrador.findOne({ where: { id } });

            if (!administratorExists) {
                const error = new Error('Make sure all parameters are correct');
                error.status = 400;
                throw error;
            }

            const { username, password } = req.body;

            if (!username || !password) {
                const error = new Error('Enter the fields correctly');
                error.status = 400;
                throw error;
            }

            await Administrador.update({ username, password }, { where: { id } });

            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        try {   
            const { id } = req.params;
            const administratorExists = await Administrador.findOne({ where: { id } });

            if (!administratorExists) {
                const error = new Error('Make sure all parameters are correct');
                error.status = 400;
                throw error;
            }

            await Administrador.destroy({ where: { id } });

            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    },

    async auth(req, res, next) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                const error = new Error('Enter the fields correctly');
                error.status = 400;
                throw error;
            }

            const administrator = await Administrador.findOne({ where: { username } });

            if (!administrator) {
                const error = new Error('User not found');
                error.status = 400;
                throw error;
            }

            if (!await bcrypt.compare(password, administrator.password)) {
                const error = new Error('Invalid password');
                error.status = 400;
                throw error;
            }

            administrator.password = undefined;

            const token = jwt.sign({ id: administrator.id }, authConfig.secret, {
                expiresIn: 1000 * 60 * 60 * 24
            });

            res.status(200).send({ administrator, token });
        } catch (err) {
            next(err);
        }
    }
};