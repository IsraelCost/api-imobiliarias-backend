'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('imoveis', [{
       titulo_imovel: 'default',
        qtd_dormitorios_imovel: 'default',
        area_imovel: 'default',
        valor_imovel: 'default',
        url_thumb_imovel: 'default',
        url_baixar_galeria_imovel: 'default',
        url_compartilhar_galeria_imovel: 'default',
        url_vt360_imovel: 'default',
        onclick_function_imovel_location: 'default',
        nomes_lotes_for_hotspots: 'default'
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('imoveis', null, {});
  }
};
