const express = require('express');
const router = express.Router();
const configuracaoController = require('../controllers/configuracao.controller');
const veriftJWT = require('../middlewares/authorizator')

router.get('/', (req, res, next) => {
    res.send("PONG");
});


module.exports = router;