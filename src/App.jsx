import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AddEmployeeComponent from "./components/AddEmployeeComponent.jsx";


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path='/' element={<ListEmployeeComponent/>}></Route>

                    <Route path='/employees' element={<ListEmployeeComponent/>}></Route>

                    <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>

                    <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>}></Route>

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App
