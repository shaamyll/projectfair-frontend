import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { getAllUserProjectAPI } from '../services/allAPIs';
import ProjectCard from '../Components/ProjectCard';

function Projects() {

  const [searchkey,setSearchKey] = useState("")
  console.log(searchkey);
  

  const [token,setToken] = useState("")

  const [allUserProject,setAllUserProject] = useState([])

  const getAllUserProject = async()=>{
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      console.log(reqHeader);

      const response = await getAllUserProjectAPI(searchkey,reqHeader)
      console.log(response);
      setAllUserProject(response.data)

      console.log(allUserProject);

      
    }
  }

    

    useEffect(()=>{
      setToken(sessionStorage.getItem("token"))
      getAllUserProject()
    },[token,searchkey])

  return (
    <div className=' row ' style={{height:"100%"}}>
     <div className="col ms-5 mt-4" style={{height:"100%"}}>
     <h3>All Projects</h3>
     <br />
     </div>
   <div className='row w-50 mt-4 me-4' > 
   <div className="col-2">
   {/* <IoSearchOutline className='fs-3'  /> */}

   </div>
   <div className="col">
   <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search by Technology' className=' form-control rounded shadow' />
   </div>
   </div>
   
    

      <div className="row mb-5 mt-3" style={{height:"auto"}}>


        
{

  allUserProject.length>0 ? allUserProject.map(
    project => (
      <div className="col-12 col-md-4 " >
  <ProjectCard project = {project}/>
</div>
    )
  ): "no projects"

} 



</div>

    </div>
  )
}

export default Projects