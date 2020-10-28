const express = require('express')
const app = express()
const cors = require('cors')

require('./db/index.js')

const Article = require('./db/model/article')

// 设置后端服务允许跨域请求
app.use(cors({
    origin: '*',
    methods: '*'
}))

app.get('/search', async (req, res) => {
    const query = req.query;
    let resp = [];
    let keyList = Object.keys(req.query)
    if (keyList.length === 0) { // 没有查询条件时返回所有数据
        resp = await Article.find()
        return res.json(resp)
    }
    let arr = []
    keyList.forEach(item => {
        const reg = new RegExp(req.query[item])
        arr.push({ [item]: {$regex: reg, $options: 'm'}})
    })
    // let newKeys = keyList.map(item => {
    //     if (['year', 'month', 'number', 'pages'].includes(item)) {
    //         return `this.${item} === ${query[item]}`
    //     }
    //     return `this.${item}.indexOf("${query[item]}") !== -1`
    // })
    // const condition = newKeys.join(' && ')
    // const resAr = await Article.$where(condition)
    console.log(arr)
    const resAr = await Article.find({
        $and: arr
    })
    res.json(resAr)
})

app.listen(3001)
