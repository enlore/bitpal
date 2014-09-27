var express     = require('express')
  , app         = express()
  ;

var path            = require('path')
  , bodyParser      = require('body-parser')
  ;

var db      = require('./db')
  , init    = require('./init')
  ;

// app config
app.set('port', process.env.PORT || process.env.OPENSHIFT_PORT || 3000)
app.set('host', process.env.IP || process.env.OPENSHIFT_IP || '127.0.0.1')
app.set('env', process.env.ENV || 'production')

// app init
if (app.get('env') === 'development') {
    init()
}

var staticPath = path.join(__dirname, 'public')
app.use(express.static(staticPath))

app.use(bodyParser.urlencoded({extended: true}))

app.post('/signup', function (req, res) {
    if (app.get('env') === 'development') {
        console.log('~~~~~> Form sub')
        console.log(req.body)
    }

    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO emails (email) VALUES (?)')
        stmt.run(req.body.email)
        stmt.finalize()
    })

    res.redirect('/')
})

app.get('/list', function (req, res) {
    db.all('SELECT id, email FROM emails', function (err, rows) {
        res.json(rows)
    })
})

app.listen(app.get('port'), function () {
    console.log('~~~~~> Listening on %s', app.get('port'))
})

module.exports = app
