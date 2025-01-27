import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home/Home";
import AddNewUser from "./pages/AddUser/AddUser";
import Edit from "./pages/Edit/Edit";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className='main'>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-user' element={<AddNewUser />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
