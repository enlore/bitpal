var db = require('./db')

module.exports = function () {
    db.serialize(function () {
        db.run('DROP TABLE IF EXISTS emails')
        db.run('CREATE TABLE emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)')
    })
}
