const { Model, DataTypes } = require('sequelize');

class Imobiliarias extends Model {
    static init(sequelize) {
        super.init({
            chave_imobi: DataTypes.STRING,
            nome_imobi: DataTypes.STRING,
            tel_fix_imobi: DataTypes.STRING,
            tel_whats_imobi: DataTypes.STRING,
            url_website_imobi: DataTypes.STRING,
            url_logo_intro_imobi: DataTypes.STRING,
            url_logo_mobile_imobi: DataTypes.STRING,
            url_logo_base_direita_imobi: DataTypes.STRING,
            url_logo_menu_imobi: DataTypes.STRING,
            url_logo_marca_dagua_imobi: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'imobiliarias'
        })
    }

    static associate(models) {
        this.belongsToMany(models.Condominio, { foreignKey: 'imobiliaria_id', through: 'condominio_imobiliarias', as: 'condominios' });
        this.belongsToMany(models.Imoveis, { foreignKey: 'imobiliaria_id', through: 'imovel_imobiliarias', as: 'imoveis' });
    }
}

module.exports = Imobiliarias;