var express = require('express')
    , app   = express()
;

var path    = require('path')
    , bodyParser    = require('body-parser')
    ;

app.set('port', process.env.PORT || 3000)

var staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.use(bodyParser.urlencoded({extended: true}))

app.post('/signup', function (req, res) {
    if (app.get('env') === 'development') {
        console.log('~~~~~> Form sub')
        console.log(req.body)
    }

    res.redirect('/')
})

app.listen(app.get('port'), function () {
    console.log('~~~~~> Listening on %s', app.get('port'))
})
