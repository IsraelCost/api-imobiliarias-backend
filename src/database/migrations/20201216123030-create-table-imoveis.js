'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('imoveis', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chave_condominio: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'condominios', key: 'chave_condominio' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titulo_imovel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      qtd_dormitorios_imovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area_imovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_imovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_thumb_imovel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_galeria_imovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_vt360_imovel: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      onclick_function_imovel_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomes_lotes_for_hotspots: {
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
    await queryInterface.dropTable('imoveis');
  }
};
