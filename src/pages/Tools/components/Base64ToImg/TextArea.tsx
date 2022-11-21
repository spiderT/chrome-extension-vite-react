import React, { useState, useRef, useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Input, message } from 'antd';
import { isDataURL } from '../../../../utils/commom';
import './index.scss';

interface Props {
  edit?: boolean;
  url?: string;
  placeholder?: string;
  onChange?: (src: string) => void;
}

const TextArea: React.FC<Props> = (props) => {
  console.log('props', props);
  const [url, setUrl] = useState<string>(props.url);
  const inputRef = useRef(null);

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    message.success('复制成功');
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setUrl(v);
    props.onChange(v);
  };

  const renderError = (str) => {
    if (!str) {
      return null;
    }
    if (!isDataURL(str)) {
      return <div className="err-tip">无法识别的Base64编码，请确认是正确的图片Data URI？</div>;
    }
    return null;
  };

  if (props?.edit) {
    return (
      <>
        <Input.TextArea placeholder={props.placeholder} className="textarea-wrap" onChange={handleChange} value={url} />
        {renderError(url)}
      </>
    );
  }

  return (
    <>
      <Input.TextArea className="textarea-wrap" value={url} disabled ref={inputRef} onFocus={() => inputRef.current?.select()} />
      {url ? <CopyOutlined className="copy-icon" onClick={handleCopy} /> : null}
    </>
  );
};

export default TextArea;
