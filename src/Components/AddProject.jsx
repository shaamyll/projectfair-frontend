import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addprojectAPI } from '../services/allAPIs';
import { addProjectContextResponse } from '../ContextAPI/ContextShare';



function AddProject() {

  const { addProjectContext, setAddProjectContext } = useContext(addProjectContextResponse)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImg: ""
  })

  const [preview, setPreview] = useState("")



  //function AddProject
  const handleAddProject = async () => {
    console.log(projectDetails);

    const { title, language, github, website, overview, projectImg } = projectDetails
    if (!title || !language || !github || !website || !overview || !projectImg) {
      Swal.fire({
        title: "Please Fill the Form",
        icon: "error",
        draggable: true
      });
    }
    else {
      //API call
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")
      console.log(token);

      if (token) {

        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        try {
          const response = await addprojectAPI(reqBody, reqHeader)
          console.log(response);
          setAddProjectContext(response.data)

          if (response.status == 200) {
            Swal.fire({
              title: "project Added Successfully",
              icon: "success",
              draggable: true
            });

            handleClose()

            setProjectDetails({
              title: "",
              language: "",
              github: "",
              website: "",
              overview: "",
              projectImg: ""
            })
            setPreview("")
          }

          else {
            alert(response.response.data || "An error occured")
          }

        }

        catch (err) {
          console.log(err);

        }

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
      <Button className='btn-dark' onClick={handleShow}>
        Add Project
      </Button>

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
                <img src={preview ? preview : "https://static.vecteezy.com/system/resources/previews/011/153/363/non_2x/3d-web-developer-working-on-project-illustration-png.png"} alt="" width={'100%'} className='mt-5' />
              </label>
              <p>Only allowed the following filetypes <span style={{ color: "skyblue" }}>.jpg,.jpeg,.png</span></p>



            </div>
            <div className="col-12 col-md-6 p-4">

              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-3 rounded shadow"
              >
                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>



              <FloatingLabel
                controlId="floatingInput"
                label="Language"
                className="mb-3 rounded shadow"
              >
                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>




              <FloatingLabel
                controlId="floatingInput"
                label="Github"
                className="mb-3 rounded shadow"
              >
                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>



              <FloatingLabel
                controlId="floatingInput"
                label="Website"
                className="mb-3 rounded shadow"
              >
                <Form.Control onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} type="text" placeholder="name@example.com" />
              </FloatingLabel>



              <FloatingLabel controlId="floatingTextarea2" label="Overview" className='rounded shadow'>
                <Form.Control
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
          <Button onClick={handleAddProject} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject