/**
 * @module：Base64
 * base64字符串编码解码工具
 */

// 字母表
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export default class Base64 {
  /**
   * 进行base64编码
   * @param input 要编码的字符串
   */
  static encode(input: string) {
    let chr1; let chr2; let chr3; let enc1; let enc2; let enc3; let enc4;
    let output = '';
    let i = 0;
    input = this.utf8Encode(input || '');
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + alphabet.charAt(enc1) + alphabet.charAt(enc2) + alphabet.charAt(enc3) + alphabet.charAt(enc4);
    }
    return output;
  }

  /**
   * 进行base64解码
   * @param input 待解码的字符串
   */
  static decode(input: string) {
    let chr1; let chr2; let chr3; let enc1; let enc2; let enc3; let enc4;
    let output = '';
    let i = 0;
    input = input ? input.replace(/[^A-Za-z0-9+/=]/g, '') : '';
    while (i < input.length) {
      enc1 = alphabet.indexOf(input.charAt(i++));
      enc2 = alphabet.indexOf(input.charAt(i++));
      enc3 = alphabet.indexOf(input.charAt(i++));
      enc4 = alphabet.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this.utf8Decode(output);
    return output;
  }

  // private method for UTF-8 encoding
  private static utf8Encode(input: string) {
    input = input.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < input.length; n++) {
      const c = input.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  // private method for UTF-8 decoding
  private static utf8Decode(utftext: string) {
    let c; let c3; let c2;
    let string = '';
    let i = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}
