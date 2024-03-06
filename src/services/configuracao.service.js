const configuracaoRepository = require('../repositories/configuracao.repository');
const createError = require('http-errors')

const create = async function(configuracao){
    const configuracaoCriado = await configuracaoRepository.create(configuracao);
    return configuracaoCriado;
}

const update =  async function(configuracao, cfgId){
    const thereIsEstabelecimento = await configuracaoRepository.findById(cfgId)
    if(!thereIsEstabelecimento){
        return createError(404, 'configuracao não existe');
    }

    await configuracaoRepository.update(configuracao, cfgId)

    return await configuracaoRepository.findById(cfgId)
}

const findAll = async function(){
    const configuracaos = await configuracaoRepository.findAll();
    return configuracaos;
}

const findById = async function(cfgId){
    const configuracao = await configuracaoRepository.findById(cfgId);

    if(!configuracao){
        return createError(404, "configuracao não encontrado")
    }
    return configuracao;
}

const findByEstId = async function(estId){
    const configuracao = await configuracaoRepository.findAllByWhere({est_id: estId});

  /*   if(!configuracao){
        return createError(404, "configuracaos não encontrado")
    } */
    return configuracao;
}

const findByCfgtId = async function(cfgtId){
    const configuracao = await configuracaoRepository.findOneByWhere({cfgt_id: cfgtId});

    return configuracao;
}

const deletar = async function(cfgId){
    const configuracao = await configuracaoRepository.findById(cfgId);

    if(!configuracao){
        return createError(404, "configuracao não encontrado")
    }
    await configuracaoRepository.deletar(cfgId);
    return configuracao;
}

module.exports = {
    create,
    update,
    findAll,
    findById,
    findByEstId,
    findByCfgtId,
    deletar,
}