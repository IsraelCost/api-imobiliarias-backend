'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('imobiliarias', [{
      chave_imobi: 'default',
      nome_imobi: 'default',
      tel_fix_imobi: 'default',
      tel_whats_imobi: 'default',
      url_website_imobi: 'default',
      url_logo_intro_imobi: 'default',
      url_logo_mobile_imobi: 'default',
      url_logo_base_direita_imobi: 'default',
      url_logo_menu_imobi: 'default',
      url_logo_marca_dagua_imobi: 'default',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('imobiliarias', null, {});
  }
};
