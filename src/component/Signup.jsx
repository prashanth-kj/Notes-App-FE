import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../common/Apiservice';
import {toast} from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function Signup() {
  let [name,setName]=useState('')
  let [email, setEmail]= useState('');
  let [password,setPassword]=useState('');
  let [loading,setLoading]=useState(false);
  let navigate =useNavigate();



    let handleCreate=async()=>{
          try {
                 setLoading(true);
               let res = await AxiosService.post('/user/signup',{
                   name,
                   email,
                   password
               })

                if(res.status==201){
                     toast.success(res.data.message);
                     navigate('/');
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
                 <div className='container-fluid rounded-4 shadow p-4' style={{maxWidth:'400px' ,backgroundColor:'#fff'}}>

                  <Form>
                    
                      <Form.Group className="mb-3" >
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control type="text" className="form-control" placeholder="Enter name"  onChange={(e)=>setName(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className="mb-3" >
                        <Form.Label className="form-label">Email address</Form.Label>
                        <Form.Control type="email" className="form-control" placeholder="Enter email"  onChange={(e)=>setEmail(e.target.value)}/>
                      </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label className="form-label">Password</Form.Label>
                          <Form.Control type="password"  className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>

                        <Button  className='mb-3 w-100' onClick={handleCreate} style={{backgroundColor:'navy' ,border:'1px solid navy'}}>
                          {
                            loading ? <Spinner animation='border' size='sm'/> : 'Submit'
                          }
                        </Button>

                        
                  </Form>
                 </div>
            </div>
      </div>
   </>
  )
}

export default Signup