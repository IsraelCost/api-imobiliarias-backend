const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');

class Administradores extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'administradores',
            hooks: {
                async beforeSave(administrator) {
                    const hash = await bcrypt.hash(administrator.password, 10);
                    administrator.password = hash;
                }
            }
        });
    }
}

module.exports = Administradores;