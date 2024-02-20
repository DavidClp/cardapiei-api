const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = function (req, res, next) {
    const token = req.headers['token'];

    if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      // Você pode adicionar a verificação de permissões ou outras lógicas aqui, se necessário.
      return res.status(201).json({ mensagem: 'Token valido' });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ mensagem: 'Token expirado' });
      } else {
        return res.status(401).json({ mensagem: 'Token inválido' });
      }
    }
  }

  module.exports = verificarToken;