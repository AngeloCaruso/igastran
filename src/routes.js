module.exports = function (server, passport, path, multer) {

    server.get('/', (req, res) => {
        res.render('main', {layout: 'index'})
    });

    server.get('/ingresar', (req, res) => {
        res.render('ingresar', {layout: 'index', message: req.flash('loginMessage')})
    });

    server.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/ingresar',
        failureFlash : true
    }), (req, res) => {

    });

    server.post('/register', passport.authenticate('local-register', {
        successRedirect : '/profile',
        failureRedirect : '/ingresar',
        failureFlash : true
    }), (req, res) => {

    });

    server.get('/profile', isLogged, (req, res) => {
        user = req.user;
        console.log(user);
        res.render('profile', { layout: 'index', user: user.nombre+' '+user.apellidos});
    });

    server.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    function isLogged(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/');
        }
    }
}