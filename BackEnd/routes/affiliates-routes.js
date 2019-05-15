const AffiliateService = require('../services/affiliateService')

function affiliateRoutes(app) {

    app.get('/fetch-tweets', (req, res) => {
        AffiliateService.fetchTweets()
            .then(tweets => res.json(tweets))
    })

    app.get('/tweet-report', (req, res) => {
        AffiliateService.getTweets()
            .then(tweets => res.json(tweets))
    })

}

module.exports = affiliateRoutes