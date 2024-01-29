import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from "./components/ListEmployeeComponent.jsx";
import CheckboxComponent from "./components/CheckboxComponent.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <ListEmployeeComponent />

        <CheckboxComponent />
    </>
  )
}

export default App
