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
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000)
app.set('host', process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1')
app.set('env', process.env.ENV || process.env.OPENSHIFT_APP_ENV || 'production')

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
        var stmt = db.prepare('INSERT INTO emails (email, created) VALUES (?, ?)')
        stmt.run(req.body.email, Date.now())
        stmt.finalize()
    })

    res.redirect('/')
})

app.get('/list', function (req, res) {
    db.all('SELECT id, email FROM emails', function (err, rows) {
        res.json(rows)
    })
})

app.start = function () {
    app.listen(app.get('port'), app.get('host'), function () {
        console.log('~~~~~> Listening - %s:%s in %s', app.get('host'), app.get('port'), app.get('env'))
    })
}

module.exports = app
