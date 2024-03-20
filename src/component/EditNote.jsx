import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosService from '../common/Apiservice';
import {toast} from 'react-toastify';
import useLogout from '../Hooks/useLogout';
import { useNavigate, useParams } from 'react-router-dom';
function EditNote() {
  let [title ,setTitle]=useState('');
  let [description,setDescription]=useState('');
  let navigate =useNavigate();
  let logout =useLogout();
  let params=useParams();

  let handleEdit =async()=>{
        try {
             let res = await AxiosService.put(`/notes/edit/${params.id}`,{
                title,
                description
             }) 

             if(res.status==200){
                  toast.success(res.data.message);
                  navigate('/dashboard')
             }
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            if(error.response.status==401){
              logout();
            }
        }
  } 


  let getnote=async()=>{
         try {
              
          let res = await AxiosService.get(`/notes/${params.id}`)
               if(res.status==200){
                   setTitle(res.data.note.title);
                   setDescription(res.data.note.description);
               }

         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            if(error.response.status==401){
              logout();
            }
         }
  }

  useEffect(()=>{
    if(params.id){
        getnote();
    }else{
         logout();
    }
  },[])

  return <>
          <div className='container'>
                <h3 className='text-center mt-3' style={{color:'navy'}}>Edit Note</h3>
                <hr />
             <div className='container-fluid rounded-4 p-4' style={{width:'100%',backgroundColor:'white'}}>
                <Form>
                  <Form.Group className="mb-3" >
                    <Form.Label className="form-label h5 mb-3"  style={{color:'navy'}}>Title</Form.Label>
                    <Form.Control type="text" className="form-control" value={title} placeholder="Enter title" required onChange={(e)=>setTitle(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label className="form-label h5 mb-3" style={{color:'navy'}}>Enter your Note</Form.Label>
                    <Form.Control as="textarea" rows={3} className="form-control" value={description} placeholder='Take a note...' required onChange={(e)=>setDescription(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Button onClick={(e)=>handleEdit(e)} style={{backgroundColor:'navy',border:'1px solid navy'}}>Edit</Button>
                  </Form.Group>
                </Form>
             </div>
      </div>
  
  </>
}

export default EditNote