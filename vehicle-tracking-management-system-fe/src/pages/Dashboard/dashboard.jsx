import React from "react";
import './dashboard.css';
import Sidebar from "../../components/Sidebar/sidebar";
import Table from "../../components/Table/table";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } catch (e) {
            toast.error(e.message);
        }
    }, [])
    return (
        <div className="dashboard">
                <Sidebar className="sidebar"/>
                <div className="main-container">
                    <p className="text-center py-3 ">Welcome back Admin, <span style={{fontWeight: 'bold'}}>{user?.firstName}</span></p>
                    <Table/>
                </div>
        </div>
    )
}
export default Dashboard;