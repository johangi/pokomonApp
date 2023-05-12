import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Pages & Components
import Home from './pages/Home';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to={user && "/home/" + user.username} replace />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={user && "/home/" + user.username} replace />}
            />
            <Route
              path="/home/:user"
              element={user ? <Homepage /> : <Navigate to="/" replace />}
            />
            <Route 
              path="/:user"
              element={<User />}
            />
          </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
