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

app.get('/first', (req, res) => {
  res.send('Hello')
})
// 01
app.get('/resposeData', (req, res) => {
  res.send({
    'name': 'zs'
  })
})
// 02
app.get('/get', (req, res) => {
  res.send(req.query)
})

// 03
app.post('/post', (req, res) => {
  res.send(req.body)
})

// 04
app.post('/json', (req, res) => {
  res.send(req.body)
})

// 05
app.get('/readystate', (req, res) => {
  res.send('hello')
})

// 06
app.get('/error', (req, res) => {
  res.status(400).send('not ok')
})

// 
app.get('/cache', (req, res) => {
  fs.readFile('./public/test.txt', (err, result) => {
    res.send(result)
  })
})

// error
app.post('/errortest', (req, res) => {
  res.status(400).send('not ok')
})

app.get('/verifyEmailAddress', (req, res) => {
  var email = 'admin@yunjiaowu.cn'
  if (req.query.email == email) {
    res.status(400).send('邮箱已存在')
  } else {
    res.status(200).send('还未注册')
  }
})

app.post('/formData', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 解析客户端传递来的FormData对象
  form.parse(req, (err, fields, files) => {
    // 1)错误对象 2)普通的表单请求内容 3)文件上传相关信息
    res.send(fields)
  })
})

app.post('/upload', (req, res) => {
  // 创建formidable表单解析对象
  const form = new formidable.IncomingForm()
  // 设置客户端上传文件存储路径
  form.uploadDir = path.join(__dirname, 'public', 'upload')
  // 保留上传文件的后缀名字
  form.keepExtensions = true
  // 解析客户端传递来的FormData对象
  form.parse(req, (err, fields, files) => {
    // 1)错误对象 2)普通的表单请求内容 3)文件上传相关信息
    // 将客户端传递过来的文件地址响应到客户端
    res.send({
      path: files.attrName.path.split('public')[1]
    })

  })
})



// 监听端口
app.listen(3000)
// 控制台输出提示
console.log('服务器启动成功')