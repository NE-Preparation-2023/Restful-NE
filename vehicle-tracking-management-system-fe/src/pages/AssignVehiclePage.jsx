import axios from "axios";
import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

const Assign = () => {

    const navigate = useNavigate();

    const {vehicleId} = useParams();
    const [carOwners, setCarOwners] = useState([]);
    const [selectedCarOwnerId, setSelectedCarOwnerId] = useState('');

    useEffect(() => {
        axios.get("http://localhost:9000/carOwner")
        .then(res => {
            setCarOwners(res.data.carOwners);
        })
        .catch(error => {
            console.error("Error fetching car owners", error);
        })
    }, [])

    const assignVehicleToCarOwner = () => {
        const selectedCarOwnerId = document.querySelector("select").value;
        axios.put( `http://localhost:9000/carOwner/${vehicleId}/${selectedCarOwnerId}`)
        .then((res) => {
            console.log("Vehicle assigned to car owner successfully");
            navigate('/dashboard');
        })
        .catch((error) => {
            console.error("Error assigning vehicle to car owner", error);
        })
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="h1 text-center">Assign Vehicle</h1>
            <select className="form-select form-select-md w-25 mb-4" value={selectedCarOwnerId} onChange={(e) => setSelectedCarOwnerId(e.target.value)}>
                <option value="">Select Car Owner</option>
               {carOwners.map((carOwner) => (
                    <option key={carOwner.id} value={carOwner._id}>
                        {carOwner.ownerNames}
                    </option>
                ))}
            </select>
            <button className="btn btn-success w-25" onClick={assignVehicleToCarOwner}>Assign</button>
            <button className="btn btn-transparent" onClick={() => navigate('/dashboard')}>Go Back</button>
        </div>
    )
}

export default Assign;