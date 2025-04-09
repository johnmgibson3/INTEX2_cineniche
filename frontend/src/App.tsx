import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NoPage404 from './pages/NoPage404';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivacyPolicy from './pages/Privacy/PrivacyPolicy';
import Contact from './pages/Contact';
import MoviePage from './pages/MoviePage';
import AdminMovieTable from './pages/AdminMovieTable';
import ProtectedRoute from './components/RouteProtection/ProtectedRoute';
// admin is ready to be enforced simply slap this around admin path
//import AdminRoute from './components/RouteProtection/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <div className="page-wrapper bg-dark text-white">
                  <MoviePage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="admin" element={<AdminMovieTable />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
