const produto = require("../rotas/produto")

function Produto(conexao){
    this._conexao = conexao
}
Produto.prototype.getProduto = function(callback){
    this._conexao.query('select * from produto', callback)
}
Produto.prototype.getProdutoById = function(id, callback){
    this._conexao.query(`select * from produto where id = ${id}`, callback)
}
Produto.prototype.cadastrarProduto = function(dados,  callback){
    this._conexao.query('insert into produto set ?', dados, callback)
}
Produto.prototype.getListaProduto = function(callback){
    this._conexao.query('select * from produto', callback)
}
Produto.prototype.getProdutoByDesc = function(descricao, callback){
    this._conexao.query(`select * from produto where descricao = '${descricao}'`, callback)
}
Produto.prototype.getCadastrarProduto = function(dados, callback){
    this._conexao.query(`insert into produto values(null,'${dados.descricao}', '${dados.preco}')`, callback)
}
Produto.prototype.Editar = function(dados, id, callback){
    this._conexao.query(`update produto set descricao = '${dados.descricao}', preco='${dados.preco}' where id='${id}'`, callback)
}
Produto.prototype.excluirProduto = function(idProduto, callback){
    this._conexao.query(`delete from produto where id = ${idProduto}`, callback)
}
Produto.prototype.getProdutoCarrinho = function(id){
    return new Promise((resolve, reject) => {
        this._conexao.query(`select * from produto where id = ${id} `, function(errors, result) {
            resolve(result);
        })
    })
}
Produto.prototype.getProdutos = function (callback) {    
    return new Promise((resolve, reject) => {
         this._conexao.query(`select * from produto`, function(error, result){
             resolve(result)
         })        
    })
}
module.exports = function (){    
    return Produto
}