const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log(require('dotenv').config())
console.log('connecting to', url)

const mongoUrl = process.env.MONGODB_URI
console.log(require('dotenv').config())
console.log('connecting to', mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)