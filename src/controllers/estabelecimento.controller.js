const { validationResult } = require("express-validator");
const estabelecimentoService = require("../services/estabelecimento.service");
const produtoService = require("../services/produto.service");
const categoriaService = require("../services/categoria.service");
const createError = require("http-errors");

const create = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
      logo: req.file ? req.file.firebaseUrl : null,
      usu_id: req.usuario_id,
    });
    if (response && response.message) {
      throw response;
    }

    // cria 1 categoria e 1 produto teste
    const responseCategoria = await categoriaService.create({
      nome: "Categoria de teste",
      est_id: response.id,
      ativo: 1,
    });

    if (responseCategoria.id) {
      await produtoService.create({
        cat_id: responseCategoria.id,
        nome: "Produto Teste",
        descricao: "Produto para você testar como é seu cardápio no primeiro momento",
        valor: 19.99,
        ativo: 1,
        ordem: 1
      })
    }

    console.log("ESTABELECIMENTO CRIADO: " + response.nome);
    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const update = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }
    const response = await estabelecimentoService.update(
      {
        nome: req.body.nome,
        descricao: req.body.descricao,
        logo: req.body.logo,
      },
      req.usuario_id
    );
    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const updateById = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.updateById(
      {
        nome: req.body.nome,
        descricao: req.body.descricao,
        logo: req.file ? req.file.firebaseUrl : null,
      },
      req.params.id
    );
    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const findAll = async function (req, res, next) {
  try {
    const estabelecimentos = await estabelecimentoService.findAll();
    res.send(estabelecimentos);
  } catch (error) {
    next(error);
  }
};

const findById = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.findById(req.params.id);
    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const findByUserId = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.findByUserId(req.usuario_id);
    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const findByUrl = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.findByUrl(
      req.params.estabelecimento
    );
    if (response && response.message) {
      throw response;
    }
    //tranforma valor em number
    response?.Categoria?.map((categoria) => {
      categoria.dataValues.Produtos.map((produto) => {
        produto.dataValues.valor = parseFloat(produto.dataValues.valor);
      });
    });

    //arruma horario
    response?.horario_atendimentos?.map((horario) => {
      horario.dataValues.hor_abre = horario.dataValues.hor_abre.substring(0, 5);
      horario.dataValues.hor_fecha = horario.dataValues.hor_fecha.substring(
        0,
        5
      );
    });

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const findUrl = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.findById(req.params.id);
    if (response && response.message) {
      throw response;
    }

    res.send(response.url);
  } catch (error) {
    next(error);
  }
};

const deletar = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await estabelecimentoService.deletar(req.params.id);
    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  findAll,
  findById,
  findByUrl,
  updateById,
  findByUserId,
  deletar,
  findUrl,
};
