import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(registerUser({ email, password }));
      alert("Registered successfully.")
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-start gap-5"
      >
        <h2 className="mt-12 text-xl font-bold">Register</h2>

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
        <button
          type="submit"
          className="text-center text-xl w-fit text-white rounded-md px-5 bg-blue-800"
        >
          Register
        </button>
        <NavLink to="/login">/Login</NavLink>
      </form>
  <div className="flex justify-center items-center">

      {auth.status === "loading" && <p>Loading...</p>}
      {auth.error && <p>{auth.error}</p>}
    </div>
    </div>
  );
};

export default Register;
