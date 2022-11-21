import './index.scss';
import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import ReactJson from 'react-json-view';
import ClipboardInput from '../ClipboardInput';

const { Option } = Select;

export default function JsonFormat() {
  const [value, setValue] = useState('');
  const [indent, setIndent] = useState<string>('4');
  const [obj, setObj] = useState<Object>({});
  const [error, setError] = useState<any>(null);

  const safeJsonParse = (v) => {
    if (!v) {
      setError(null);
      return {};
    }
    if (typeof v === 'object') {
      setError(null);
      return v;
    }
    try {
      setError(null);
      return JSON.parse(v);
    } catch (err) {
      setError(err.message);
      return err.message;
    }
  };

  const handleFormat = () => {
    setObj(safeJsonParse(value));
  };
  const handleChange = (v: string) => {
    setIndent(v);
  };

  return (
    <div className="format-wrap">
      <ClipboardInput type="textarea" rows={12} onChange={(v) => setValue(v)} className="json-textarea" />
      <Select defaultValue="4" style={{ width: 200 }} onChange={handleChange}>
        <Option value="2">Indent with 2 spaces</Option>
        <Option value="3">Indent with 3 spaces</Option>
        <Option value="4">Indent with 4 spaces</Option>
      </Select>
      <div className="btn-wrap">
        <Button type="primary" icon={<MenuOutlined />} onClick={handleFormat}>
          Format JSON
        </Button>
      </div>
      {error ? <p className="error">{JSON.stringify(error)}</p> : <ReactJson src={obj} indentWidth={Number(indent)} />}
    </div>
  );
}
