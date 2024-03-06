const {Configuracao} = require('../database/models')

const create = async function(Cfg){
    const ConfiguracaoCriado = await Configuracao.create(Cfg);
    return ConfiguracaoCriado;
}

const update = async function(cfg, cfgId){
    await Configuracao.update(cfg, {
        where: {cfg_id: cfgId}
    });
}

const findAll = async function(){
    const response = await Configuracao.findAll();
    return response;
}

const findById = async function(cfgId){
    const response = await Configuracao.findByPk(cfgId);
    return response;
}

const findOneByWhere = async function(where){
    const response = await Configuracao.findOne({
        where: where
    });
    return response;
}

const findAllByWhere = async function(where){
    const Configuracaos = await Configuracao.findAll({
        where: where
    });
    return Configuracaos;
}

const deletar = async function(cfgId){
    return await Configuracao.destroy({where: {cfg_id: cfgId}});
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findOneByWhere,
    findAllByWhere,
    deletar
}