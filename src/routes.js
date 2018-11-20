const db = require('./settings/database');
module.exports = function (server, passport, path, multer) {

    //Multer init ==========================================
    var storage = multer.diskStorage({
        destination: path.join(__dirname, 'public/images/uploaded_images/'),
        filename: function (req, file, cb) {
            if (file.fieldname == 'img') {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
            if (file.fieldname == 'updateProf') {
                cb(null, req.user.username + '_Prof' + path.extname(file.originalname));
            }
            if (file.fieldname == 'updateBg') {
                cb(null, req.user.username + '_Bg' + path.extname(file.originalname));
            }
        }
    })
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 524288000
        }
    }).single('img');

    const uploadP = multer({
        storage: storage,
        limits: {
            fileSize: 524288000
        }
    }).single('updateProf');

    const uploadBg = multer({
        storage: storage,
        limits: {
            fileSize: 524288000
        }
    }).single('updateBg');

    function validateFileType(file, cb) {

    }

    function getFollowers(id, cb) {
        db.query(`select concat(u2.nombre, ' ', u2.apellidos) as nombre, u2.username as follower, u2.foto_perfil as fp_follower from follows f 
                    inner join usuarios u1 on f.usuario_id = u1.id
                    inner join usuarios u2 on f.follower_id = u2.id
                    where f.usuario_id = ?
                    and f.estado = 1`, [id], (err, rows) => {
            cb(rows)
        });
    }

    function getFollowing(id, cb) {
        db.query(`select concat(u1.nombre, ' ', u1.apellidos) as nombre, u1.username as follower, u1.foto_perfil as fp_follower from follows f 
                    inner join usuarios u1 on f.usuario_id = u1.id
                    inner join usuarios u2 on f.follower_id = u2.id
                    where f.follower_id = ?
                    and f.estado = 1`, [id],
            (err, rows) => {
                cb(rows)
            });
    }

    function getImages(id, cb) {
        db.query(`select * from usuarios u 
                    inner join imagenes_subidas i on u.id = i.usuarios_id 
                    where u.id = ?`, [id],
            (err, rows) => {
                cb(rows)
            })
    }

    //Routes ===============================================

    server.get('/', (req, res) => {
        let user = req.user;
        db.query('select * from imagenes_subidas where estado = 1', (err, rows) => {
            let list = rows
            if (user) {
                db.query('select * from usuarios where id = ?', [user.id], (err, rows) => {
                    console.log(rows[0])
                    res.locals = {
                        user: user,
                        uData: rows[0],
                        imgList: list
                    }
                    res.render('main', {
                        layout: 'index'
                    })
                })
            } else {
                res.locals = {
                    user: user,
                    imgList: rows
                }
                res.render('main', {
                    layout: 'index'
                })
            }
        });
    });

    server.get('/ingresar', (req, res) => {
        //console.log(req.user)
        res.render('ingresar', {
            layout: 'index',
            message: req.flash('loginMessage')
        })
    });

    server.post('/login', passport.authenticate('local-login'), (req, res) => {
        res.end('Ok');
    });

    server.post('/register', passport.authenticate('local-register'), (req, res) => {
        res.end('Ok');
    });
    server.post('/checkUser', (req, res) => {
        let user = req.body.username
        db.query('select * from usuarios where (username = ? or correo = ?) and estado = 1', [user, user], (err, rows) => {
            if (rows.length > 0 || err) {
                res.end('Error')
            } else {
                res.end('Ok')
            }
        });
    })
    server.get('/profile', isLogged, (req, res) => {
        let user = req.user;
        getFollowers(user.id, (followers) => {
            getFollowing(user.id, (following) => {
                getImages(user.id, (imgList) => {
                    db.query('select * from usuarios where id= ? and estado = 1', [user.id], (err, rows) => {
                        console.log(followers)
                        res.locals = {
                            user: user,
                            imgP: rows[0].foto_perfil,
                            bg: rows[0].foto_fondo,
                            followers: followers,
                            following: following,
                            imgList: imgList
                        }
                        res.render('profile', {
                            layout: 'index'
                        });
                    })
                })
            });
        });
    });

    server.get('/profile/:username', isLogged, (req, res) => {
        let actUser = req.params.username;
        db.query('select * from usuarios where username = ? and estado = 1', [actUser], (err, rows) => {
            getFollowers(rows[0].id, (followers) => {
                getFollowing(rows[0].id, (following) => {
                    getImages(rows[0].id, (images) => {
                        res.locals = {
                            user: rows[0],
                            imgP: rows[0].foto_perfil,
                            bg: rows[0].foto_fondo,
                            followers: followers,
                            following: following,
                            imgList: images
                        }
                        res.render('userProfile', {
                            layout: 'index'
                        });
                    })
                });
            });
        })
    });

    server.post('/upload', isLogged, (req, res) => {
        let desc = req.body.desc;
        let user = req.user;
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
                res.end(err)
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
    server.post('/updateProfile', isLogged, (req, res) => {
        let user = req.user;
        uploadP(req, res, (err) => {
            if (err) {
                console.log(err)
                res.end(err)
            } else {
                let foto = req.file.filename;
                db.query('update usuarios set foto_perfil = ? where id = ?', [foto, user.id], (err, rows) => {
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
    server.post('/updateBg', isLogged, (req, res) => {
        let user = req.user;
        uploadBg(req, res, (err) => {
            if (err) {
                console.log(err)
                res.end(err)
            } else {
                let foto = req.file.filename;
                db.query('update usuarios set foto_fondo = ? where id = ?', [foto, user.id], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.end(err);
                    } else {
                        res.end('Ok');
                    }
                });
            }
        })
    });

    server.post('/follow', (req, res) => {
        let user = req.user;
        let f_user = req.body.id;
        if (user.id == f_user) {
            res.end('soledad')
        } else {
            db.query('select * from follows where usuario_id = ? and follower_id = ? and estado = 1', [f_user, user.id], (err, rows) => {
                if (rows.length > 0) {
                    db.query('update follows set estado = 0 where usuario_id = ? and follower_id = ?', [f_user, user.id], (err, rows) => {
                        res.end('Not-Following');
                    })
                } else {
                    db.query('select * from follows where usuario_id = ? and follower_id = ? and estado = 0', [f_user, user.id], (err, rows) => {
                        if (rows.length > 0) {
                            db.query('update follows set estado = 1 where usuario_id = ? and follower_id = ?', [f_user, user.id], (err, rows) => {
                                res.end('Following')
                            })
                        } else {
                            db.query('insert into follows(usuario_id, follower_id) values (?,?)', [f_user, user.id], (err, rows) => {
                                res.end('New-Following');
                            });
                        }
                    });
                }
            });
        }
    });

    server.post('/logout', (req, res) => {
        req.logout();
        res.end('ok');
    })

    function isLogged(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }
}