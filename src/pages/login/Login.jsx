import React, { useState, useContext } from "react";
import "./login.scss";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Login() {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  function handleSubmit(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        // console.log(auth);
        dispatch({ type: "LOGIN", payload: { ...user, apiKey: "" } });
        navigate("/AdminDashboard", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("inLogin", errorCode, errorMessage);
        setError(true);
      });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="form-input"
          name="email"
          type="email"
          placeholder="Email"
          autoFocus
        />
        <input
          name="password"
          onChange={handleChange}
          className="form-input"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
        {error && <span>Wrong Email or Password</span>}
      </form>
    </div>
  );
}

export default Login;
