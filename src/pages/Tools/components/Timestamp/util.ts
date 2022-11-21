export const NOW_TIMESTAMP = Math.round(new Date().getTime() / 1000);

// 时间戳转换为时间
export const timestampToTime = (timestamp, type) => {
  timestamp = timestamp ? Number(timestamp) : 0;
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  timestamp = type === 'second' ? timestamp * 1000 : timestamp;
  const date = new Date(timestamp);

  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
};

// 时间yyyy-MM-dd HH:mm:ss转为时间戳
export const timeToTimestamp = (time, type) => {
  const timestamp = Date.parse(new Date(time).toString());
  return type === 'second' ? Math.round(timestamp / 1000) : timestamp;
};

export const NOW = timestampToTime(NOW_TIMESTAMP, 'second');
