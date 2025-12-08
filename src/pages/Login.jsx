import React, { useState, useContext } from "react";
import { loginApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);

  const [form, setForm] = useState({ email: "", password: "" });

  // if (token) navigate("/register");

  const submit = async () => {
    const res = await loginApi(form);
    login(res.data.token, res.data.user);
    navigate("/home");
  };

  return (
    <div className="login-wrapper">

      {/* LEFT PANEL — Testimonial / Illustration */}
      <div className="login-left">
          
        <h1 className="headline">
           <div>
        <i className="bi bi-stars sidebar-logo">BuJo Lens</i>
      </div>
          Setting you up for success,<br />from start to scale.
        </h1>

        <p className="subtext">
          Your bullet journal, now smarter. Digitize notes, track tasks,
          organize thoughts — all in one clean workflow.
        </p>

        <div className="testimonial-cards">
          <div className="t-card t1"></div>
          <div className="t-card t2"></div>
          <div className="t-card t3"></div>
        </div>
      </div>

      {/* RIGHT PANEL — Login Box */}
      <div className="login-right">
        <div className="login-card shadow-lg">
          <h3 className="text-center mb-4 fw-bold">Login</h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </Form.Group>

            <Button variant="dark" className="w-100 py-2" onClick={submit}>
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
