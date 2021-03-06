function ajax (options) {
  // 存储默认值
  var defaults = {
    type: 'get',
    url: '',
    data: {

    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function () {},
    error: function () {}
  }

  // 使用options中的属性覆盖defaults
  Object.assign(defaults, options)

  // 创建ajax对象
  var xhr = new XMLHttpRequest()
  // 拼接请求参数的变量
  var params = '' 
  // 循环用户传递进来的对象格式参数
  for (var attr in defaults.data) {
    // 将参数转换为字符串格式
    params += attr + '=' + defaults.data[attr] + '&'
  }
  // 截掉参数最后的 & 并赋值给params
  params = params.substr(0, params.length-1)
  
  // 判断请求方式
  if (defaults.type === 'get') {
    defaults.url = defaults.url + '?' + params
  }
  
  // 配置ajax对象
  xhr.open(defaults.type, defaults.url)

  // 如果请求方式为post
  if (defaults.type === 'post') {
    // 用户希望传递的请求参数类型
    var contentType = defaults.header['Content-Type']
    xhr.setRequestHeader('Content-Type', contentType)

    if (contentType == 'application/json') {
      xhr.send(JSON.stringify(defaults.data))
    } else {
      xhr.send(params)
    }
  } else {
    // 发送请求
    xhr.send()
  }
  // 获取服务器端响应结果
  // xhr接收完响应数据 后触发
  xhr.onload = function () {
    // 获取响应头中的数据
    // xhr.getResponseHeader('Content-Type')
    var contentType =  xhr.getResponseHeader('Content-Type')
    var responseText = xhr.responseText
    // 判断是否包含 application/json
    if (contentType.includes('application/json')) {
      responseText = JSON.parse(responseText)
    }

    if (xhr.status == 200) {
      // 请求成功
      defaults.success(responseText, xhr)
    } else {
      // 请求失败
      defaults.error(responseText, xhr)
    }
  }
}