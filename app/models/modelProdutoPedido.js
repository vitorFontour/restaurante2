function ProdutoPedido (conexao) {
    this._conexao = conexao;
    this._crypto = require('crypto');
}

ProdutoPedido.prototype.existeProduto = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM carrinho WHERE id_pedido =  ${idPedido} AND id_produto = ${idProduto};`, function(errors, result) {
            if (result.length == 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        })
    })
}

ProdutoPedido.prototype.alterarQuantidade = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`UPDATE carrinho set quantidade = quantidade + 1 WHERE id_produto = ${idProduto} AND id_pedido = ${idPedido}`, function(errors, result) {
            resolve(result);
        })
    })
}

ProdutoPedido.prototype.inserirProduto = function (idProduto, idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`INSERT INTO carrinho VALUES (NULL, ${idPedido}, ${idProduto}, 1);`, function(errors, result) {
            resolve(result);
        })
    })
}

ProdutoPedido.prototype.getProdutosPedido = function (idPedido) {
    return new Promise((resolve, reject) => {
        this._conexao.query(`SELECT * FROM carrinho WHERE id_pedido =  ${idPedido};`, function(errors, result) {
            resolve(result);
        })
    })
}

module.exports = function () {
    return ProdutoPedido;
}