const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

const {getHomePage,getLoginPage,validateLogin,getBackPage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage,} = require('./routes/player');

const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budget'
});

global.db = db;


app.get('/',(req, res) => {
    let sql = 'SELECT * FROM billing_legal_entity ORDER BY id';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });


  app.get('/account',(req, res) => {
    let sql = 'SELECT * FROM account ORDER BY id';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

  
  
  app.get('/salesregion',(req, res) => {
    let sql = 'SELECT * FROM sales_region ORDER BY id';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

 app.get('/vertical',(req, res) => {
    let sql = 'SELECT * FROM vertical ORDER BY id';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

  app.get('/region',(req, res) => {
    let sql = 'SELECT * FROM region ORDER BY id';
    let query = db.query(sql, (err, results) => {
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

  // REST FUL API to  Insert data into budget table

app.post('/insertbudget',(req, res) => {
    // console.log("budgetapi");
    // console.log(req);
    let data = {billing_legal_entity_id: req.body.BillingLegalEntity, account_id: req.body.Account,
        is_new: req.body.New,revenue_classification: req.body.RevenueClassification,type: req.body.Type,
        is_ip_led_revenue: req.body.LeadRevenue,description: req.body.description,
        sales_region_id: req.body.Salesregion,created_by: req.body.createdby,
        is_active: req.body.isactive,created: req.body.created };
    let sql = "INSERT INTO budget SET ?";
    let query = db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

 // REST FUL API to  Insert data into account table

app.post('/insertcountry',(req, res) => {
    let data = {name: req.body.cname, region_id: req.body.region,
        created_by: req.body.created_by,
        is_active: req.body.is_active};
    let sql = "INSERT INTO country SET ?,created=now()";
      console.log(sql);
    let query = db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

 // REST FUL API to  Insert data into account table

app.post('/insertaccount',(req, res) => {
    let data = {name: req.body.name, code: req.body.code,
        vertical_id: req.body.vertical,created_by: req.body.created_by,
        is_active: req.body.is_active};
    let sql = "INSERT INTO account SET ?,created=now()";
    let query = db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

 // REST FUL API to  Insert data into account table

app.post('/insertbilling',(req, res) => {
    let data = {name: req.body.biname,created_by: req.body.created_by,
        is_active: req.body.is_active};
    let sql = "INSERT INTO billing_legal_entity SET ?,created=now()";
    let query = db.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

    // REST FUL API to  Listing data into budget table

  app.get('/budgetlisting',(req, res) => {
    let sql = "select bd.id,bd.billing_legal_entity_id,ble.name,bd.account_id,bd.is_new,bd.description,bd.revenue_classification,bd.type,bd.sales_region_id,bd.is_ip_led_revenue,ac.name as accountname,sr.name as salesregionname from budget bd left join billing_legal_entity ble on ble.id=bd.billing_legal_entity_id left join account ac on ac.id=bd.account_id left join sales_region sr on sr.id=bd.sales_region_id  ";
    let query = db.query(sql, (err, results) => {
      // console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

// REST FUL API to  Listing data into account table

  app.get('/accountlisting',(req, res) => {
    let sql = "select ac.id,ac.name,ac.code,ac.vertical_id,v.name as vname from account ac left join vertical v on v.id=ac.vertical_id order by ac.id ";
    let query = db.query(sql, (err, results) => {
      // console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

// REST FUL API to  Listing data into country table

  app.get('/countrylisting',(req, res) => {
    let sql = "select c.id,c.name,c.region_id,r.name as region from country c left join region r on r.id=c.region_id order by c.id ";
    let query = db.query(sql, (err, results) => {
      // console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

// REST FUL API to  Listing data into billing table

  app.get('/billinglisting',(req, res) => {
    let sql = "select * from billing_legal_entity";
    let query = db.query(sql, (err, results) => {
      // console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });


   // REST FUL API to  Listing data into EDIT budget table

   app.get('/budgeteditmodallisting/:i',(req, res) => {
    let sql = "select bd.id,bd.billing_legal_entity_id,ble.name,bd.account_id,bd.is_new,bd.description,bd.revenue_classification,bd.type,bd.sales_region_id,bd.is_ip_led_revenue,ac.name as accountname,sr.name as salesregionname from budget bd left join billing_legal_entity ble on ble.id=bd.billing_legal_entity_id left join account ac on ac.id=bd.account_id left join sales_region sr on sr.id=bd.sales_region_id where  bd.id='"+req.params.i+"'";
    let query = db.query(sql, (err, results) => {
      // console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

// REST FUL API to  Listing data into EDIT account table

   app.get('/accounteditmodallisting/:i',(req, res) => {
    let sql = "select ac.id,ac.name,ac.code,ac.vertical_id,v.name as vname from account ac left join vertical v on v.id=ac.vertical_id where ac.id='"+req.params.i+"'";
    let query = db.query(sql, (err, results) => {
       console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

// REST FUL API to  Listing data into EDIT billing table

   app.get('/countryeditmodallisting/:i',(req, res) => {
    let sql = "select c.id,c.name,c.region_id,r.name as region from country c left join region r on r.id=c.region_id where c.id='"+req.params.i+"'";
    let query = db.query(sql, (err, results) => {
       console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });

// REST FUL API to  Listing data into EDIT billing table

   app.get('/billingeditmodallisting/:i',(req, res) => {
    let sql = "select * from billing_legal_entity where id='"+req.params.i+"'";
    let query = db.query(sql, (err, results) => {
       console.log(sql);
      // console.log(results);
      if(err) throw err;
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    
    });
  });


    // REST FUL API to  EDIT?UPDATE data into budget table

    app.post('/budgetupdate/:budgetid',(req, res) => {
      // console.log(req);
      let sql = "UPDATE budget SET  billing_legal_entity_id='"+req.body.budgetlegalid+"', account_id='"+req.body.budgetaccount+"',type='"+req.body.budgettype+"',is_ip_led_revenue='"+req.body.leadrevenue+"',is_new='"+req.body.newaccount+"',description='"+req.body. description+"',sales_region_id='"+req.body.salesregion+"',modified_by='"+req.body.modified_by+"',is_active='"+ req.body.isactive+"',modified='"+ req.body.modified+"' WHERE id='"+req.params.budgetid+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });

app.post('/accountupdate/:accountid',(req, res) => {
      // console.log(req);
      let sql = "UPDATE account SET name='"+req.body.dname+"', code='"+req.body.code+"',vertical_id='"+req.body.vertical+"',is_active='"+ req.body.is_active+"',modified=now() WHERE id='"+req.params.accountid+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });

app.post('/billingupdate/:billingid',(req, res) => {
      // console.log(req);
      let sql = "UPDATE billing_legal_entity SET  name='"+req.body.bname+"',is_active='"+ req.body.is_active+"',modified=now() WHERE id='"+req.params.billingid+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });

// REST FUL API to  EDIT?UPDATE data into country table

app.post('/countryupdate/:countryid',(req, res) => {
      let sql = "UPDATE country SET name='"+req.body.countryname+"',region_id='"+req.body.regions+"',is_active='"+ req.body.is_active+"',modified=now() WHERE id='"+req.params.countryid+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });


app.delete('/budgetdelete/:budgetid',(req, res) => {
       console.log(req);
      let sql = "DELETE from budget WHERE id='"+req.params.budgetid+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });

// REST FUL API to  delete from account table

app.delete('/accountdelete/:i',(req, res) => {
       console.log(req);
      let sql = "DELETE from account WHERE id='"+req.params.i+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });

app.delete('/countrydelete/:i',(req, res) => {
       console.log(req);
      let sql = "DELETE from country WHERE id='"+req.params.i+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });

app.delete('/billingdelete/:i',(req, res) => {
       console.log(req);
      let sql = "DELETE from billing_legal_entity WHERE id='"+req.params.i+"'";
       console.log(sql);
      let query = db.query(sql, (err, results) => {
        if(err) throw err;
         console.log(err);
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    });
  
db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
        
    }
    console.log('Connected to database');
});

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/home', getHomePage);
app.get('/login', getLoginPage);
app.post('/validatelogin', validateLogin);
app.get('/logout', getBackPage);


// app.get('/logout', getBackPage);



// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
