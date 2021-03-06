const { Model, DataTypes } = require('sequelize');

class Imoveis extends Model {
    static init(sequelize) {
        super.init({
            titulo_imovel: DataTypes.STRING,
            qtd_dormitorios_imovel: DataTypes.STRING,
            area_imovel: DataTypes.STRING,
            valor_imovel: DataTypes.STRING,
            url_thumb_imovel: DataTypes.STRING,
            url_baixar_galeria_imovel: DataTypes.STRING,
            url_compartilhar_galeria_imovel: DataTypes.STRING,
            url_vt360_imovel: DataTypes.STRING,
            onclick_function_imovel_location: DataTypes.STRING,
            nomes_lotes_for_hotspots: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'imoveis'
        });
    }

    static associate(models) {
        this.belongsTo(models.Condominio, { foreignKey: 'chave_condominio', as: 'condominio' });
        this.hasMany(models.Imagens_Imovel, { foreignKey: 'id_imovel', as: 'imagens' });
        this.belongsToMany(models.Imobiliarias, { foreignKey: 'imovel_id', through: 'imovel_imobiliarias', as: 'imobiliarias' });
    }
}

module.exports = Imoveis;