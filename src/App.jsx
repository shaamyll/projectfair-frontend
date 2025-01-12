import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css'
import Header from './Components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';
import Footer from './Components/Footer';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {AuthContextResponse} from './ContextAPI/AuthContext'
import { useContext } from 'react';

function App() {

    const {isAuthorized,setIsAuthorized} = useContext(AuthContextResponse)


  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      {
        isAuthorized && 
        <>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>

        </>
      }
      <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
