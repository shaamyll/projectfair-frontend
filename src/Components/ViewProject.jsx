import React, { useContext, useEffect, useState } from 'react'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPIs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaSquareGithub } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { addProjectContextResponse, editProjectContextResponse } from '../ContextAPI/ContextShare';
import EditPoject from './EditPoject';

function ViewProject() {

    const {editContext,setEditContext} = useContext(editProjectContextResponse)
  
  const {addProjectContext,setAddProjectContext} = useContext(addProjectContextResponse)


  const [token,setToken] = useState("")


  const [projectDetails,setProjectDetails] = useState({})


  const getUserPoject = async()=>{
    if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      console.log(reqHeader);

      const response = await getUserProjectAPI(reqHeader)
      console.log(response);

      setProjectDetails(response.data)
      
      
  }
}



const handleDelete = async(projectId)=>{
  if(token){
    const reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
  try{
    const deleteProject = await deleteProjectAPI(projectId,reqHeader)
    console.log(deleteProject);
    alert("Project deleted")
    window.location.reload()
  }
  catch(err){
    console.log(err);
    
  }
}
}


useEffect(()=>{
  setToken(sessionStorage.getItem("token"))
  getUserPoject()
},[token,addProjectContext,editContext])


  return (
    <div>

    
    <div className="row mt-4 mb-5 me-5 ms-3">


    {
      projectDetails.length>0 ? projectDetails.map(project => (
        <Card className='mb-4'>
        <Card.Header>language: {project.language}</Card.Header>
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>
           {project.overview} 
           
          <div className='d-flex ' style={{float:"right"}}> 

          <EditPoject project={project}/>
           

           <a href={project.github}> <FaSquareGithub className='fs-1'  /> </a>

           <a href={project.website}>< FaLink className='fs-1 ms-4' /></a>

          </div>
           


          </Card.Text>
          <Button onClick={()=>handleDelete(project._id)} variant="primary">Delete </Button>
        </Card.Body>
      </Card>
      )) : "No projects"
    }



    </div>




    
  


    </div>
  )
}

export default ViewProject