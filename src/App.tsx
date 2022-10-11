import { HashRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Newtab from './pages/Newtab';
import Popup from './pages/Popup';
import Tools from './pages/Tools';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/newtab" element={<Newtab />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
