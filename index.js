var express     = require('express')
  , app         = express()
  ;

var path            = require('path')
  , bodyParser      = require('body-parser')
  ;

var db = require('./db')

app.set('port', process.env.PORT || 3000)
app.set('env', process.env.ENV || 'production')

module.exports = app

var staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.use(bodyParser.urlencoded({extended: true}))

app.post('/signup', function (req, res) {
    if (app.get('env') === 'development') {
        console.log('~~~~~> Form sub')
        console.log(req.body)
    }

    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO emails (email) VALUES (?)')
    })

    res.redirect('/')
})

app.listen(app.get('port'), function () {
    console.log('~~~~~> Listening on %s', app.get('port'))
})
