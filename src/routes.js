const db = require('./settings/database');
module.exports = function (server, passport, path, multer) {

    //Multer init ==========================================
    var storage = multer.diskStorage({
        destination: path.join(__dirname, 'public/images/uploaded_images/'),
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
    const upload = multer({
        storage: storage,
        limits: {
            fileSize:524288000
        },
        fileFilter: function (req, file, cb){
            validateFileType(file, cb);
        }
    }).single('img');

    function validateFileType(file, cb){
        
    }

    //Routes ===============================================

    server.get('/', (req, res) => {
        db.query('select * from imagenes_subidas where estado = 1', (err, rows) => {
            res.locals = {
                user: req.user,
                imgList: rows
            }
            res.render('main', {
                layout: 'index'
            })
        });
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
        let user = req.user;
        //console.log(user);
        res.locals = {
            user: user.nombre + ' ' + user.apellido
        }
        res.render('profile', {
            layout: 'index'
        });
    });

    server.post('/upload',isLogged, (req, res) => {
        let desc = req.body.desc;
        let user = req.user;
        upload(req, res, (err) => {
            if (err) {
                res.end('Error')
            } else {
                let foto = req.file.filename;
                db.query('insert into imagenes_subidas (usuarios_id, descripcion, foto) values (?, ?, ?)', [user.id, desc, foto], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    } else {
                        res.end('Ok');
                    }
                });
            }
        })

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