const express = require('express')
const cors = require('cors')
const app = express()
const affiliateRoutes = require('./routes/affiliates-routes')



app.use(express.static('public'))
app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));

affiliateRoutes(app)

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))