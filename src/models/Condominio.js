const { Model, DataTypes } = require('sequelize');

class Condominio extends Model {
    static init(sequelize) {
        super.init({
            nome_condominio: DataTypes.STRING,
            chave_condominio: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Images, { foreignKey: 'chave_condominio', as: 'images' });
        this.hasMany(models.Imoveis, { foreignKey: 'chave_condominio', as: 'imoveis' });
        this.belongsToMany(models.Imobiliarias, { foreignKey: 'condominio_id', through: 'condominio_imobiliarias', as: 'imobiliarias' });
    }
}

module.exports = Condominio;