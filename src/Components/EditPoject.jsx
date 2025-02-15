import React, { useContext } from 'react'
import { MdOutlineEdit } from "react-icons/md";
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { editProjectContextResponse } from '../ContextAPI/ContextShare';
import { editProjectAPI } from '../services/allAPIs';
import { serverUrl } from '../services/serverUrl';


function EditPoject({ project }) {


  const { editContext, setEditContext } = useContext(editProjectContextResponse)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImg: ""
  })

  const [preview, setPreview] = useState("")



  //Edit Api function
  //function ADdProject
  const handleEditProject = async () => {
    console.log(projectDetails);

    const { id, title, language, github, website, overview, projectImg } = projectDetails

    //API call
    const reqBody = new FormData()
    reqBody.append("id", id)
    reqBody.append("title", title)
    reqBody.append("language", language)
    reqBody.append("github", github)
    reqBody.append("website", website)
    reqBody.append("overview", overview)
    reqBody.append("projectImg",projectImg)

    const token = sessionStorage.getItem("token")
    console.log(token);

    if (token) {

      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }

      try {
        const response = await editProjectAPI(id, reqBody, reqHeader)
        console.log(response);

        if (response.status == 200) {
          Swal.fire({
            title: "project Updated Successfully",
            icon: "success",
            draggable: true
          });
          handleClose()
          setEditContext(response.data)
          

        }

        else {
          alert(response.response.data)
        }

      }

      catch (err) {
        console.log(err);

      }

    }


  }




  //Image file to url convertion
  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    }
  }, [projectDetails.projectImg])



  return (
    <div>
      <MdOutlineEdit className='fs-1 me-4' onClick={handleShow} />






      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>project Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <div className="row">

            <div className="col-12 col-md-6">


              <label>
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: "none" }} />
                <img src={preview ? preview : `${serverUrl}/uploads/${project.projectImg}`} alt="" width={'100%'} className='mt-5' />
              </label>
              <p>Only allowed the following filetypes <span style={{ color: "skyblue" }}>.jpg,.jpeg,.png</span></p>



            </div>
            <div className="col-12 col-md-6 p-4">

              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3 rounded shadow"
              >
                <Form.Control value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>



              <FloatingLabel
                controlId="floatingInput"
                label="Language"
                className="mb-3 rounded shadow"
              >
                <Form.Control value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>




              <FloatingLabel
                controlId="floatingInput"
                label="Github"
                className="mb-3 rounded shadow"
              >
                <Form.Control value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>



              <FloatingLabel
                controlId="floatingInput"
                label="Website"
                className="mb-3 rounded shadow"
              >
                <Form.Control value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>



              <FloatingLabel controlId="floatingTextarea2" label="Overview" className='rounded shadow'>
                <Form.Control
                  value={projectDetails.overview}
                  onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>



            </div>

          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="primary" onClick={handleEditProject}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditPoject