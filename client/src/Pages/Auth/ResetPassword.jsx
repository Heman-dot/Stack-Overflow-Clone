import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [email, setEmail] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (password !== cpassword) {
        toast.error("Passwords do not match");
      } else if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
      } else {
        await axios.post(`http://localhost:8080/resetpassword`, { email, password })
          .then(res => {
            if (res.data === "pass") {
              toast.success("Password changed successfully");
              navigate("/Auth");
            } else if (res.data === "fail") {
              toast.error("Something went wrong!");
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="auth-section">
      <style>{`
        .auth-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .auth-container-2 {
          background-color: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .auth-btn {
          background-color: #007ac6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .auth-btn:hover {
          background-color: #005f99;
        }

        .auth-btn:disabled {
          background-color: #d3d3d3;
          cursor: not-allowed;
        }

        h4 {
          margin-bottom: 0.5rem;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        input:focus {
          border-color: #007ac6;
          outline: none;
        }
      `}</style>
      <div className="auth-container-2">
        <form onSubmit={submit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            <h4>Password</h4>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="cpassword">
            <h4>Confirm Password</h4>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="auth-btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}