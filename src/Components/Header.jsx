import React, { useContext } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
  } from 'mdb-react-ui-kit';
  import { GrCloudComputer } from "react-icons/gr";
import { AuthContextResponse } from '../ContextAPI/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate()

const {isAuthorized,setIsAuthorized} = useContext(AuthContextResponse)

const handleLogOut =()=>{
  sessionStorage.clear()
  navigate('/login')
  window.location.reload()
}

  return (
    <>
   <MDBNavbar light bgColor='' style={{padding:"10px", color:"#F8EEE7", backgroundColor:"#49274A"}} >
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            {/* <img
              src='file:///C:/Users/VICTUS/Downloads/undraw_coding_joxb.svg'
              height='30'
              alt=''
              loading='lazy'
            /> */}

{/* <GrCloudComputer /> */}
            <h4 style={{color:"lightgray"}}>  ProjectFair</h4>

            
          </MDBNavbarBrand>
          {
            isAuthorized ?  <button onClick={handleLogOut} className='btn btn-danger ' style={{height:"40px", paddingBottom:"0px"}}>Logout</button> : ""
            
          }
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Header