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
   <MDBNavbar light bgColor='dark' style={{padding:"8px"}} >
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>
            {/* <img
              src='https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.webp'
              height='30'
              alt=''
              loading='lazy'
            /> */}
            <h4 style={{color:"white"}}><GrCloudComputer />  ProjectFair</h4>

            
          </MDBNavbarBrand>
          {
            isAuthorized ?  <button onClick={handleLogOut} className='btn btn-danger'>Logout</button> : ""
            
          }
        </MDBContainer>
      </MDBNavbar>
    </>
  )
}

export default Header