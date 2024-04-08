if (isterminal() === 'weixin') {
  getWeChat();
} else {
  alert('请在微信中打开');
}

$(function() {
  var headimgurl = getUrl('headimgurl');
  console.log(headimgurl);
  $('.payforimg').attr('src', headimgurl);
});

//微信支付获取code
function getWeChat() {
  var getOpenid = getUrl('openid');
  var getappid = getUrl('appid');
  if (getOpenid === null) {
    var encodeUrl = window.location.origin + window.location.pathname;
    window.location.href = apiUrlScrm + '/wx/menu/redirect?appid=wxdc1dcaa9066bfb05&returnUrl=' + encodeUrl;
  }
}


//验证绑定
function clickBind() {
  var userName = $('#userName').val();
  var getOpenid = getUrl('openid');
  var getappId = getUrl('appid');
  if (userName == '' || !checkPhone(userName)) {
    showToast('您输入手机号不正确');
    $('#userName').focus();
    return;
  }
  $('#popBox').fadeIn(100);
  requestAJ(
    {
      type: 'POST',
      url: apiUrlScrm + '/wx/bind/bindUser',
      data: {
        openId: getOpenid,
        mobileNo: userName,
        appId: getappId,
      },
    },
    function(result) {
      $('#popBox').fadeOut(100);
      if (!result.success) {
        showToast(result.message);
        return;
      }
      window.location.href = 'success.html';
    });

}


function smsVerifyClick() {
  var mobile = $('#userName').val();
  var code = $('#code').val();
  if (!checkPhone(mobile)) {
    showToast('请输入正确的手机号');
    $('#userName').focus();
    return;
  }
  if (code == '') {
    showToast('请填写验证码');
    $('#code').focus();
    return;
  }
  $('#popBox').fadeIn(100);
  requestAJ(
    {
      type: 'POST',
      url: apiUrledutouch + '/wechat/checkMobileVerify',
      data: {
        mobileNo: mobile,
        secureCd: code,
      },
    },
    function(result) {
      $('#popBox').fadeOut(100);
      if (result.success) {
        clickBind();
      } else {
        showToast(result.errormsg);
      }
    });
}


function getSmsVerify() {
  var mobile = $('#userName').val();
  if (!checkPhone(mobile)) {
    showToast('请输入正确的手机号');
    $('#userName').focus();
    return;
  }
  $('#popBox').fadeIn(100);
  requestAJ(
    {
      type: 'POST',
      url: apiUrledutouch + '/wechat/send_sms_verify?mobileNo=' + mobile,
      data: {},
    },
    function(result) {
      $('#popBox').fadeOut(100);
      if (result.success) {
        showToast('发送成功');
        $('.smsVerify').fadeOut(0);
        $('.smsVerifyGray').fadeIn(0);
        countDown(60);
      } else {
        showToast(result.errormsg);
      }
    });
}

//倒计时
function countDown(count) {
  if (count === 0) {
    $('.smsVerifyGray').fadeOut(0);
    $('.smsVerify').fadeIn(0);
    return;
  }
  count--;
  $('.smsVerifyGray').html('重新发送' + count + '秒');
  setTimeout(function() {
    countDown(count);
  }, 1000);

}

