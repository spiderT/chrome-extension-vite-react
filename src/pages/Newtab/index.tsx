import './index.scss';
import Portals from './components/Portals';
import Search from './components/Search';

export default function App() {
  return (
    <div className="chrome-extension-newtab">
      <Search />
      <Portals />
    </div>
  );
}
