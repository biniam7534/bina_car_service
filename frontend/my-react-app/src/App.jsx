//
import './App.css'
// import the router from react-router-dom
import { Routes, Route } from "react-router-dom";
// import the page components
import Home from './pages/Home';
import Login from './pages/Login';
import AddEmployee from './pages/Add-employee';

function App() {
  return (
    <div className='App'>
       <h1>Welcome to the Car Service App</h1>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/add-employee" element={<AddEmployee />} />
       </Routes>
    </div>

  );
}

export default App
