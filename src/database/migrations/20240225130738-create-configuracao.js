'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('configuracao', {
      cfg_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cfgt_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: "configuracaoTipo"
          },
          key: "cfgt_id"
        }
      },
      est_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: "estabelecimentos"
          },
          key: "id"
        }
      },
      numero: {
        type: Sequelize.INTEGER
      },
      texto: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('configuracao');
  }
};