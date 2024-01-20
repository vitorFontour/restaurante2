module.exports = function (app)
{
    app.get('/cadastro_usuario', function (req, res){
        app.app.controller.usuarios.cadastro_usuario(app, req, res)
    })
    app.post('/usuario/cadastrar', function(req, res){
        app.app.controller.usuarios.cadastrar(app, req, res)
    })
    app.get('/usuario/login', function(req, res){
        app.app.controller.usuarios.login(app, req, res)
    })
    app.post('/usuario/validar', function(req, res){
        app.app.controller.usuarios.validar(app, req, res)
    })
    app.get('/usuario/lista_produto', function(req, res){
        app.app.controller.produto.listar(app, req, res) 
    })
    app.get('/', function(req, res){
        app.app.controller.usuarios.login(app, req, res)
    })
    app.get('/logout', function(req, res){
        app.app.controller.usuarios.logout(app, req, res)
    })
    app.get('/admin/editar_usuario/:idUsuario', function (req, res){
        app.app.controller.admin.tela_editar_user(app, req, res)
    })
    app.post('/admin/salvar_usuario/:idUsuario', function (req, res){
        app.app.controller.admin.salvar_user(app,req,res)
    })       
    app.get('/usuario/editar_cliente', function (req, res){
        app.app.controller.usuarios.tela_editar_cliente(app, req, res)
    })
    app.post('/usuario/salvar_usuario/:idUsuario', function (req, res){
        app.app.controller.usuarios.salvar_user(app,req,res)
    })    
    app.get('/usuario/editar_senha', function (req, res){
        app.app.controller.usuarios.tela_editar_senha(app, req, res)
    })
    app.post('/usuario/salvar_senha/:idUsuario', function (req, res){
        app.app.controller.usuarios.salvar_senha(app,req,res)
    })
    app.get('/usuario/excluir_pedido/:idCarrinho', function (req, res){
        app.app.controller.carrinho.excluir_pedido(app,req,res)
    })
    
    app.get('/usuario/finalizar_pedido', function (req, res){
        app.app.controller.carrinho.finalizar(app,req,res)
    })
   



 
    
    
}