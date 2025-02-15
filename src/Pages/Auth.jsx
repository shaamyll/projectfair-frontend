import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPIs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({register}) { 


  const navigate = useNavigate()


  //To hold username,email,password
  const [userDetails,setUserdetails]=useState({
    username:"",
    email:"",
    password:""
  })


  const handleregister=async()=>{
    console.log(userDetails);

    const {username,email,password}=userDetails
    if(!username||!email||!password){
      
      Swal.fire({
        title: "Please Fill the Form",
        icon: "error",
        draggable: true
      });
    }
    else{
      //API fetching
     try{
      const response = await registerAPI(userDetails)
      console.log(response);
      if(response.status==200){

        Swal.fire({
          title: response.data,
          icon: "success",
          draggable: true
        });

          setTimeout(()=>{
            navigate('/login')

          },6000)


      }
      else{
        Swal.fire({
          title: "Invalid User Details",
          icon: "error",
          draggable: true
        });
      }
     }
     catch(err){

     }
      
    }
    
  }








  const handleLogin = async()=>{
    console.log(userDetails);
    

    const {email,password}=userDetails
    if(!email||!password){
      
      Swal.fire({
        title: "Please Fill the Form",
        icon: "error",
        draggable: true
      });
    }
    else{
     try{

            //API fetching

      const response = await loginAPI(userDetails)
      console.log(response);

      if(response.status==200){

        Swal.fire({
          title: "Login Successfull",
          icon: "success",
          draggable: true
        });

        navigate('/dashboard')

       

          sessionStorage.setItem("username",response.data.currentUser.username)
          sessionStorage.setItem("token",response.data.token)

      }
      else{
        toast.error(response.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
     }
     catch(err){
        console.log(err);


     }
      
    }



    
  }
  return (
    <div >
        <div className="row" style={{ height:"auto", marginBottom:"100px"}}>
             <div className="col-12 col-md-6 ps-5" style={{marginTop:"70px" }}>
             <img src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg" alt=""  style={{width:"100%" }}/></div>
             <div className="col-12 col-md-6 " style={{marginTop:"170px" }}>
                 <center>
                 <h3>Sign{
                  register ? "Up" : "In"
                          }
                 </h3>

                    {
                      register && <input onChange={e=>setUserdetails({...userDetails,username:e.target.value})} type='text' placeholder='Username' className='form-control rounded shadow w-75 mb-4'/>
                    }

                <input onChange={e=>setUserdetails({...userDetails,email:e.target.value})} type="Email" placeholder='email' className='form-control rounded shadow mb-4 w-75' />

                <input onChange={e=>setUserdetails({...userDetails,password:e.target.value})} type="password" placeholder='password' className='form-control rounded shadow mb-5 w-75' />
                
                 </center>

               {
                register ? 
                <center>
                <div>
                <button onClick={handleregister} className='btn btn-primary'>SignUp</button>
                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                </div>
               </center>
               : 
               <center>
               <div>
               <button onClick={handleLogin}  className='btn btn-primary'>SignIn</button>
               <p>Already have an account? <Link to={'/register'}>Register</Link></p>
               </div>
              </center>
               }

             </div>

             <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover

/>
        </div>
    </div>
  )
}

export default Auth