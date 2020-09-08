// 引入express框架
const express = require('express')
// 路径处理模块
const path = require('path')
const bodyParser = require('body-parser') // 可以解析JSON、Raw、文本、URL-encoded格式的请求体
const formidable = require('formidable')
const fs = require('fs')

// 创建web服务器
const app = express()

// 解析application/x-www-form-urlencoded格式参数
app.use(bodyParser.urlencoded({extended :true}))
// 接受json格式数据
app.use(bodyParser.json())

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'get, post')
  next()
})

app.get('/first1', (req, res) => {
  res.send('Hello')
})

app.get('/test', (req, res) => {
  const result = 'fn({name: "张三"})'
  res.send(result)
})

app.get('/better', (req, res) => {
  // 接受客户端传递的函数名
  // const fnName = req.query.callback
  // 将函数名称对应的调用代码返回给客户端
  // const result = fnName + '({name: "张三"})'
  // res.send(result)
  res.jsonp({name: 'lisi', age: 20})
})

app.get('/cors', (req, res) => {
  // 允许那些客户端访问
  // * 代表允许所有客户端访问
  // res.header('Access-Control-Allow-Origin', '*')
  // // 允许客户端使用哪些请求方法
  // res.header('Access-Control-Allow-Methods', 'get, post')
  res.send('ok')
})



// 监听端口
app.listen(3001)
// 控制台输出提示
console.log('服务器启动成功')