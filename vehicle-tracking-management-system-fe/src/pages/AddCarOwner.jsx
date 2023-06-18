import React, { useState } from "react";
import './Signup/signup.css';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCarOwner = () => {
    const [ownerNames, setOwnerNames] = useState("");
    const [ownerNationalId, setOwnerNationalId] = useState("");
    const [ownerPhoneNumber, setOwnerPhoneNumber] = useState("");
    const [ownerAddress, setOwnerAddress] = useState("");
    const [ownerProfile, setOwnerProfile] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
    
        if (!ownerNames) {
          errors.ownerNames = "Owner name is required";
        }
    
        if (!ownerAddress) {
          errors.ownerAddress = "Owner Address is required";
        }
    
        if (!ownerNationalId) {
          errors.ownerNationalId = "National ID is required";
        } else if (!/^\d+$/.test(ownerNationalId)) {
          errors.ownerNationalId = "National ID should only contain numbers";
        }
    
        if (!ownerPhoneNumber) {
          errors.ownerPhoneNumber = "Phone number is required";
        } else if (!/^0\d+$/.test(ownerPhoneNumber)) {
          errors.ownerPhoneNumber = "Invalid phone number";
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

        const carOwner = {
           ownerNames: ownerNames,
           ownerNationalId: ownerNationalId,
           ownerPhoneNumber: ownerPhoneNumber,
           ownerAddress: ownerAddress,
           ownerProfile: ownerProfile           
        }
        try {
            const res = await axios.post('http://localhost:9000/carOwner', carOwner);
                toast.success("Successfully created your account")
                setOwnerNames('');
                setOwnerNationalId('');
                setOwnerPhoneNumber('')
                setOwnerAddress('');
                setOwnerProfile('');

                setLoading(false);
                navigate('/dashboard');
            
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.error || error?.message|| "An error occurred");
        }
    }
    return(
        <div className="container">
      <ToastContainer position="top-right" />
      <form className="form card">
        <h2>Register New car Owner</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Owner Names"
            className={`form-control ${
              errors.ownerNames ? "is-invalid" : ""
            }`}
            value={ownerNames}
            onChange={(e) => setOwnerNames(e.target.value)}
          />
          {errors.ownerNames && (
            <div className="invalid-feedback">{errors.ownerNames}</div>
          )}
        </div>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Owner National Id"
            className={`form-control ${errors.ownerNationalId ? "is-invalid" : ""}`}
            value={ownerNationalId}
            onChange={(e) => setOwnerNationalId(e.target.value)}
          />
          {errors.ownerNationalId && (
            <div className="invalid-feedback">{errors.ownerNationalId}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Owner Phone Number"
            className={`form-control ${errors.ownerPhoneNumber ? "is-invalid" : ""}`}
            value={ownerPhoneNumber}
            onChange={(e) => setOwnerPhoneNumber(e.target.value)}
          />
          {errors.ownerPhoneNumber && (
            <div className="invalid-feedback">{errors.ownerPhoneNumber}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Owner Address"
            className={`form-control ${
              errors.ownerAddress ? "is-invalid" : ""
            }`}
            value={ownerAddress}
            onChange={(e) => setOwnerAddress(e.target.value)}
          />
          {errors.ownerAddress && (
            <div className="invalid-feedback">{errors.ownerAddress}</div>
          )}
        </div>
        <div className="form-group">
        <input
            type="file"
            className="form-control-file"
            id="ownerProfile"
            onChange={(e) => setOwnerProfile(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="btn btn-submit"
          onClick={handleSubmit}
        >
          {loading ? "Registering Car Owner..." : "Register Car Owner"}
        </button>
        <button className="btn btn-transparent" onClick={() => navigate('/dashboard')}>Go Back</button>
      </form>
    </div>
    )
}

export default AddCarOwner;