/*
 * @Description: Description
 * @Author: 陆城锫
 * @Date: 2021-03-22 13:09:49
 */
const mongoose = require('mongoose')
 
mongoose.connect('mongodb://127.0.0.1:27017/lcp', { useNewUrlParser: true,useUnifiedTopology:true }, err => {
    if (err) {
        console.log(err)
        return false
    }
})

module.exports = mongoose
