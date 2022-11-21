import React, { useState, useEffect, useRef } from 'react';

const TEXTAREA = 'textarea';

interface Props {
  className?: string;
  rows?: number;
  onChange?: (value: string) => void;
  type?: typeof TEXTAREA;
  placeholder?: string;
}

export default function ClipboardInput(props: Props) {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const inputRef = useRef(null);
  const [pasted, setPasted] = useState<boolean>(false);

  useEffect(() => {
    navigator.clipboard.readText().then((clipText) => {
      const text = clipText?.trim();
      if (!text) {
        return;
      }
      setCurrentUrl(text);
      props.onChange(text);
      setPasted(true);
      inputRef.current?.select();
    });
  }, [pasted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setCurrentUrl(v);
    props.onChange(v);
  };

  const inputConfig = {
    placeholder: props.placeholder,
    className: props.className,
    onChange: handleChange,
    value: currentUrl,
    ref: inputRef,
  };

  if (props.type === TEXTAREA) {
    return <textarea rows={props.rows || 10} {...inputConfig} />;
  }

  return <input {...inputConfig} />;
}
