import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import "./Signup.css";

const Signup = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/register", form);
      setLoading(false);

      alert("Signup Successful! Please login.");

      // Clear form
      setForm({ name: "", email: "", password: "" });

      // Redirect to login page
      navigate("/", { replace: true });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable. Try again later.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* ⭐ Login Link */}
        <p className="auth-link-text">
          Already have an account?{" "}
          <Link to="/" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
