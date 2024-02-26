'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfiguracaoTipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ConfiguracaoTipo.init({
    descricao: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ConfiguracaoTipo',
    tableName: 'configuracaoTipo',
    paranoid: true,
  });
  return ConfiguracaoTipo;
};