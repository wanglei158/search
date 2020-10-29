const express = require('express')
const app = express()
const cors = require('cors')

require('./db/index.js')

const Article = require('./db/model/article')

// set cross-domain 
app.use(cors({
    origin: '*',
    methods: '*'
}))

app.get('/search', async (req, res) => {
    const query = req.query;
    let resp = [];
    let keyList = Object.keys(query)
    if (keyList.length === 0) { // no query condition
        resp = await Article.find()
        return res.json(resp)
    }
    let arr = []
    keyList.forEach(item => {
        const reg = new RegExp(query[item])
        arr.push({ [item]: { $regex: reg, $options: 'm' } })
    })
    const resAr = await Article.find({
        $and: arr
    })
    res.json(resAr)
})

app.get('/add', async (req, res) => {
    const { author, title, journal, year, volume, number, pages, month } = req.query;
    const article = new Article({
        author, title, journal, year, volume, number, pages, month
    })
    await article.save();
    res.json({
        code: 1
    })
})

app.get('/', (req, res) => {
    res.end('hello world')
})

app.listen(process.env.PORT || 5000);
