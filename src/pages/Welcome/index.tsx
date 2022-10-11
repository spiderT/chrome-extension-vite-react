import './index.scss';
import { GithubOutlined } from '@ant-design/icons';

export default function App() {
  return (
    <div className="welcome-container">
      <p className="github" onClick={() => window.open('https://github.com/spiderT')}>
        Welcome to spiderT <GithubOutlined style={{ marginLeft: 4 }} />
      </p>
    </div>
  );
}
