var express = require('express')
    , app   = express()
;

var path    = require('path')

app.set('port', process.env.PORT || 3000)

var staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.post('/signup', function (req, res) {
    if (app.get('env') === 'development')
        console.log('~~~~~> Form sub')

    res.redirect('/')
})

app.listen(app.get('port'), function () {
    console.log('~~~~~> Listening on %s', app.get('port'))
})
