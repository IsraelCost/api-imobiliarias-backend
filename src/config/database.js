module.exports = {
    dialect: 'mysql',
    host: process.env.HOSTDATABASE,
    username: process.env.USERNAMEDATABASE,
    password: process.env.PASSWORDDATABASE,
    database: 'api_imobiliarias',
    define: {
        timestamps: true,
        underscored: true
    }
};