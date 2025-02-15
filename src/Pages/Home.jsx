import React, { useContext, useEffect, useState } from 'react'
import '../Pages/Home.css'
import { GrCloudComputer } from "react-icons/gr";
import { Link } from 'react-router-dom';
import ProjectCard from '../Components/ProjectCard';
import { getHomeProjectAPI } from '../services/allAPIs';
import { AuthContextResponse } from '../ContextAPI/AuthContext';

function Home() {


  //Hold token from session storage
  const [token,setToken]=useState("")

    const {isAuthorized,setIsAuthorized} = useContext(AuthContextResponse)

  const[homeProject,setHomeProject] = useState([])

  const getHomeproject = async()=>{
    const response = await getHomeProjectAPI()
    console.log(response);
    if(response.status == 200){
    setHomeProject(response.data)
  }
}

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
    }
    else{
      setIsAuthorized(false)
    }
    getHomeproject()
  },[isAuthorized])


  return (
    <div className='continer' style={{height:"auto"}}>
    <div className='row mb-5' style={{height:"100%"}}>
      <div className="get col-12 col-md-6 " >
        <center><h3> PROJECT FAIR</h3><br />
        <h5>"Every project is an opportunity to learn, to figure out problems and challenges, to invent and reinvent</h5>
        <br />

{
  isAuthorized ?
  <Link to={'/dashboard'}>
  <button className='btn btn-dark  rounded shadow' style={{padding:"5px"}}>View Dashboard</button>
  </Link>

      :

       <Link to={'/login'}>
       <button className='btn btn-dark  rounded shadow' style={{padding:"5px"}}>Get Started</button>
       </Link>
}



        </center>
      </div>
      <div className="pic col-12 col-md-6 pe-md-5">
        <img src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg" alt="" className=' ' style={{width:"100%", height:"400px", borderRadius:"5%"}}/>
      </div>
      {/* https://png.pngtree.com/png-vector/20240723/ourlarge/pngtree-software-developer-in-colored-design-png-image_12964470.png */}
      {/* https://img.lovepik.com/png/20231129/code-symbol-illustration-technology-internet-developer_722173_wh860.png */}
    </div><br />



    <div className='mb-4'>
      <h3 className='text-center'>Explore Projects..</h3>
      <div className="row p-2" >


        
        {

          homeProject.length>0 ? homeProject.map(
            project => (
              <div className="col-12 col-md-4 " >
          <ProjectCard project = {project}/>
        </div>
            )
          ): "no projects"

        } 



      </div>

      <center>

      {
        isAuthorized ? 
        <Link to={'/Projects'}>
<button  className='btn btn-dark mb-5 mt-5'>View Project</button>
</Link> 
:
""
      }

      </center>
    </div>





    </div>
  )
}

export default Home