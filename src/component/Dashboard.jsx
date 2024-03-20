import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import AxiosService from '../common/Apiservice';
import {toast} from 'react-toastify';
import useLogout from '../Hooks/useLogout';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Dashboard() {
      let [notes,setnotes]=useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      let navigate =useNavigate();
      let logout =useLogout();


  
      let handleDelete= async(id,index)=>{

            let newArray=[...notes];
                newArray.splice(index,1);
                setnotes(newArray);
           try {
               let res =await AxiosService.delete(`/notes/delete/${id}`);
              if(res.status==200){
                  getNotes();
                  toast.success(res.data.message)
              }
           } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
           }
      }


      let getNotes=async()=>{
            try {
                let res = await AxiosService.get('/notes/user');
                console.log(res);
                if(res.status==200){
                        setnotes(res.data.notes)
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
            getNotes();
      },[])

      const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
      
  return <>
        <div className='container'>
             <h3 className='text-center mt-3' style={{color:'navy'}}>My Notes</h3>
                 <hr />
                 <input
                        type="text"
                        className="form-control mt-3 mb-3"
                        placeholder="Search your title..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                 />
                  <div className='row'>
                     <div className='col d-flex justify-content-center flex-wrap'>
                     {
                    filteredNotes.map((e,index)=>{
                       return  <div key={e._id}  className=' card-group  col-12 col-lg-5 col-md-5 p-2' >
                           <Card  className='shadow' >
                       <Card.Body>
                            <div className='d-flex justify-content-between mb-3'>
                                <Card.Title>{e.title}</Card.Title>
                                 <div>
                                  <FiEdit size={20} color='green' onClick={()=>navigate(`/edit/${e._id}`)}/> &nbsp;
                                  <MdOutlineDeleteOutline size={25} color='crimson' onClick={()=>handleDelete(e._id,index)}/>
                                 </div>
                            </div>
                         <Card.Text>
                            {e.description}
                         </Card.Text>
                        </Card.Body>
                        </Card>
                       </div>
                    })
                  }
                     </div>
                  </div>
          
        </div>
  </>
}

export default Dashboard