import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../reducer/Actions";
import { FcGoogle } from "react-icons/fc";

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handlingInput = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlingSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const reachGoogle = () => {
    const clientID = "967588498985-mg47pjtlhlbpimjnqs5ss7sa50p9agnh.apps.googleusercontent.com";
    const callBackURI = "https://janhai.space/";
    window.location.replace(
      `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`
    );
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />; // Navigate to /dashboard for both login and Google login success
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "100px" }}>
    <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form className="mb-3" onSubmit={handlingSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            name="email"
            value={email}
            onChange={handlingInput}
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            name="password"
            value={password}
            onChange={handlingInput}
            type="password"
            className="form-control"
            id="password"
            placeholder="password ..."
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
        <div className="d-grid gap-2 mt-2">
          <button className="btn btn-outline-danger" type="button" onClick={reachGoogle}>
            <FcGoogle className="me-2" />Login With Google
          </button>
        </div>
      </form>
      <div className="text-center mt-3">
        <p>
          Forgot your password?{" "}
          <Link to={"../reset/password/"}>Reset Password</Link>
        </p>
        <p>
          Don't have an account? <Link to={"../signup/"}>Signup</Link>
        </p>
      </div>
    </div>
  </div>
  
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps, { login })(Login);
