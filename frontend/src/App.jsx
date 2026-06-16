import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar">
        <h2>Library System</h2>

        <div>
          {token ? (
            <>
              <Link to="/">Books</Link>
              <Link to="/add">Add Book</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;