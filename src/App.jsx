import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                {/*// http://localhost:3000*/}

                <Routes>
                    <Route path='/' element={<ListEmployeeComponent/>}></Route>

                    {/*// http://localhost:3000/employees*/}
                    <Route path='/employees' element={<ListEmployeeComponent/>}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </>
    );


}

export default App
