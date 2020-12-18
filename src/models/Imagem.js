const { Model, DataTypes } = require('sequelize');

class Images extends Model {
    static init(sequelize) {
        super.init({
            url_image: DataTypes.STRING,
        }, {
            sequelize,
            freezeTableName: false
        })
    }

    static associate(models) {
        this.belongsTo(models.Condominio, { foreignKey: 'chave_condominio', as: 'condominio' });
    }
}

module.exports = Images;