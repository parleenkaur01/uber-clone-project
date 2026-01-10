import React,{useContext} from 'react'
import {Routes,Route} from 'react-router-dom';
import Start from './pages/Start.jsx';
import CaptainSignUp from './pages/CaptainSignup';
import CaptainLogin from './pages/Captainlogin.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import { UserDataContext } from './context/UserContext.jsx';
import Home from './pages/Home.jsx';
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import CaptainLogout from './pages/CaptainLogout.jsx';
import Riding from './pages/Riding.jsx';
import CaptainRiding from './pages/CaptainRiding.jsx';
import 'remixicon/fonts/remixicon.css'


const App=()=>{

  const ans = useContext(UserDataContext)
  console.log(ans);
  return(
    <div>
      <Routes>
        <Route  path ='/' element={<Start />} />
        <Route path ='/login' element ={<UserLogin />} />
        <Route path ='/riding' element ={<Riding />} />
        <Route path ='/captain-riding' element ={<CaptainRiding />} />
        <Route path ='/signup' element ={<UserSignup />} />
        <Route path ='/captain-login' element ={<CaptainLogin />} />
        <Route path ='/captain-signup' element ={<CaptainSignUp />} />
        <Route path='/home' element={ 
          
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper> 
        } />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path ='/captain/home' element ={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
          
          
          } />
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

      </Routes>
    </div>
  )
}

export default App