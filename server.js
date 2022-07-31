const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var mysql = require('mysql');
const e = require('express')

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

app.get('/tree/breed/:id', (req, res) => {
    var sql6 = "SELECT tree.id, breed.name_breed FROM tree INNER JOIN breed ON tree.id_breed = breed.id where tree.id="+req.params.id+"";
    // console.log(sql6);
    con.query (sql6, function ( error, results, fields )
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
    var sql2 = "INSERT INTO tree (tree, name_thai, name_eng, weight, price) VALUES ("+req.body.tree+", '"+req.body.name_thai+"', '"+req.body.name_eng+"', "+req.body.weight+", "+req.body.price+");";
    // console.log(req.body)
    con.query (sql2, function ( error, results, fields )
    {
        if ( error ) 
        {
            console.log ( "error test " );
            console.log ( error );
        }
        else 
        {
            // let data_gen = ['name_father', 'name_mather', 'grn', 'id_tree'];
                console.log( req.body.gen.length );
                var data_gen = req.body.gen
                    for (let i = 0; i < data_gen.length; i++) {
                        var gen_1 = "INSERT INTO generation (name_father, name_mather, gen, id_tree) VALUES ('"+req.body.gen[i].name_father+"', '"+req.body.gen[i].name_mather+"', "+req.body.gen[i].gen+", "+results.insertId+");";
                        // console.log ( "id_tree", results.insertId, "gen", req.body.gen[i].gen );
                        // console.log( gen_1 );
                        con.query (gen_1, function ( error, results, fields ) 
                            {
                                    if ( error ) 
                                {
                                    console.log ( error );
                                }
                                else 
                                {
                                    // res.json( results );
                                }
                            });
                    } 
        }
            res.json( results );
    }
);
})

// let data_gen = ['name_father', 'name_mather', 'grn', 'id_tree'];
//                 // console.log( data_gen );
//                 for (let i = 0; i < data_gen.length; i++) {
//                     console.log ( data_gen[i] );
//                 }

// app.post('/tree', (req, res) => {
//     var sql5 = "INSERT INTO generation (name_father, name_mather, gen, id_tree) VALUES ('"+req.body.name_father+"', '"+req.body.name_mather+"', "+req.body.gen+", "+req.body.id_tree+")";
//     // console.log ( data_tree ); 
//     con.query (sql5, function ( error, results, fields )
//     {
//         if ( error ) 
//         {
//             console.log ( error );
//         }
//         else 
//         { 
//             res.json( results );
//         }
//     }
// );
// })

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

app.get('/ID_card', (req, res) => {
    var ID_card_number = req.body.ID_card_number;
    // console.log(ID_card_number);
    const ID_card_number_Array = ID_card_number.split("");
    // console.log(ID_card_number_Array[])
    var a1 = ID_card_number_Array[0]*13
    var a2 = ID_card_number_Array[1]*12
    var a3 = ID_card_number_Array[2]*11
    var a4 = ID_card_number_Array[3]*10
    var a5 = ID_card_number_Array[4]*9
    var a6 = ID_card_number_Array[5]*8
    var a7 = ID_card_number_Array[6]*7
    var a8 = ID_card_number_Array[7]*6
    var a9 = ID_card_number_Array[8]*5
    var a10 = ID_card_number_Array[9]*4
    var a11 = ID_card_number_Array[10]*3
    var a12 = ID_card_number_Array[11]*2
    var sum = a1+a2+a3+a4+a5+a6+a7+a8+a9+a10+a11+a12
    var a13 = ((11 - (sum % 11)) % 10)
    // console.log(a13)
    if ( a13 == ID_card_number_Array[12] ) {
        ID_card_number_true = "หมายเลขบัตรถูกต้อง";
        // console.log(ID_card_number_true)
        res.json( ID_card_number_true );
    } else {
        ID_card_number_error = "ไม่ถูกต้อง";
        // console.log(ID_card_number_error)
        res.json( ID_card_number_error );
    }
})

app.get('/ID_card', (req, res) => {
    var ID_card_number = req.body.ID_card_number;
    // console.log(ID_card_number)
    const ID_card_number_Array = ID_card_number.split("");
    // console.log(ID_card_number_Array[1])
    // console.log(ID_card_number_Array.length)
    var number 
    var a13 = 14
    var sum =0
    var b=0
    if (ID_card_number_Array.length == 13) {
        if (!isNaN(ID_card_number)) {
    for ( let i = 0; i < 12; i++ ) {
        number = ID_card_number_Array[i];
        var a = --a13
        var c = Number(ID_card_number_Array[i]*a)
        sum = b + c
        b = sum
    } 
    var a13 = ((11 - (sum % 11)) % 10)
    // console.log(a13)
    if ( a13 == ID_card_number_Array[12] ) {
                ID_card_number_true = "หมายเลขบัตรถูกต้อง";
                // console.log(ID_card_number_true)
                res.json( ID_card_number_true );
            } else {
                ID_card_number_error = "หมายเลขบัตรไม่ถูกต้อง";
                // console.log(ID_card_number_error)
                res.json( ID_card_number_error );
            }} else {
                res.json( "กรุณากรอกเป็นตัวเลขเท่านั้น" );
            }
    } else {
        res.json( "กรอกรหัสไม่ครบหรือเกิน" );
    } 
})

app.get('/grade', (req, res) => {
    var name = req.body.name;
    var last_name = req.body.last_name;
    var grade = req.body.grade;
    // var grade_number = Number(grade);

    // const str1 = grade_number;
    const str2 = grade;
    // ประกาศตัวแปรเพื่อรับค่าเกรดที่เป็น any

    // const result1 = /^[0]/.test(str1);
    const result2 = /^[0]/.test(str2);
    // ประกาศตัวแปรเพื่อเข้าเงื่อนไขไม่เอาเลข 0ตัวหน้า

    // console.log(result1); // true
    console.log(result2); // true
    // log ออกมาเพื่อดูค่า

    // console.log(grade_number); // true
    // console.log(grade); // true

    if (result2 == false && grade != '') {
        // เงื่อนไขผลที่ได้ต้อง false เเละไม่ = ค่าว่าง
        var grade_number = Number(grade);
        // ประกาศตัวแปรเพื่อรับค่า grade ที่เป็น number
        if (grade_number <= 100) {
            // เงื่อนไข grade_number <= 100
            if (grade_number >= 0) {
            // เงื่อนไข grade_number >= 0
        switch (true) {
        // เอาค่า true มาเข้า switch

        // console.log(typeof, grade_number);
        // If score is 90 or greater
        case  grade_number >= 90 :
            // console.log("A");
            ResponseApi(res, {grade: 'A', name: name+' '+last_name })
            // ดูค่าที่ได้ A กับข้อมูล
            break;
        // If score is 80 or greater
        case grade_number >= 80:
            // console.log("B");
            ResponseApi(res, {grade: 'B', name: name+' '+last_name })
            // ดูค่าที่ได้ B กับข้อมูล
            break;
        // If score is 70 or greater
        case grade_number >= 70:
            // console.log("C");
            ResponseApi(res, {grade: 'C', name: name+' '+last_name })
            // ดูค่าที่ได้ C กับข้อมูล
            break;
        // If score is 60 or greater
        case grade_number >= 60:
            // console.log("D");
            ResponseApi(res, {grade: 'D', name: name+' '+last_name })
            // // ดูค่าที่ได้ D กับข้อมูล
            break;
        // Anything 59 or below is failing
        default:
            // console.log("F");
            ResponseApi(res, {grade: 'F', name: name+' '+last_name })
            // ดูค่าที่ได้ F กับข้อมูล
    }}else {
        ResponseApi(res, "ใส่ค่าน้อยเกินไป")
        // ดูค่าที่น้อยเกินไป
    }}else {
        ResponseApi(res, "ใส่ค่ามากเกินไป")
        // ดูค่าที่มากเกินไป
    }}else {
        // console.log("ผิดพลาด")
        ResponseApi(res, "ใส่ตัวเลข")
        // ดูค่าที่ไม่ใช่ตัวเลข
    }
})

function ResponseApi (res, data) {
    res.json( {massage: data} );
}

app.listen(3100, () => {
  console.log('Start server at port 3100.')
})
