import './App.css'
import RegistrationForm from './features/auth/RegistrationForm/RegistrationForm'

function App() {

  return (
    <provider store={store}>  

    <RegistrationForm/>
    </provider>
  )
}

export default App
