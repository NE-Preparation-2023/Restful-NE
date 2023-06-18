import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../Signup/signup.css';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/user'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!validateForm()){
      return;
    }
    
    setLoading(true);
    const user = { email, password };

    try {
      const res = await axios.post(`http://localhost:9000/auth/login`, user);
      toast.success("Successfully logged in")
      setEmail('');
      setPassword('')

      localStorage.setItem('token', res.data?.token)
      setLoading(false);

      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.error || error?.message || "An error occurred");
    }
  }
  return (
    <div className="container">
      <ToastContainer position="top-right" />
      <form className="form card">
        <h2>Admin Login</h2>
        <div className="form-group">
          {/* <label>Email</label> */}
          <input
           type='email'
            placeholder='Email Address' 
            className={`form-control ${errors.email ? "is-invalid" : "" }`} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email} </div>
            )}
        </div>
        <div className="form-group">
          {/* <label>Password</label> */}
          <input
            type="password"
            placeholder="Password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <button type="submit" className="btn btn-submit" onClick={handleSubmit}>{loading ? 'Logging in...' : 'Login'}</button>
        <p className="no-account">No account? <NavLink className="link" to='/'>Signup</NavLink></p>
      </form>
    </div>
  );
};

export default Login;
