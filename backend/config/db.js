const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://usama_uddin:PSep7n9P58Vy5gtg@cluster0.ncmxjjw.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true })

module.exports = mongoose