// ROUTES
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Login from './pages/Login'
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <CursorManager />
          <Routes>
            <Route path="/letters" element={<Letters />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/music" element={<Music />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
