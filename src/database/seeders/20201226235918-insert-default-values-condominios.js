'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('condominios', [{
      nome_condominio: 'default', 
      chave_condominio: 'default'
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('condominios', null, {});
  }
};
