import React, { useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    
  } from 'mdb-react-ui-kit';
  import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
  import { FaSquareGithub } from "react-icons/fa6";
  import { FaLink } from "react-icons/fa6";
import { serverUrl } from '../services/serverUrl';


function ProjectCard({project}) {

    // console.log(project);
    

    const [centredModal, setCentredModal] = useState(false);

    const toggleOpen = () => setCentredModal(!centredModal);
  
  return (
    <div className='ms-md-5'>


<MDBCard onClick={toggleOpen} style={{width:"400px"}} className=''>
      <MDBCardImage src={project ? `${serverUrl}/uploads/${project.projectImg}` : 'https://img.freepik.com/free-vector/connecting-teams-concept-landing-page_23-2148303070.jpg?semt=ais_hybrid'} height={'300px'} position='top' alt='prject Image' />
      <MDBCardBody>
        <MDBCardTitle>{project.title}</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <center><MDBBtn href='#'>Button</MDBBtn></center>
      </MDBCardBody>
    </MDBCard>





    <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)} >
        <MDBModalDialog centered size='lg'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{project.title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <div className="row" style={{height:"400px"}}>
                    <div className="col " >
                        <MDBCardImage src={project ? `${serverUrl}/uploads/${project.projectImg}` : 'https://cdn.dribbble.com/users/4479253/screenshots/14600181/media/279eef6cef0ca1a9fd919bacfedd7d04.png?resize=400x300&vertical=center'} style={{width:"400px"}} />
                    </div>
                    <div className="col">
                    <h3>Description</h3>
              <p>
               {project.overview}
              </p>

              <h3>Technologies</h3>
              <p>{project.language}</p>
              <br />
              <h3>View on</h3>


              <MDBBtn className=' me-1' color='secondary'> <a href={project.github}> <FaSquareGithub className='fs-1' /> </a>   </MDBBtn>
              
              
               <MDBBtn color='secondary'> <a href={project.website}>< FaLink className='fs-1' /></a> </MDBBtn>
                    </div>


                </div>
              
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>



    </div>
  )
}

export default ProjectCard