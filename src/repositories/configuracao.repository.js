const {Configuracao} = require('../database/models')

const create = async function(Cfg){
    const ConfiguracaoCriado = await Configuracao.create(Cfg);
    return ConfiguracaoCriado;
}

const update = async function(Configuracao, cfgId){
    await Configuracao.update(Configuracao, {
        where: {cfg_id: cfgId}
    });
}

const findAll = async function(){
    const Configuracaos = await Configuracao.findAll();
    return Configuracaos;
}

const findById = async function(cfgId){
    const Configuracao = await Configuracao.findByPk(cfgId);
    return Configuracao;
}

const findOneByWhere = async function(where){
    const Configuracao = await Configuracao.findOne({
        where: where
    });
    return Configuracao;
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