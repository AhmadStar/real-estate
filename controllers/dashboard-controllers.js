const bcrypt = require('bcryptjs')
const passport = require('passport')
const con = require('../app')
const { validationResult } = require('express-validator');


const register = async (req, res) => {
  const { name, email, password, password2 } = req.body;
    let errors = [];
    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all the fields'});
    }
    if(password !== password2){
        errors.push({msg:'Passwords do not match'});
    }
    if(password.length < 6){
        errors.push({msg:'Passwords must be at least 6 characters long'});
    }
    if(errors.length > 0){
        res.render('dashboard/register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else{
        const myquery = "SELECT * FROM user WHERE email = " + "'"+email+"'"
        con.query(myquery, (err, user) => {  
            if (err) throw err;  
            if(user.length > 0){
                errors.push({msg:'Email already registered'});
                res.render('dashboard/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }
            else{
                // Hash password
                bcrypt.genSalt(10, (err, salt) => 
                   bcrypt.hash(password, salt, (err,hash) => {
                       if(err) throw err;
                       encryptedpassword = hash;
                       const myquery = "INSERT INTO user (name, email, password) VALUES ('"+name+"', '"+email+"', '"+hash+"')";
                        con.query(myquery, function (err, result) {  
                            if (err) throw err; 
                            req.flash('success_msg', 'You are registered.') 
                            res.redirect('/dashboard/login')
                        });
                   }) 
                )
            }  
        });
    }
};

const login = async (req, res, next) => {
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/dashboard/login',
        failureFlash:true 
    })(req, res, next)
  };

const login_get = (req, res) => {
    res.render('dashboard/login', { layout: 'layout' ,title:'Login'})
};

const register_get = (req, res) => {
    res.render('dashboard/register', { layout: 'layout' ,title:'Register'})
};

const logout = (req, res) => {
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/')
};

const property_list = async (req, res) => {
    const myquery = "SELECT * FROM property"
    con.query(myquery, (err, result) => {  
        if (err) throw err;  
        if(result.length > 0){
            res.render('dashboard/property_list' ,{result:result, name:'req.user.name', layout: 'dashboard/dashboard_layout' })
        }
    });
};

const dashboard = async (req, res) => {
    res.render('dashboard/dashboard', { name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const add_property = async (req, res) => {
    res.render('dashboard/add_property', { name:'req.user.name', layout: 'dashboard/dashboard_layout' })
};

const save_property = async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req); 
    console.log(errors);
    // const { name, email, password, password2 } = req.body;
    // let errors = [];
    // if(!name || !email || !password || !password2){
    //     errors.push({msg:'Please fill in all the fields'});
    // }
    // if(password !== password2){
    //     errors.push({msg:'Passwords do not match'});
    // }
    // if(password.length < 6){
    //     errors.push({msg:'Passwords must be at least 6 characters long'});
    // }
    // if(errors.length > 0){
    //     res.render('dashboard/register', {
    //         errors,
    //         name,
    //         email,
    //         password,
    //         password2
    //     })
    // }
    // else{
    //     const myquery = "SELECT * FROM user WHERE email = " + "'"+email+"'"
    //     con.query(myquery, (err, user) => {  
    //         if (err) throw err;  
    //         if(user.length > 0){
    //             errors.push({msg:'Email already registered'});
    //             res.render('dashboard/register', {
    //                 errors,
    //                 name,
    //                 email,
    //                 password,
    //                 password2
    //             })
    //         }
    //         else{
    //             // Hash password
    //             bcrypt.genSalt(10, (err, salt) => 
    //                bcrypt.hash(password, salt, (err,hash) => {
    //                    if(err) throw err;
    //                    encryptedpassword = hash;
    //                    const myquery = "INSERT INTO user (name, email, password) VALUES ('"+name+"', '"+email+"', '"+hash+"')";
    //                     con.query(myquery, function (err, result) {  
    //                         if (err) throw err; 
    //                         req.flash('success_msg', 'You are registered.') 
    //                         res.redirect('/dashboard/login')
    //                     });
    //                }) 
    //             )
    //         }  
    //     });
    // }
};

exports.register = register;
exports.login_get = login_get;
exports.register_get = register_get;
exports.logout = logout;
exports.property_list = property_list;
exports.dashboard = dashboard;
exports.add_property = add_property;
exports.save_property = save_property;
exports.login = login;
