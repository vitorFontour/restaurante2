module.exports.adicionar = async function (app, req, response) {
    const idProduto = req.params.idProduto;
    const idUsuario = req.session.id_usuario;

    const conexao = app.config.conexao;
    const modelPedido = new app.app.models.modelPedido(conexao);
    const modelProdutoPedido = new app.app.models.modelProdutoPedido(conexao);

    //verifica se existe um pedido aberto
    const existePedidoAberto = await modelPedido.existePedidoAberto(idUsuario)

    if (!existePedidoAberto) {
        //cria um pedido
        await modelPedido.criarPedido(idUsuario);
    }

    //pega o id do pedido aberto
    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario);

    //salva o id do pedido aberto em sessão
    req.session.id_pedido = idPedido;

    //verifica se o produto já foi adicionado no pedido aberto
    const existeProduto = await modelProdutoPedido.existeProduto(idProduto, idPedido)

    if (existeProduto) {
        await modelProdutoPedido.alterarQuantidade(idProduto, idPedido)
    }
    else {
        await modelProdutoPedido.inserirProduto(idProduto, idPedido)
    }

    response.redirect('/usuario/lista_produto');
}
module.exports.listar_carrinho = async function (app, req, res) {
    const conexao = app.config.conexao;
    const modelProdutoPedido = new app.app.models.modelProdutoPedido(conexao);
    const modelProduto = new app.app.models.modelProduto(conexao);
    const modelPedido = new app.app.models.modelPedido(conexao);
    const idUsuario = req.session.id_usuario;
    const idPedido = await modelPedido.getIdPedidoAberto(idUsuario);
    req.session.id_pedido = idPedido;

    if (!req.session.id_pedido) {
        const erros = [{msg: 'Seu carrinho está vazio!'}];
        res.render('produto/carrinho', {erros: erros, carrinho: [], valorTotal: 0});
        return;
    }

    let carrinho = await modelProdutoPedido.getProdutosPedido(idPedido);
    let valorTotal = 0;

    for (let i = 0; i < carrinho.length; i++) {
        const produto = await modelProduto.getProdutoCarrinho(carrinho[i].id_produto);

        carrinho[i].descricao = produto[0].descricao;
        carrinho[i].preco = produto[0].preco;

        valorTotal += carrinho[i].quantidade * produto.preco;
    }
    
    
    res.render('produto/carrinho', {erros: {}, carrinho: carrinho, valorTotal: valorTotal})
}
module.exports.excluir_pedido = function (app, req, res){
   
    const conexao = app.config.conexao
    
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)
    const idCarrinho = req.params.idCarrinho

    modelCarrinho.excluirPedido(idCarrinho, function(error, result){
        res.redirect('/produto/carrinho')
       
    })
}
module.exports.tela_alterar_quantidade = async function (app, req, res){
    const conexao = app.config.conexao
    const idProduto = req.params.id_produto
    const idPedido = req.session.id_pedido
    const modelProduto = new app.app.models.modelProduto(conexao)    
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)
    const produto = await modelProduto.getProdutoById()
    console.log(produto)
    const carrinho = await modelCarrinho.getProdutoPedido(idProduto, idPedido)  

    res.render('produto/alterar_quantidade', {produto:produto, carrinho: carrinho})
   
} 
module.exports.alterar_quantidade = async function (app, req, res){
   
    const conexao = app.config.conexao    
    const modelCarrinho = new app.app.models.modelCarrinho(conexao)
    const dados = req.body
    const idProduto = req.params.id_produto    
    const idPedido = req.session.id_pedido
    const quantidade = dados.quantidade
    await modelCarrinho.alterarQuantidade(quantidade, idProduto, idPedido)
    console.log(idPedido)
    console.log(idProduto)
    
    
   
    res.redirect('/produto/carrinho')
       
    
}