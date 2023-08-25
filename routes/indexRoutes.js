const router = require('express').Router();
const connection = require('../config/mysql');

// index
router.get('/', (req, res, next) => {
    // query
    connection.query('SELECT * FROM user', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'index',
                layout: 'layouts/index-layout',
                msg: req.flash('info'),
                danger: req.flash('danger'),
                data: rows
            })
        }
    })
});

// post insert data
router.post('/store', (req, res) => {
    let post = {
        nama: req.body.nama,
        profesi: req.body.profesi
    }

    connection.query('INSERT INTO user SET?', req.body, (err, result) => {
        console.log(err);
        console.log(result);
        req.flash('info', 'data berhasil diinput!')
        res.redirect('back')
    })
});

// edit data
router.get('/edit-data/:id', (req, res) => {
    const id_user = req.params.id;

    connection.query('SELECT * FROM user WHERE id_user = ' + id_user, (err, user) => {
        if (err) {
            console.log(err);
        }

        res.render('edit', {
            title: 'edit',
            layout: 'layouts/index-layout',
            user
        })

    })
});

router.put('/edit-user', (req, res) => {
    const id_user = req.body.id;
    let editUser = {
        nama: req.body.nama,
        profesi: req.body.profesi
    }

    connection.query('UPDATE user SET ? WHERE id_user = ' + id_user, editUser, (err, result) => {
        if (err) {
            console.log(err);
        }
        
        console.log(result);
        req.flash('info', 'user berhasil diedit!');
        res.redirect('/')
    })
});

// delete data
router.delete('/delete-user', (req, res) => {
    const id_user = req.body.id;
    connection.query('DELETE FROM user WHERE id_user = ' + id_user, (err, result) => {
        if (err) {
            console.log(err);
        }

        console.log(result);
        req.flash('danger', 'data user berhasil dihapus!');
        res.redirect('back');
    })
})

module.exports = router;