'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PeopleNames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(191)
      },
      rank: {
        type: Sequelize.INTEGER
      },
      fraction: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      birthYear: {
        type: Sequelize.INTEGER
      },
      birthCount: {
        type: Sequelize.INTEGER
      },
      jsonData: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PeopleNames');
  }
};
