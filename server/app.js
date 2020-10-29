const express = require('express')
const app = express()
const cors = require('cors')

require('./db/index.js')

const Article = require('./db/model/article')

// set cors that response request from client
app.use(cors({
    origin: '*',
    methods: '*'
}))


app.use(express.static(__dirname + '/public'));

app.get('/search', async (req, res) => {
    const query = req.query;
    let resp = [];
    let keyList = Object.keys(req.query)
    if (keyList.length === 0) { // no query condition
        resp = await Article.find()
        return res.json(resp)
    }
    let arr = []
    keyList.forEach(item => {
        const reg = new RegExp(req.query[item])
        arr.push({ [item]: {$regex: reg, $options: 'm'}})
    })
    const resAr = await Article.find({
        $and: arr
    })
    res.json(resAr)
})

app.get('/', (req, res) => {
    res.end('hello world')
})

app.listen(process.env.PORT || 5000)
