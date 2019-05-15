const mongoService = require('./mongo-service')
const AFFILIATE_COLLECTION = 'affiliate'
const MARKETING_COLLECTION = 'marketing'
const INFLUENCER_COLLECTION = 'influencer'
const axios = require('axios')

function fetchTweets() {
    let affiliate = _fetchByWordAndUpdateDB(AFFILIATE_COLLECTION)
    let marketing = _fetchByWordAndUpdateDB(INFLUENCER_COLLECTION)
    let influencer = _fetchByWordAndUpdateDB(MARKETING_COLLECTION)
    return Promise.all([affiliate, marketing, influencer]).then(() => 'WORDS_FETCHED')
}

async function getTweets() {
    let db = await mongoService.connect()
    let affiliate = db.collection(AFFILIATE_COLLECTION).find({}).toArray()
    let marketing = db.collection(INFLUENCER_COLLECTION).find({}).toArray()
    let influencer = db.collection(MARKETING_COLLECTION).find({}).toArray()
    return await Promise.all([affiliate, marketing, influencer])
    
}

module.exports = {
    fetchTweets,
    getTweets
}

async function _fetchByWordAndUpdateDB(word) {
    let res = await axios.get(`https://api.datamuse.com/words?ml=${word}`)
    let db = await mongoService.connect()
    db.collection(word).deleteMany({})
    db.collection(word).insertMany(res.data)
    return res
}
