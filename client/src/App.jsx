import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from 'react'
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import About from "./pages/About.jsx"
import Header from "./components/Header.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    {/* Header component */}
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
