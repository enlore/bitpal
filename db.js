var sqlite3 = require('sqlite3').verbose()

var dbPath = ''

var env = process.env.ENV || process.env.OPENSHIFT_APP_ENV || 'production'

if (env === 'production') {
    dbPath = process.env.OPENSHIFT_DATA_DIR + 'emails.sql'
} else if (env === 'development') {
    dbPath = ':memory:'
}

var db = new sqlite3.Database(dbPath)

module.exports = db
