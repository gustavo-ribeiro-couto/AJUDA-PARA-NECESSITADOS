/* npm i init

"start": "nodemon ./index.js localhost 3000"

npm i nodemon

npm i express

npm i express-handlebars

npm i mysql */



const express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended:true,
    })
)

app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('home')
})

app.post('/estrelas/insertestrelas', (req, res) =>{
    const name = req.body.name
    const serie = req.body.serie

    const sql = `INSERT INTO estrelas (nome_da_lenda, posicao) VALUES ('${name}', '${serie}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        res.redirect('/')
    })
})

app.get('/estrelas', (req,res) =>{
    const sql = ' SELECT * FROM estrelas'

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const estrelas = data
        console.log(estrelas)
        res.render('estrelas',{estrelas})

    })
})

app.get('/estrelas/:id', (req,res) =>{

    const id = req = req.params.id
    
    const sql = (`SELECT * FROM  estrelas where id =${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const estrela = data[0]

        res.render('estrela', {estrela})
    })
})

app.get('/estrelas/edit/:id', (req,res) =>{
    const id = req.params.id
    const sql = (`SELECT * FROM estrelas WHERE id = ${id}`)

    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        const estrela = data[0]

        res.render('editestrela', {estrela})
    })
})

app.post('/estrelas/updateestrela', (req, res) =>{

    const id = req.body.id
    const nome = req.body.name
    const serie = req.body.serie
    
    const sql = (`UPDATE estrelas SET nome = '${nome}', serie = '${serie}' WHERE  id = ${id}`)


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/estrelas')
    })
})


app.post('/estudamtes/remove/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM estrelas WHERE id = ${id}`


    conn.query(sql, function(err,data){
        if(err){
            console.log(err)
            return
        }
        
        res.redirect('/estrelas')
    })

})



const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'blog_esporte'

})

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('conectou com DB')

    app.listen(3000)
})