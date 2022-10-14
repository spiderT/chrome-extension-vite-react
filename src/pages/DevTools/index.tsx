import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    chrome.devtools.panels.create('SpiderT_HttpMock', null, 'index.html#/devtools-tab');
  }, []);

  return <div>Hello Dev-Tools</div>;
}
