import React, { useContext, useEffect, useState } from 'react'
import UserProfile from '../Components/UserProfile'
import AddProjects from '../Components/AddProject'
import ViewProject from '../Components/ViewProject'
import {AuthContextResponse} from '../ContextAPI/AuthContext'

function Dashboard() {
  //To store username from the session stotage
  const [userName,setUserName] = useState("")

    const {isAuthorized,setIsAuthorized} = useContext(AuthContextResponse)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
  }
  else{
      setIsAuthorized(false)
  }
    setUserName(sessionStorage.getItem("username"))
  },[isAuthorized])
console.log(isAuthorized);


  return (
    <div>
      <div className="row p-5" >
        <h2>Welcome {userName}</h2>
      </div>


      <div className="row p-3">
        <div className="col-12 col-md-8">

          <div className="row">
            <div className="col-12 col-md-6 p-3">
              <h3>My Projects</h3>
            </div>
            <div className="col-12 col-md-6">
              <AddProjects/>
            </div>
          </div>

          <div className="row" style={{height:"auto"}}>
            <ViewProject/>
          </div>

        </div>

        <div className="col-12 col-md-4 p-3">
          <UserProfile/>
        </div>

      </div>
    </div>
  )
}

export default Dashboard