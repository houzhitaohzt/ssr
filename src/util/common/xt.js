/**
 * @author: houzhitao
 * @since: 2018-05-31 19:02
 */

export default class Xt {
  static base64Chars = {
      encode: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789+/',
      decode: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
          7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
          37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
  };

  static base64decode(str) {
        let c1, c2, c3, c4, cary = this.base64Chars.decode;
        let i, len, out;
        str = "" + str;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            do {
                c1 = cary[str.charCodeAt(i++) & 0xff]
            } while (i < len && c1 === -1);
            if (c1 === -1) break;
            do {
                c2 = cary[str.charCodeAt(i++) & 0xff]
            } while (i < len && c2 === -1);

            if (c2 === -1) break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 === 61) return out;
                c3 = cary[c3]
            } while (i < len && c3 === -1);
            if (c3 === -1) break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 === 61) return out;
                c4 = cary[c4]
            } while (i < len && c4 === -1);

            if (c4 === -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
        }
        return out
    }

  static base64encode(str) {
        let out, i, len, base64EncodeChars = this.base64Chars.encode;
        let c1, c2, c3;
        str = str + "";
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;

            if (i === len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break
            }
            c2 = str.charCodeAt(i++);
            if (i === len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F)
        }
        return out
    }

  static isFunction(obj) {
      return typeof obj === 'function';
  }

  static isNumber(obj) {
      return typeof obj === 'number' || Object.prototype.toString.call(obj) === '[object Number]';
  }

  static isString(obj) {
      return typeof obj === 'string' || Object.prototype.toString.call(obj) === '[object String]';
  }

  static isObject(obj) {
      return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
  }

  static isArray(obj) {
      return Array.isArray(obj) ||
          (typeof obj === 'object' && Object.prototype.toString.call(obj) === "[object Array]");
  }

  static isUndefined(obj) {
      return typeof obj === 'undefined';
  }

  static isEmpty(obj) {
      return typeof obj === 'undefined' || obj === null || (this.isString(obj) && obj.length === 0)
  }


  /**
   * @param object eg: {a: b: { c : 1}, d: 2}
   * @param key eg: 'a.b.c'
   * @return {string} eg: 1
   * */
  static getItemValue(object, key, defaultVaule) {
      if(this.isEmpty(str)) return defaultVaule;
      let k = key.split('.'), v = {};
      for(let i of k){
          v = v[i] || object[i];
          if(!v) break;
      }
      return v || defaultVaule;
  }

  /**
   * 深拷贝
   * @param object | array
   * @return {object}
   * */
  static cloneDeep(object) {
      let dp = ob => {
          let nB = this.isArray(ob) ? [] : {};
          if(this.isArray(ob)){
              for(let i = 0; i < ob.length; i++){
                  if(this.isArray(ob[i])){
                      nB[i] = dp(ob[i]);
                  }else if(this.isObject(ob[i])){
                      nB[i] = dp(ob[i]);
                  }else{
                      nB[i] = ob[i];
                  }
              }
          }else if(this.isObject(ob)){
              for(let [k, v] of Object.entries(ob)){
                  if(this.isArray(v)){
                      nB[k] = dp(v);
                  }else if(this.isObject(v)){
                      nB[k] = dp(v);
                  }else{
                      nB[k] = v;
                  }
              }
          }
          return nB;
      };
      return dp(object);
  };
};
// window.xt = Xt;

