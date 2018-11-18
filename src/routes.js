const db = require('./settings/database');
module.exports = function (server, passport, path, multer) {

    //Multer init ==========================================
    const upload = multer({
        dest: 'src/images/uploaded_images/',
        preservePath: true
    });

    //Routes ===============================================

    server.get('/', (req, res) => {
        let user = req.user;
        var imgList = db.query('select * from imagenes_subidas where estado = 1', (err, rows) => {
            console.log(rows)
        });
        //console.log(imgList)
        res.render('main', {
            layout: 'index',
            user: user,
            imgList: imgList
        })
    });

    server.get('/ingresar', (req, res) => {
        //console.log(req.user)
        res.render('ingresar', {
            layout: 'index',
            message: req.flash('loginMessage')
        })
    });

    server.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/ingresar',
        failureFlash: true
    }), (req, res) => {

    });

    server.post('/register', passport.authenticate('local-register', {
        successRedirect: '/profile',
        failureRedirect: '/ingresar',
        failureFlash: true
    }), (req, res) => {

    });

    server.get('/profile', isLogged, (req, res) => {
        user = req.user;
        //console.log(user);
        res.render('profile', {
            layout: 'index',
            user: user.nombre + ' ' + user.apellido
        });
    });

    server.post('/upload', upload.single('img'), (req, res) => {
        let {mimetype, filename} = req.file;
        res.end(filename + '.' + path.basename(mimetype));
    })

    server.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }
}