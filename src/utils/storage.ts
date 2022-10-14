export class LocalStorage {
  static storage = window.localStorage;

  static set(key: string, value: any, expires?: string | number) {
    if (this.storage) {
      if (typeof key !== 'string') {
        throw new Error('The format or type of "key" is wrong!');
      }
      if (expires) {
        const exp = parseInt(expires as string, 10);
        if (!isNaN(exp) && exp > 0) {
          this.storage.setItem(
            key,
            JSON.stringify({
              value,
              expires: Date.now() + exp * 1000 * 60,
            })
          );
        } else {
          throw new Error('The format or type of "key" is wrong!');
        }
      } else {
        const val = typeof value === 'object' ? JSON.stringify(value) : value;
        this.storage.setItem(key, val);
      }
    }
  }

  static get(key: string) {
    if (this.storage) {
      const val = this.storage.getItem(key);
      try {
        const parseVal = JSON.parse(val);
        if (parseVal.hasOwnProperty('expires')) {
          if (parseVal.expires > Date.now()) {
            return parseVal.value;
          }
          this.remove(key);
          return null;
        }
        return parseVal;
      } catch (e) {
        return val;
      }
    }
  }

  static remove(key: string) {
    this.storage && this.storage.removeItem(key);
  }
}
