'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('condominio_imobiliarias', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      condominio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'condominios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      imobiliaria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'imobiliarias', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('condominio_imobiliarias');
  }
};