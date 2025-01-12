import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function UserProfile() {
  const [open, setOpen] = useState(false);
  return (
    <div className='row '>
          <Button style={{float:"right"}}
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className='btn-dark w-75'
      >
        click
      </Button>
      <Collapse in={open} >
        <div id="example-collapse-text" style={{paddingTop:"60px"}} className='col-md-12   p-0'>
          <img style={{ marginLeft:"80px"}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" alt=""  width={'200px'}/>
          <input type="text" placeholder='Username' className='form-control rounded shadow mt-4 mb-3 w-75 w-md-100' />
          <input type="text" placeholder='Githublink' className='form-control rounded shadow mt-4 mb-3 w-75' />
          <input type="text" placeholder='Linkedin' className='form-control rounded shadow mt-4 mb-3 w-75' />

        </div>
      </Collapse>
    </div>
  )
}

export default UserProfile