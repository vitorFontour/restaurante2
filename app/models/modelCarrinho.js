const { resolve } = require('path')

function Carrinho(conexao) {
    this._conexao = conexao
    this._crypto = require('crypto')
}
Carrinho.prototype.existePedido = function (idProduto, idPedido) {    
   return new Promise((resolve, reject) => {
        this._conexao.query(`select * from carrinho where id_produto = '${idProduto}' and id_pedido = '${idPedido}'`, function(error, result){
            resolve(result)
        })        
   })
}
Carrinho.prototype.excluirPedido = function (idCarrinho, callback) {
    this._conexao.query(`delete from carrinho where id = ${idCarrinho}`, callback)
}
Carrinho.prototype.getProdutoPedido = function (idProduto, idPedido) {    
    return new Promise((resolve, reject) => {
         this._conexao.query(`select * from carrinho where id_pedido = '${idPedido}' and id_produto = '${idProduto}'`, function(error, result){
             resolve(result)
         })        
    })
}
Carrinho.prototype.alterarQuantidade = function (quantidade,idProduto, idPedido) {    
    return new Promise((resolve, reject) => {
         this._conexao.query(`update carrinho set quantidade = ${quantidade} where id_pedido=${idPedido} and id_produto = ${idProduto}`, function(error, result){
             resolve(result)
         })        
    })
}
module.exports = function(){
    return Carrinho
}