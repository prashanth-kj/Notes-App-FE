import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../common/Apiservice';
import {toast} from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { CgNotes } from "react-icons/cg";
function Login() {
      
       let [email, setEmail]= useState('');
       let [password,setPassword]=useState('');
       let [loading,setLoading]=useState(false);
       let navigate =useNavigate();
        
      let handleLogin=async()=>{
         try {
               setLoading(true)
              let res= await AxiosService.post('/user/login',{
                email,
                password
              })
               console.log(res);
               if(res.status==201){
                    toast.success(res.data.message);
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('userData', JSON.stringify(res.data.userData))
                     navigate('/dashboard')
               }

         } catch (error) {
               toast.error(error.response.data.message)
         }finally{
            setLoading(false)
         }
      }

  return (
   <>
      <div className='container'  style={{height:'100vh'}}>
            <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                 <div className='container-fluid rounded-4 shadow p-4' style={{maxWidth:'400px', backgroundColor:"#fff"}}>
                    <div>
                        <h3 className='text-center' style={{fontFamily:"sans-serif",color:"navy"}}> <CgNotes size={"24px"} className='mb-1 mx-2'/>Notes App</h3>
                    </div>
                  <Form>
                      <Form.Group className="mb-3" >
                        <Form.Label className="form-label">Email address</Form.Label>
                        <Form.Control type="email" className="form-control" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
                      </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">Password</Form.Label>
                          <Form.Control type="password"  className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>

                        <Button  style={{background:'navy', border:'1px solid navy'}} className='mb-3 w-100' onClick={handleLogin}>
                          {
                            loading ? <Spinner animation='border' size='sm'/> : 'Login'
                          }
                        </Button>
                        <Form.Group className="mb-3 text-center">
                          <Form.Label><Link to={'/forgetpassword'} style={{textDecoration:"none" ,color:"navy"}}>ForgetPassword</Link></Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3 text-center">
                          <Form.Label className="form-label">Don't have an account? <Link to={'/signup'} style={{textDecoration:"none" ,color:"navy"}}>Signup</Link> </Form.Label>
                        </Form.Group>
                  </Form>
                 </div>
            </div>
      </div>
   </>
  )
}

export default Login