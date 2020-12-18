'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('condominios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome_condominio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chave_condominio: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('condominios');
  }
};