function jsonp (options) {
  // 动态创建script标签
  var script = document.createElement('script')
  // 拼接字符串的变量
  var params = ''
  for (var attr in options.data) {
    params += '&' + attr + '=' + options.data[attr]
  }
  // myJsonp0123456
  var fnName = 'myJsonp' + Math.random().toString().replace('.', '')

  // 挂载到window下 作为全局函数(.后面不能跟变量)
  window[fnName] = options.success
  // 为script标签添加src属性
  script.src = options.url + '?callback=' + fnName + params
  // 将script标签追加到页面中
  document.body.appendChild(script)
  // 为script标签添加onload事件
  script.onload = function () {
    document.body.removeChild(script)
  }
}
