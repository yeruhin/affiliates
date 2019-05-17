const DBService = require('./DBService')
const TABLES = ['affiliate', 'marketing', 'influencer']
const axios = require('axios')

function fetchTweets() {
    _createNewTablesIfNotExist()
    let apiRes = TABLES.map(word => _fetchAllWord(word))
    return Promise.all(apiRes).then(vals => {
        let sqlRes = vals.map((words, idx) => {
            return words.data.map(word => _add(word, TABLES[idx]))
        })
        return Promise.all(sqlRes)
    })
}

function getTweets() {
    let sqlRes = _getAllWordsFromTable()
    return Promise.all(sqlRes)
        .then(vals => {
            _clearTables()
            return vals
        })
}

module.exports = {
    fetchTweets,
    getTweets
}

async function _fetchAllWord(word) {

    let res = await axios.get(`https://api.datamuse.com/words?ml=${word}`)
    return res
}

function _add(word, table) {
    let query = `INSERT INTO ${table} (word, score, tags) 
                VALUES ("${word.word}",
                        "${word.score}",
                        "${word.tags}")`;

    return DBService.runSQL(query)
}

function _clearTables() {
    TABLES.forEach(table => {
        let query = `TRUNCATE TABLE ${table}`
        DBService.runSQL(query)
    })
}

function _createNewTablesIfNotExist() {
    return TABLES.forEach(table => {
        let query = `CREATE TABLE IF NOT EXISTS ${table}(id INTEGER primary key AUTO_INCREMENT, word VARCHAR(255) NOT NULL, score INTEGER NOT NULL, tags VARCHAR(255) NOT NULL)`
        DBService.runSQL(query)
    })
}

function _getAllWordsFromTable() {
    return TABLES.map(table => {
        let query = `SELECT * FROM ${table}`
        return DBService.runSQL(query)
    })
}