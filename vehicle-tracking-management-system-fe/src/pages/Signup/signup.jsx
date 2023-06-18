import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationalID, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }

    if (!lastName) {
      errors.lastName = "Last name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!nationalID) {
      errors.nationalID = "National ID is required";
    } else if (!/^\d+$/.test(nationalID)) {
      errors.nationalID = "National ID should only contain numbers";
    }

    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!/^0\d+$/.test(phone)) {
      errors.phone = "Invalid phone number";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      nationalID: nationalID,
      phone: phone,
    };

    try {
      const res = await axios.post("http://localhost:9000/auth/signup", user);
        toast.success("Successfully created your account");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setNationalId("");

        setLoading(false);
        navigate("/login");
    } catch (error) {
      console.error("Signup failed: ", error);
      setLoading(false);
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" />
      <form className="form card">
        <h2>Signup</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="First name"
            className={`form-control ${
              errors.firstName ? "is-invalid" : ""
            }`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last name"
            className={`form-control${
              errors.lastName ? "is-invalid" : ""
            }`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="National Id"
            className={`form-control ${errors.nationalID ? "is-invalid" : ""}`}
            value={nationalID}
            onChange={(e) => setNationalId(e.target.value)}
          />
          {errors.nationalID && (
            <div className="invalid-feedback">{errors.nationalID}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Phone Number"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-submit"
          onClick={handleSubmit}
        >
          {loading ? "Creating account..." : "Signup"}
        </button>
        <p className="no-account">
          Already have an account?{" "}
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Signup;
