const express = require('express')
const axios = require('axios')
const app = express()
const client = require('./client')

app.get('/', async (req,res)=>{

const cachevalue = await client.get('posts')
if(cachevalue) return res.json(JSON.parse(cachevalue))

const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
await client.set('posts',JSON.stringify(data))
await client.expire('posts', 30)
  return res.json(data)
})

app.listen(9000)