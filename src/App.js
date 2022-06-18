import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './component/Profile'
import Register from './component/Register';
import VerifyEmail from './component/VerifyEmail';
import Login from './component/Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './component/AuthContext'
import {auth} from './component/firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './component/PrivateRoute'
import {Navigate} from 'react-router-dom'
// import Admin from './component/Admin';
function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      {/* <Admin /> */}
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }/>
          
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

export default App;
