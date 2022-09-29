import './index.scss';
import React, { useState } from 'react';
import { Input, Select } from 'antd';

const Option = Select.Option;

interface Options {
  name: string;
  url: string;
  placeholder: string;
}

const Search: React.FC = () => {
  const options: { [k: string]: Options } = {
    Google: {
      name: 'Google',
      url: 'https://www.google.com/search?q=',
      placeholder: '在 Google 上搜索',
    },
    Bing: {
      name: 'Bing',
      url: 'https://cn.bing.com/search?q=',
      placeholder: '输入搜索词',
    },
    Baidu: {
      name: 'Baidu',
      url: 'https://www.baidu.com/s?wd=',
      placeholder: '百度搜素',
    },
    Stackoverflow: {
      name: 'Stackoverflow',
      url: 'https://www.stackoverflow.com/search?q=',
      placeholder: 'Search...',
    },
    github: {
      name: 'Github',
      url: 'https://github.com/search?q=',
      placeholder: 'Search...',
    },
  };

  const [selected, setSelect] = useState<Options>(options.Google);

  const handleChange = (v, option) => {
    console.log(v, option);
    const select = option.data;
    setSelect(select);
  };

  return (
    <div className="search-wrap">
      <div className="search-content">
        <Input.Group compact>
          <Select defaultValue="Google" style={{ width: '25%', borderRadius: '25px 0 0 25px', height: '50px' }} onChange={handleChange}>
            {Object.entries(options).map((item) => (
              <Option key={item[0]} data={item[1]}>
                {item[1]?.name}
              </Option>
            ))}
          </Select>
          <Input
            style={{ width: '75%', textAlign: 'left', borderRadius: '0 25px 25px 0', height: '50px' }}
            placeholder={selected?.placeholder}
            // @ts-ignore
            onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => window.open(`${selected?.url}${e.target.value}`)}
          />
        </Input.Group>
      </div>
    </div>
  );
};

export default Search;
