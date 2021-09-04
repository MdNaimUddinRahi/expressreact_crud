const express  = require('express') // at first we need require express dependencies
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const { restart } = require('nodemon')

const db = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : "CRUDDataBase",
})

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json()) // this line convert data into json from the form content

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post("/api/insert", (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(`object`, result)
    })
})

app.listen(3001, () => {
    console.log('running on port :: 3001')
}) // our express server run 3001 port

