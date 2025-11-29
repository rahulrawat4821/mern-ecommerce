import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Save in context
      setToken(data.token);
      setUser(data.user);

      alert("Login successful!");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Something went wrong!");
    }
  };

  return  (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {/* 👇 Add this */}
      <p style={{ textAlign: "center", marginTop: "12px" }}>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }}
        >
          Signup
        </span>
      </p>

    </div>
  </div>
);

};

export default Login;
    