import React, { useState } from "react";
import { registerApi } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./AuthPage.css"; // <-- add same CSS file used for Login

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    await registerApi(form);
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT SIDE – BEAUTIFUL TESTIMONIAL CARDS */}
      <div className="auth-left">
        <h1 className="auth-title">
          Your journaling journey  
          <br />starts here! ✨
        </h1>

        <p className="auth-subtitle">
          Create your account and begin tracking tasks, moods, notes and more.
        </p>

        {/* SAME 3 CARD LAYOUT */}
        <div className="testimonial-cards">
          <div className="t-card t1"></div>
          <div className="t-card t2"></div>
          <div className="t-card t3"></div>
        </div>
      </div>

      {/* RIGHT SIDE – REGISTER FORM */}
      <Container className="auth-right">
        <Card className="shadow p-4 auth-card">
          <h3 className="text-center mb-4">Create Account</h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="Enter your email"
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

            <Button variant="success" className="w-100" onClick={submit}>
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </small>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
