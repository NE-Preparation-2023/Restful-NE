import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/signup';
import Dashboard from './pages/Dashboard/dashboard';
import Login from './pages/Login/login';
import AddVehicle from './pages/AddVehicle';
import Profile from './pages/Profile';
import { ProtectedRoute, PublicRouteChecker } from './components/ProtectedRoute';
import Assign from './pages/AssignVehiclePage';
import AddCarOwner from './pages/AddCarOwner';

function App() {
  const roles = ['admin', 'user']
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute role='admin' element={Dashboard} />} />
        <Route path='/' element={<PublicRouteChecker roles={roles} element={Signup} />} />
        <Route path='/login' element={<PublicRouteChecker roles={roles} element={Login} />} />
        <Route path='/addVehicle' element={<ProtectedRoute role='admin' element={AddVehicle} />} />
        <Route path='/profile' element={<ProtectedRoute role='admin' element={Profile} />} />
        <Route path='/assignVehicle/:vehicleId' element={<ProtectedRoute role="admin" element={Assign}/>}/>
        <Route path='/addCarOwner' element={<ProtectedRoute role="admin" element={AddCarOwner}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
