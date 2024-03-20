import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import AxiosService from '../common/Apiservice';
import { toast } from 'react-toastify';
import { CgNotes } from "react-icons/cg";

function ForgetPassword() {

    const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
 
  const forgetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when the request starts

      let res = await AxiosService.post('/user/forget-password', {
        email
      });

      if (res.status === 200) {
        toast.success('Reset link sent the email.please check your email');
      }
      
    } catch (error) {
        
      if (error.response && error.response.status === 400) {
        toast.error("Invalid token or token has expired. Please request a new reset link.");
      } else {
        console.log(error);
        toast.error('Invalid email');
      }

    } finally{
         setLoading(false)
    }
  };
  return <>
    <>
      <div className='container' style={{ height: '100vh'}}>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
          <div className='container-fluid p-4 rounded-4 shadow' style={{ maxWidth: '400px' ,backgroundColor:'#fff' }}>
                <div>
                    <h3 className='text-center' style={{fontFamily:"sans-serif",color:"navy"}}> <CgNotes size={"24px"} className='mb-1 mx-2'/>Notes App</h3>
                </div>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control type="email" className="form-control" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Button className='btn  w-100 mt-3' onClick={(e) => forgetPassword(e)} disabled={loading} style={{backgroundColor:"navy", border:"1px solid navy"}}>
                    {
                       loading ? <Spinner animation='border' size='sm' ></Spinner> : 'Forget Password'
                    }
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  
  </>
}

export default ForgetPassword
