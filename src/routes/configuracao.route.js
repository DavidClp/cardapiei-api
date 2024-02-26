const express = require('express');
const router = express.Router();
const configuracaoController = require('../controllers/configuracao.controller');
const veriftJWT = require('../middlewares/authorizator')

router.post('/', veriftJWT,  configuracaoController.create);

router.get('/geral', veriftJWT, configuracaoController.findAll);

router.get('/:estId', configuracaoController.findByEstId);

router.get('/tipo/:cfgtId', veriftJWT, configuracaoController.findById);

router.get('/geral/:cfgId', veriftJWT, configuracaoController.findByCfgtId);

router.put('/:cfgId', veriftJWT, configuracaoController.update);

router.delete('/:cfgId', veriftJWT, configuracaoController.deletar);

module.exports = router;