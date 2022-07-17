const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var mysql = require('mysql');

var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "example", 
database : "tree-data", 
multipleStatements : true
});

con.connect(function(err) {
if (err) throw err;
console.log("Connected Success!");
});

app.get('/tree', (req, res) => {
    var sql = "SELECT * FROM tree " ;
con.query ( sql, function ( error, results, fields )
    {
        if ( error ) 
        {
            console.log ( error );
        }
        else 
        {
            var data = "";
            console.log(results)
            results.forEach ( function ( eachRow ) 
                { 
                    data += eachRow.id + " " + eachRow.name_eng;
                    data += "<br/>";
                } 
            );        
            res.json( results );
        }
    }
);
})

app.get('/tree/:id', (req, res) => {
    var sql1 = "SELECT * FROM tree where id="+req.body.id;
    // console.log(sql1);
    con.query (sql1, function ( error, results, fields )
    {
        if ( error ) 
        {
            console.log ( error );
        }
        else 
        {
            var data = "";
            console.log(results)
            results.forEach ( function ( eachRow ) 
                { 
                    data += eachRow.id + " " + eachRow.name_eng;
                    data += "<br/>";
                } 
            );        
            res.json( results );
        }
    }
);
})

app.post('/tree', (req, res) => {
    // console.log(req.body.name_thai)
    var sql2 = "INSERT INTO tree (tree, name_thai, name_eng, weight, price, breeder_gen_1, breeder_gen_2, breeder_gen_3) VALUES ("+req.body.tree+", '"+req.body.name_thai+"', '"+req.body.name_eng+"', "+req.body.weight+", "+req.body.price+", '"+req.body.breeder_gen_1+"', '"+req.body.breeder_gen_2+"', '"+req.body.breeder_gen_3+"');";
    // console.log(sql2)
    con.query (sql2, function ( error, results, fields )
    {
        if ( error ) 
        {
            console.log ( error );
        }
        else 
        {
            res.json( results );
        }
    }
);
})

app.put('/tree', (req, res) => {
    // console.log(req.body.name_thai)
    var sql3 = "UPDATE tree SET tree= "+req.body.tree+", name_thai= '"+req.body.name_thai+"', name_eng= '"+req.body.name_eng+"', weight= "+req.body.weight+", price= "+req.body.price+", breeder_gen_1= '"+req.body.breeder_gen_1+"', breeder_gen_2= '"+req.body.breeder_gen_2+"', breeder_gen_3= '"+req.body.breeder_gen_3+"' WHERE id="+req.body.id;
    // console.log(sql2)
    con.query (sql3, function ( error, results, fields )
    {
        if ( error ) 
        {
            console.log ( error );
        }
        else 
        {
            res.json( results );
        }
    }
);
})

app.delete('/tree', (req, res) => {
    var sql4 = "DELETE FROM tree WHERE id="+req.body.id;
    con.query (sql4, function ( error, results, fields )
    {
        if ( error ) 
        {
            console.log ( error );
        }
        else 
        {
            res.json( results );
        }
    }
);
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3100, () => {
  console.log('Start server at port 3100.')
})