import { message } from 'antd';

export function showToastByType(type = 'success', messages) {
  message[type](messages);
}

// 正则验证
export const regexp = {
  // 字母和数字
  nuｍberAndLetters: /^[0-9a-z_\\-]*$/,
  // 必需字母数字
  letterNumberNeed: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
  telephoneOrPhone: /(^[1][3,4,5,7,8][0-9]{9}$)|(^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{5,30}$)/,
  // 手机
  telephone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
  // 邮箱
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  // 具体地址
  addressDetail: /^.{1,50}$/,
  // 密码(8-16位由数字，字母组成)
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
  // 账户正则表达式 4到16位（字母，数字，下划线，减号）
  uPattern: /^[a-zA-Z0-9_-]{4,16}$/,
  // 正整数
  posPattern: /^\d+$/,
  // 负整数
  negPattern: /^-\d+$/,
  // 整数
  intPattern: /^-?\d+$/,
  // 证件类型
  cardType: {
    // 居民身份证
    CREDENTIALSTYPE01: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    // 户口本
    CREDENTIALSTYPE02: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    // 护照
    CREDENTIALSTYPE03: /^.+$/,
    // 香港特区护照/身份证明
    CREDENTIALSTYPE04: /^.+$/,
    // 澳门特区护照/身份证明
    CREDENTIALSTYPE05: /^.+$/,
    // 台湾特区护照/身份证明
    CREDENTIALSTYPE06: /^.+$/,
    // 境外永久居住证,不知道
    CREDENTIALSTYPE07: /^.+$/,
    // 其他，不知道
    CREDENTIALSTYPE08: /^.+$/,
    // 无证明
    CREDENTIALSTYPE09: /^.*$/,
  },
  // ipV4地址
  ipPv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  // 颜色
  color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  // 中文姓名
  chineseName: /^[\u4e00-\u9fa5]{2,16}$/,
  // 邮编
  postCode: /^[1-9]\\d{5}(?!\\d)$/,
  // 正浮点数
  positiveFloat: /^[1-9]\\d*.\\d*|0.\\d*[0-9]\\d*$/,
  // >=0 整数或者小数
  positiveDouble: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
  notZero: /^[1-9]\d*$/,
  // qq
  qq: /^[1-9][0-9]{4,13}$/,
  // 固定电话
  landlineNo: /^0\d{2,3}-\d{7,8}$/,
};

export const publicData = {
  // 防抖的时间
  debounceTime: 500,
  // 是否正在提交中
  isCommit: false,

  // 不能跳转到登录页的接口
  notJumpLoginUrlArray: [
    '/eduTouch/auth',
    '/eduTouch/manage/user/api/send_sms_verify',
    '/eduTouch/manage/user/api/passwd_verify_mobile_code',
    '/eduTouch/manage/user/api/passwd_reset_passwd',
    '/questionnaire/survey/insertSurveyFormValue',
  ],
  excelTypeArr: ['xls', 'xlsx'],
};

// 遍历添加key
export function common(arr, key, key2) {
  if (!(arr instanceof Array)) {
    throw new Error('掉用forEachKey请传入数组');
  }
  if (typeof key !== 'string') {
    throw new Error('请传入要被赋值key的key');
  }
  const newArr = [];
  arr.forEach((val, index) => {
    const uniqueKey = key2 ? val[key] + val[key2] + index : val[key];
    newArr.push({
      ...val,
      key: uniqueKey,
    });
  });
  return newArr;
}

// 去掉左右空格
export function trim(string) {
  if (!string) {
    return '';
  }
  if (typeof string !== 'string') {
    throw new Error('请传入字符串');
  }
  return string.replace(/(^\s*)|(\s*$)/g, '');
}

// 序列化url上面的请求数据
export function serializeUrlData() {
  const locationUrl = window.location.href.split('#')[0];
  const serlizeObject = {};
  if (locationUrl.split('?').length === 2) {
    const needData = locationUrl.split('?')[1];
    const needDataArray = needData.split('&');
    for (let i = 0; i < needDataArray.length; i += 1) {
      // eslint-disable-line
      serlizeObject[needDataArray[i].split('=')[0]] = needDataArray[i].split('=')[1]; // eslint-disable-line
    }
  }
  return serlizeObject;
}

// 深clone数据
export function cloneDeep(parent) {
  let proxy;
  proxy = JSON.stringify(parent); // 把parent对象转换成字符串
  proxy = JSON.parse(proxy); // 把字符串转换成对象，这是parent的一个副本
  return proxy;
}

// 转化成base64
export function getBase64(img, callback) {
  const reader = new window.FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// base64转化成文件
export function base64ToFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-cond-assign
  while ((n -= 1) >= 0) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// html 转译
export function htmlReverse(string) {
  return string
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;/g, "'")
    .replace(/&#58;/g, ':')
    .replace(/&xixideng;/g, '=')
    .replace(/&xixiimage;/g, 'img');
}

// html 反转译
export function htmlEscape(string) {
  return string
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/&amp;/g, '&')
    .replace(/\s/g, '&nbsp;')
    .replace(/'/g, '&apos;')
    .replace(/:/g, '&#58;')
    .replace(/=/g, '&xixideng;')
    .replace(/img/g, '&xixiimage;');
}

// 封装获取数据
export function getData(dispatch, type, payload, resolve, reject) {
  dispatch({
    payload,
    type,
    callback: (response) => {
      if (response.status === 0) {
        resolve(response.data);
      } else {
        reject(response.errormsg);
      }
    },
  });
}

export function responseErrorMsg(response) {
  const redirectToLoginErrorCode = ['10203', '10204', '10205', '403', '10206'];
  if (Number(response.status) !== 0) {
    if (redirectToLoginErrorCode.indexOf(response.errorcode) > -1) {
      window.location.href = '/user/login';
      return false;
    }
    if (response.errormsg) {
      showToastByType('error', response.errormsg);
    }
    return true;
  }
  return true;
}

export function concatProductUniqueArr(arrFirst, arrSecond) {
  const newArr = arrFirst.concat(arrSecond);
  const has = {};
  return newArr.reduce((item, currentValue) => {
    if (!has[currentValue.key]) {
      has[currentValue.key] = true;
      item.push(currentValue);
    }
    return item;
  }, []);
}

export function handleFormatArrToSelectList(arr = [], id, name) {
  const newArr = [];
  arr.forEach((item) => {
    newArr.push({
      ...item,
      childCodeNm: item[name],
      childCd: item[id],
      codeId: item[id],
      key: item[id],
    });
  });
  return newArr;
}

// 超出文字隐藏
export function LimitwordNumber(txt, wordNum) {
  const str = `${txt.substr(0, wordNum)}${txt.length <= wordNum ? '' : '...'}`;
  return str;
}

// 对省城市解析
export function limitProvinces(num, type) {
  let str = ''; // 150203
  if (!num || num.length !== 6) {
    str = null;
  } else if (type === 'province') {
    str = `${num.substring(0, 2)}0000`;
  } else if (type === 'city') {
    str = `${num.substring(0, 4)}00`;
  } else {
    str = num;
  }
  return str;
}

export function nl2brreversal(data) {
  return data;
}

export default {
  forEachKey: common,
  common,
  trim,
  serializeUrlData,
  regexp,
  publicData,
  getData,
};
