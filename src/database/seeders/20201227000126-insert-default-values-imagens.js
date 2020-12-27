'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('imagens', [{
      chave_condominio: 'default',
      url_image: 'default', 
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('imagens', null, {});
  }
};
