import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NoPage404 from './pages/NoPage404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NoPage404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
