const { validationResult } = require("express-validator");
const produtoService = require("../services/produto.service");
const createError = require("http-errors");

const create = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    /* GAMBIARRA, PROCURAR ARRUMAR DEPOIS */
    /*         estabelecimento = await estabelecimentoRepository.findOneByWhere({usu_id: req.usuario_id});
    categoria = await categoriaRepository.findOneByWhere({est_id: estabelecimento.id}) */
    const response = await produtoService.create({
      cat_id: req.params.cat_id,
      nome: req.body.nome,
      descricao: req.body.descricao,
      valor: req.body.valor,
      ordem: req.body.ordem,
      ativo: 1,
      imagem: req.file ? req.file.firebaseUrl : null,
    });
    if (response && response.message) {
      throw response;
    }

    verificarOrdemProdutos(
      req.body.ordem,
      req.body.catId,
      response.dataValues.id
    );
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

    verificarOrdemProdutos(req.body.ordem, req.body.catId, req.params.id);

       const response = await produtoService.update({
            nome: req.body.nome,
            valor: req.body.valor,
            descricao: req.body.descricao,
            ordem: req.body.ordem,
            imagem: req.file ? req.file.firebaseUrl: null,
        }, req.params.id);
        if(response && response.message){
            throw response;
        }

        res.send(response)
  } catch (error) {
    return next(error);
  }
};

async function verificarOrdemProdutos(ordem, cat_id, proId) {
    const todosProdutos = await produtoService.findByCatId(cat_id);
    const produtoParaAtualizar = todosProdutos.filter((produto) => {
        return produto.id === parseInt(proId);
    })[0];
    const produtos = todosProdutos.filter((produto) => {
      return (
          produto.id !== parseInt(proId) &&
          produto.ordem < produtoParaAtualizar?.dataValues?.ordem 
          &&  produto.ordem >= ordem
          );
        });
        
        if (produtos.length <= 0) return;
        const ordensProdutos = [];
        //pega todas as ordens
        produtos.map((produto) => {
            ordensProdutos.push(produto.ordem);
        });
        
  //se tiver ordem igual, atualiza todos os produtos para rebaixar todas as ordem
  if (ordensProdutos.includes(parseInt(ordem))) {
    produtos.map((produtoData) => {
      const produto = produtoData.dataValues;
       const ordem = parseInt(produto.ordem) + 1
        produtoService.update({
            ...produto,
            ordem: ordem
        }, produto.id)
    });
  }
}

const updateSituacao = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }
    const response = await produtoService.updateSituacao(
      {
        ativo: req.body.ativo,
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
    const produtos = await produtoService.findAll();
    res.send(produtos);
  } catch (error) {
    next(error);
  }
};

const findByCatId = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createError(422, { errors: errors.array() });
    }

    const response = await produtoService.findByCatId(req.params.id);
    if (response && response.message) {
      throw response;
    }
    res.send(response);
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

    const response = await produtoService.findById(req.params.proId);
    if (response && response.message) {
      throw response;
    }
    response.valor = Number(response.valor);
    res.send(response);
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

    const response = await produtoService.deletar(req.params.id);
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
  updateSituacao,
  findByCatId,
  findAll,
  findById,
  deletar,
};
