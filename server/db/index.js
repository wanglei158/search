const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:qwer1234@cluster0.qirhx.mongodb.net/Study?retryWrites=true&w=majority";

mongoose.connect(uri, {
    authSource: 'admin',
    // auth: {
    //     user: 'admin',
    //     password: '123456'
    // },
    useNewUrlParser: true,
    useUnifiedTopology: true
})