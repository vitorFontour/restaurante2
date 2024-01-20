module.exports.cadastro_usuario = function (app, req, res) {
    res.render('usuario/cadastro_usuario', { erros: {}, usuario: {} })
}
module.exports.cadastrar = function (app, req, res) {

    const dados = req.body

    req.assert('nome', 'voce deve preencher o campo nome').notEmpty()
    req.assert('email', 'voce deve preencher o campo email').notEmpty()
    req.assert('senha', 'voce deve preencher o campo senha').notEmpty()
    req.assert('senha', 'o campo senha deve ter no minimo 4 caracteres').len(4)

    const erros = req.validationErrors()

    if (erros) {
        res.render('usuario/cadastro_usuario', { erros: erros, usuario: dados })
        return
    }

    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuarioByEmail(dados.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'este e-mail já está em uso' }]
            res.render('usuario/cadastro_usuario', { erros: erros, usuario: dados })
        }
        else {
            modelUsuario.cadastrarUsuario(dados, function (error, result) {
                res.redirect('/usuario/login')
            })
        }
    })
}
module.exports.login = function (app, req, res) {
    const conexao = app.config.conexao
    res.render('usuario/login', { erros: {}, usuario: {} })
}
module.exports.validar = function (app, req, res) {

    const dados = req.body
    req.assert('email', 'vc deve prencher o campo email').notEmpty()
    req.assert('senha', 'vc deve prencher o campo senha').notEmpty()

    const erros = req.validationErrors()

    if (erros) {
        res.render('usuario/login', { erros: erros, usuario: dados })
        return
    }
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuario(dados, function (error, result) {

        

        if (result.length <= 0) {
            let erros = [{ msg: 'usuario não encontrado' }]
            res.render('usuario/login', { erros: erros, usuario: dados })
            return
        }
        else {
            req.session.id_tipo_usuario = result[0].id_tipo_usuario
            req.session.id_usuario = result[0].id
          
            if (req.session.id_tipo_usuario == 1) {
                res.redirect('/usuario/lista_produto')
                return
            }
            else {
                res.redirect('/admin/menu')
                return
            }

        }
    })
}
module.exports.tela_editar_cliente = function (app, req, res) {
    if (req.session.id_tipo_usuario != 1) {
        res.redirect('/usuario/login')
        return
    }
    const idUsuario = req.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.getUsuarioById(idUsuario, function (error, usuario) {        
       
        res.render('usuario/editar_cliente', {usuario: usuario, erros:{}})
    })
}
module.exports.salvar_user = function (app, req, res) {

    const dados = req.body
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)

    modelUsuario.Editar(dados, idUsuario, function (error, result) {
     
        res.redirect('/produto/lista_produto')
    })
}
module.exports.tela_editar_senha = function (app, req, res) {
    if (req.session.id_tipo_usuario != 1) {
        res.redirect('/usuario/login')
        return
    }
    const idUsuario = req.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    

    modelUsuario.getUsuarioById(idUsuario, function (error, usuario) {      
        res.render('usuario/editar_senha', {usuario: usuario, erros:{}})
    })
} 
module.exports.salvar_senha = function (app, req, res) {

    const dados = req.body
    const idUsuario = req.params.idUsuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    

    modelUsuario.EditarSenha(dados, idUsuario, function (error, result) {
        res.redirect('/produto/lista_produto')
    })
}
module.exports.logout = function (app, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/usuario/login')
    })
}
module.exports.renderFinalizarPedido = async function(app, req, res){
    
    const dados = req.body
    const idUsuario = req.session.id_usuario
    const conexao = app.config.conexao
    const modelUsuario = new app.app.models.modelUsuario(conexao)
    let pedidoaAberto = await modelUsuario.selectPedidoAberto(idUsuario)
    let valorTotal = 0
    const idPedido = pedidoaAberto[0].id_pedido

    
}