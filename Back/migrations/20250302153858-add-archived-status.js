'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Alerts', 'status', {
      type: Sequelize.ENUM('active', 'resolved', 'archived'),
      defaultValue: 'active'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Alerts', 'status', {
      type: Sequelize.ENUM('active', 'resolved'),
      defaultValue: 'active'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
