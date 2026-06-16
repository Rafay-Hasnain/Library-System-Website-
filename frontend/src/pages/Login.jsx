import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (!username || !password) {
            setMessage('Please fill all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setMessage('Invalid username or password.');
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>

            <p className="message">{message}</p>

            <p>
                No account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}

export default Login;