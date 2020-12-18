'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('imobiliarias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chave_imobi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome_imobi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tel_fix_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tel_whats_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_website_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_logo_intro_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_logo_mobile_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_logo_base_direita_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_logo_menu_imobi: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url_logo_marca_dagua_imobi: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('imobiliarias');
  }
};
