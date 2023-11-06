const express = require('express');
const verificarToken = require('../middlewares/verificarToken');
const router = express.Router();

router.get('/', verificarToken);

module.exports = router;