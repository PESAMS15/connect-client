import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

import img from "./image.png"

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      username === "Admin" &&
      password === "admin12345"
    ) {
      // Store a simple demo login state
      sessionStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin");
      return;
    }

    setError("Invalid username or password");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-brand">
            <img className="fge" src={img} alt="" />
            <h2>Faya Panel</h2>

          </div>

        <h1>Admin Sign in</h1>

        <p className="admin-login-subtitle">
          Sign in to access the admin dashboard
        </p>

        <form onSubmit={handleSubmit}>

          <div className="admin-input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder=" "
              autoComplete="username"
            />

            <label>
              Username
            </label>
          </div>

          <div className="admin-input-group">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder=" "
              autoComplete="current-password"
            />

            <label>
              Password
            </label>
          </div>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <label className="admin-show-password">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) =>
                setShowPassword(
                  e.target.checked
                )
              }
            />

            <span>Show password</span>
          </label>

          <button
            type="submit"
            className="admin-login-button"
          >
            Sign in
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;