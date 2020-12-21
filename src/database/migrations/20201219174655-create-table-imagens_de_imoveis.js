'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('imagens_de_imoveis', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_imovel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'imoveis', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('imagens_de_imoveis');
  }
};