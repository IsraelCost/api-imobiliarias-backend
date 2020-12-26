require('dotenv').config('../../.env');

module.exports = {
    dialect: 'mysql',
    host: process.env.HOSTDATABASE,
    username: process.env.USERNAMEDATABASE,
    password: process.env.PASSWORDDATABASE,
    database: 'api-imobiliarias',
    define: {
        timestamps: true,
        underscored: true
    }
};