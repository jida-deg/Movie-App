import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../components/AuthProvider';
import './register.css'
import GoogleLogin from './GoogleLogin.JSX';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log("Submit button clicked");

    setError('');
    try {
      const ok = await signUp(name, email, password);
      if (ok) {
        navigate('/moviespage');
      } else {
        setError('A user with that email already exists');
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/moviespage');
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create account</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
      <GoogleLogin/>
    </div>
  );
}

export default SignUp;
