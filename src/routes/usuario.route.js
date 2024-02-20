const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');
const veriftJWT = require('../middlewares/authorizator')
const usuarioValidator = require('../validators/usuario.validator');

router.post('/', usuarioValidator.create(),  usuarioController.create);
/* router.post('/', usuarioValidator.create(),  usuarioController.create, estabelecimentoController.create, horarioController.create, contatoController.create, localizacaoController.create); */

router.post('/login', usuarioValidator.login(),  usuarioController.login);

router.get('/', veriftJWT, usuarioController.findAll);

router.get('/:id', veriftJWT, usuarioValidator.findById(), usuarioController.findById);

router.put('/geral/:id', veriftJWT, usuarioValidator.update(), usuarioController.update); 

router.put('/senha', veriftJWT, usuarioController.updateSenhaUserAtual);

router.delete('/:id', veriftJWT, usuarioValidator.deletar(), usuarioController.deletar);

module.exports = router;