import './index.scss';
import React, { useState } from 'react';
import { useInterval } from 'ahooks';
import { Input, Button, Select, Divider } from 'antd';
import { NOW_TIMESTAMP, NOW, timestampToTime, timeToTimestamp } from './util';

const { Option } = Select;

export interface Options {
  value: string;
  label: string;
}

const options: Options[] = [
  {
    value: 'second',
    label: '秒(s)',
  },
  {
    value: 'millisecond',
    label: '毫秒(ms)',
  },
];

export default function Timestamp() {
  const [now, setNow] = useState<number>(NOW_TIMESTAMP);
  const [selectedTimestamp, setSelectTimestamp] = useState<Options>(options[0]);
  const [selectedTime, setSelectTime] = useState<Options>(options[0]);
  const [timestamp, setTimestamp] = useState<string>('');
  const [time, setTime] = useState<number>();
  const [originalTimestamp, setOriginalTimestamp] = useState<number | string>(NOW_TIMESTAMP);
  const [originaTime, setOriginalTime] = useState<string>(NOW);

  const handleChangeTimestamp = (_, option) => {
    const select = option;
    setSelectTimestamp(select);
  };

  const handleChangeTime = (_, option) => {
    const select = option;
    setSelectTime(select);
  };

  const transferTimestamp = () => {
    const v = timestampToTime(originalTimestamp, selectedTimestamp.value);
    setTimestamp(v);
  };

  const transferTime = () => {
    const v = timeToTimestamp(originaTime, selectedTime.value);
    setTime(v);
  };

  const clear = useInterval(() => {
    setNow(now + 1);
  }, 1000);

  const renderOptions = (data) =>
    data.map((item) => (
      <Option key={item.value} value={item.value} data={item.value}>
        {item?.label}
      </Option>
    ));

  return (
    <div className="timestamp-wrap">
      <div className="item">
        <span className="label">现在：</span>
        <span>{now}</span>
      </div>
      <div className="item">
        <span className="label">控制：</span>
        <Button danger type="primary" onClick={clear}>
          停止
        </Button>
      </div>
      <Divider />
      <div className="item">
        <span className="label">时间戳：</span>
        <Input.Group compact>
          <Input style={{ width: '75%' }} onChange={(e) => setOriginalTimestamp(e.target.value)} defaultValue={NOW_TIMESTAMP} />
          <Select style={{ width: '25%' }} onChange={handleChangeTimestamp} value={selectedTimestamp?.value}>
            {renderOptions(options)}
          </Select>
        </Input.Group>
      </div>
      <div className="item">
        <span className="label">
          <Button type="primary" onClick={transferTimestamp}>
            转换
          </Button>
        </span>
        <Input value={timestamp} />
      </div>
      <Divider />
      <div className="item">
        <span className="label">时间：</span>
        <Input onChange={(e) => setOriginalTime(e.target.value)} defaultValue={NOW} />
      </div>
      <div className="item">
        <span className="label">
          <Button type="primary" onClick={transferTime}>
            转换
          </Button>
        </span>
        <Input.Group compact>
          <Input style={{ width: '75%' }} value={time} />
          <Select style={{ width: '25%' }} onChange={handleChangeTime} value={selectedTime?.value}>
            {renderOptions(options)}
          </Select>
        </Input.Group>
      </div>
    </div>
  );
}
