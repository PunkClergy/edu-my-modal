var apiUrlScrm = 'https://scrm.edutouch.com.cn'; //正式
var apiUrledutouch = 'https://api.edutouch.com.cn'; //正式
// var apiUrlScrm = 'http://scrm-dev.edutouch.com.cn';   //开发
// var apiUrledutouch = 'http://api-dev.edutouch.com.cn';  //开发

function getUrl(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function isterminal() {
  if (/MicroMessenger/.test(window.navigator.userAgent)) {
    return 'weixin';
  } else if (/AlipayClient/.test(window.navigator.userAgent)) {
    // 支付宝
    return 'alipay';
  } else {
    return 'others';
  }
}


function checkPhone(phone) {
  return /^1(3|4|5|7|8)\d{9}$/.test(phone);
}

function showToast(text) {
  $('.showToast').html('<span>' + text + '</span>');
  $('.showToast').fadeIn(300);
  setTimeout(function() {
    $('.showToast').fadeOut(300);
  }, 3000);
}

//请求封装
function requestAJ(param, callback, isLogin, sync) {
  var headers = {
    'Content-Type': 'application/json',
  };

  if (isLogin) {
    headers.Authorization = getToken() ? `Bearer ${getToken()}` : null;
  }

  $.ajax({
    type: param.type ? param.type : 'GET',
    dataType: 'json',
    headers: headers,
    url: param.url,
    async: sync ? false : true,
    data: param.type == 'POST' ? JSON.stringify(param.data) : param.data,
    success: function(result) {
      callback(result);
    },
    error: function() {
      callback({ success: false, errormsg: '服务错误，请稍后重试' });
    },
  });
}

// 设置token
function setToken(info) {
  return localStorage.setItem('token', info);
}

// 获取token
function getToken() {
  return localStorage.getItem('token') ? localStorage.getItem('token') : '';
}

// 设置loginInfo
function setLoginInfo(info) {
  return localStorage.setItem('loginInfo', info !== '' ? JSON.stringify(info) : '');
}

// 获取loginInfo
function getLoginInfo() {
  var loginStorage = localStorage.getItem('loginInfo') ? localStorage.getItem('loginInfo') : '';
  return loginStorage !== '' ? JSON.parse(loginStorage) : null;
}

