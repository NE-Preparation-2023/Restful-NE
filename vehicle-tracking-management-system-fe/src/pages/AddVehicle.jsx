import React, {useState} from "react";
import './Signup/signup.css';
import axios from "axios";
import { NavLink, useNavigate, Navigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const AddVehicle = () => {

    const navigate = useNavigate();

    const[chassisNumber, setChassisNumber] = useState('');
    const[manufacturer, setManufacturer] = useState('');
    const[manufactureYear, setManufactureYear] = useState('');
    const[price, setPrice] = useState('');
    const[modelName, setModelName] = useState('');
    const [loading, setLoading] = useState(false)


    // const handleGoBack = () => {
    //     return <Navigate to="/dashboard" />
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!chassisNumber || !manufacturer || !manufactureYear || !price || !modelName) {
            toast.error("Provide all fields");
            return;
        }
        setLoading(true);

        const vehicle = {
            chassisNumber: chassisNumber,
            manufacturer: manufacturer,
            manufactureYear: manufactureYear,
            price: price,
            modelName: modelName
        }
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:9000/vehicle/', vehicle, { headers: { Authorization: `Bearer ${token}` }, });
                toast.success("Successfully created your account")
                setChassisNumber('');
                setManufacturer('');
                setPrice('')
                setManufactureYear('');
                setModelName('');

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
                <h2>Register New Vehicle</h2>
                <div className="form-group">
                    {/* <label>First Name</label> */}
                    <input type="text" placeholder="Chassis Number" className="form-control" value={chassisNumber} onChange={(e) => setChassisNumber(e.target.value)} />
                </div>
                <div className="form-group">
                    {/* <label>Last Name</label> */}
                    <input type="text" placeholder="Manufacturer" className="form-control " value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
                </div>
                <div className="form-group">
                    {/* <label>Email</label> */}
                    <input type="number" placeholder="ManufacturerYear" className="form-control" value={manufactureYear} onChange={(e) => setManufactureYear(e.target.value)}/>
                </div>
                <div className="form-group">
                    {/* <label>Password</label> */}
                    <input type="number" placeholder="Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="form-group">
                    {/* <label>National Id</label> */}
                    <input type="text" placeholder="Model Name" className="form-control" value={modelName} onChange={(e) => setModelName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-submit" onClick={handleSubmit} style={{marginBottom: '20px'}}>{loading ? 'Registering Vehicle...' : 'Register Vehicle'}</button>
                <button className="btn btn-transparent" onClick={() => navigate('/dashboard')}>Go Back</button>
            </form>
        </div>
    )
};

export default AddVehicle;