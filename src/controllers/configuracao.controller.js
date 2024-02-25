const { validationResult } = require('express-validator');
const ConfiguracaoService = require('../services/configuracao.service');
const estabelecimentoRepository = require('../repositories/estabelecimento.repository');
const createError = require('http-errors');

const create = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }

        estabelecimento = await estabelecimentoRepository.findOneByWhere({usu_id: req.usuario_id});
        const response = await ConfiguracaoService.create({
            cfgt_id: req.body.cfgtId,
            est_id: estabelecimento.id,
            numero: req.body.numero,
            texto: req.body.texto,
        });
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        return next(error);
    }
}

const update = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, { errors: errors.array() })
        }
        
        const response = await ConfiguracaoService.update({
            numero: req.body.numero,
            texto: req.body.texto,
        }, req.params.cfgId);
        if(response && response.message){
            throw response;
        }

        res.send(response)
    } catch (error) {
        return next(error);
    }
}

const findAll = async function(req, res, next){
    try {
        const configuracoes = await ConfiguracaoService.findAll();
        res.send(configuracoes);
    } catch (error) {
        next(error);
    }
}

const findById = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await ConfiguracaoService.findById(req.params.cfgId);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

const findByEstId = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await ConfiguracaoService.findByEstId(req.params.estId);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

const findByCfgtId = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await ConfiguracaoService.findByCfgtId(req.params.cfgtId);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
}

const deletar = async function(req, res, next){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw createError(422, {errors: errors.array()});
        }
        
        const response = await ConfiguracaoService.deletar(req.params.cfgId);
        if(response && response.message){
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
    
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