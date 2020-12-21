const { Model, DataTypes } = require('sequelize');

class Imagens_Imovel extends Model {
    static init(sequelize) {
        super.init({
            url_image: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'imagens_de_imoveis'
        })
    }

    static associate(models) {
        this.belongsTo(models.Imoveis, { foreignKey: 'id_imovel', as: 'imovel' });
    }
}

module.exports = Imagens_Imovel;