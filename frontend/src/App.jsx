import './App.css'
import RegistrationForm from './features/auth/RegistrationForm/RegistrationForm'
import { Routes, Route } from "react-router";
import LoginForm from './features/auth/LoginForm/LoginForm'

function App() {

  return (
    <Routes>
      <Route index element={ <RegistrationForm/>} />
      <Route path="/login" element={<LoginForm/>} />
    </Routes>
   
  )
}

export default App
