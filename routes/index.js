
var express = require('express')
var app = express()

// app.get('/', function(req, res, next) {
//     req.getConnection(function(error, conn) {
//         conn.query('SELECT * FROM billing_legal_entity ORDER BY id ',function(err, rows, fields) {
//             //if(err) throw err
//             if (err) {
//                 req.flash('error', err)
//                 res.render('billing/list', {
//                     title: 'All entities',
//                     data: ''
//                 })
//             } else {
//                 // render to views/billing/list.ejs template file
//                 res.render('billing/list', {
//                     title: 'All entities', 
//                     data: rows
//                 })
//             }
//         })
//     })
// })












module.exports = {


    getLoginPage: (req, res) => {

        res.render('login.ejs', {
            title: "Welcome to CRM Application"
            , message: ''

        });
    },


    getBackPage: (req, res) => {
        res.render('login.ejs', {
            title: "Budget Application"
            , message: ''
        });
    },

getHomePage: (req, res) => {

        res.render('index.ejs', {
            title: "LTTS Budgeting & Forecasting Tool",
             message: ''
        })
    },


    
    validateLogin: (req, res) => {
        //console.log(req);
        console.log("validateLogin");
        let psno = req.body.psno;
        console.log(psno);

        let pwd = req.body.pwd;
        console.log(pwd);

        var ldap = require('ldapjs');
        let usernameQuery = "call procUserAuthentication( '" + psno + "');";
        console.log(usernameQuery);
        db.query(usernameQuery, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }

            else {

                let email = result[0][0].EMAIL;
                console.log(email);

                var client = ldap.createClient(function (err) {
                    if (err) {
                        console.log("err");
                    }
                    else {
                        url: 'ldap://BRDIESMSDC01.lnties.com/DC=lnties,DC=com'
                    }
                });
                console.log(client);
                client.bind(email, pwd, function (err) {
                    console.log("clientmodule");
                    console.log(email);
                    if (err) {
                        console.log(err);
                        message = 'Incorrect Credentials';
                        return res.status(500).send(err);
                    }
                    else {
                        res.redirect('/home');
                    }
                });
            }
        });        
    },
}







