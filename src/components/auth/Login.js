import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>

    <div className="flex justify-center items-center">
    to get you started:
      <br/>email: gauravjadhav22@gmail.com
      <br/>password: 123456
    </div>
     
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start gap-5">
      <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-2 p-1"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-2 p-1"

        />
        <button type="submit" className="text-center text-xl w-fit text-white rounded-md px-5 bg-blue-800">Login</button>
        <NavLink to="/register">/Register</NavLink>
    
      </form>
      {auth?.status === 'loading' && <p>Loading...</p>}
      {auth?.error && <p>{auth.error}</p>}
    </div>
  );
};

export default Login;
