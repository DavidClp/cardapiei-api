'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configuracao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Configuracao.belongsTo(models.ConfiguracaoTipo, {foreignKey: "cfgt_id", as: "configuracaoTipo"});
      Configuracao.belongsTo(models.Estabelecimento, {foreignKey: "est_id", as: 'estabelecimento'});
    }
  }
  Configuracao.init({
    cfg_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  
    },
    est_id: DataTypes.INTEGER,
    cfgt_id: DataTypes.INTEGER,
    numero: DataTypes.INTEGER,
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Configuracao',
    tableName: "configuracao"
  });
  return Configuracao;
};