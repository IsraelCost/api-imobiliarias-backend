const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

const Condominios = require('../models/Condominio');
const Image = require('../models/Imagem');
const Imobiliaria = require('../models/Imobiliaria');
const Imovel = require('../models/Imovel');
const Administradores = require('../models/Administrador');

Image.init(connection);
Imobiliaria.init(connection);
Imovel.init(connection);
Administradores.init(connection);
Condominios.init(connection);

Image.associate(connection.models);
Imovel.associate(connection.models);
Imobiliaria.associate(connection.models);
Condominios.associate(connection.models);

module.exports = connection;