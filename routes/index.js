const express = require('express')
const router = express.Router();
const con = require('../app')
// const {ensureAuthenticated} = require('../config/auth');

// router.get('/', (req, res) => res.render('welcome'))

router.get('/', (req, res) => {
    const myquery = "SELECT * FROM flat"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('home' ,{result:result, title:'Home'})
        }
    });
})

router.get('/about', (req, res) => {
    res.render('about' ,{ title:'About Us'})
})

router.get('/contact', (req, res) => {
    res.render('contact' ,{ title:'Contact'})
})

router.post('/search', function(req, res, next) {

    console.log(req.body);
    // console.log('test ahamd form ');


});

router.get('/flat/:id', (req, res) => {
    // console.log(req.params.id);
    const myquery = "SELECT * from flat WHERE flat.id = " + "'"+req.params.id+"' LIMIT 1"
    con.query(myquery, (err, flat) => {  
        if (err) throw err;  
        if(flat.length > 0){
            query2 = "SELECT * from images WHERE flat_id = " + "'"+req.params.id+"'"
            con.query(query2, (err, gallery) => {  
                if (err) throw err;
                console.log(gallery.length);
                res.render('flat' ,{flat:flat, gallery:gallery, title:'Flat Details'})
            });
        }else{
            
        }
    });
})

router.get('/dashboard', (req, res) => res.render('dashboard' ,{name:req.user.name, layout: 'dashboard_layout' }))

router.get('/flat_list', (req, res) => {
    const myquery = "SELECT * FROM flat"
        con.query(myquery, (err, result) => {  
            if (err) throw err;  
            if(result.length > 0){
                res.render('flat_list' ,{result:result, name:'name', layout: 'dashboard_layout' })
            }
        });
})


module.exports = router