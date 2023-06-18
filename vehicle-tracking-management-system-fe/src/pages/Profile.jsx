import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

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
        <div className="profile" style={styles.container}>
            <h2>Welcome {user?.firstName}!</h2>
        </div>
    )
}
const styles ={
    container: {
        fontFamily: "Roboto, sans-serif",
    }
}
export default Profile;