const AffiliateService = require('../services/affiliateService')

function affiliateRoutes(app) {

    app.get('/fetch-tweets', (req, res) => {
        AffiliateService.fetchTweets()
            .then(() => res.json('Done'))
            .catch(err => res.json(err))
    })

    app.get('/tweet-report', (req, res) => {
        AffiliateService.getTweets()
            .then(tweets => res.json(tweets))
    })

}

module.exports = affiliateRoutes