// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import AxiosService from '../common/Apiservice';
// import Card from 'react-bootstrap/Card';

// function Note() {
//          let [title,setTitle]=useState('');
//          let [description,setDescription]=useState('');
//          let params=useParams();  
              
           
//           let getnote=async()=>{
//               try {
//                   let res =await AxiosService.get(`/notes/${params.id}`)
                      
//                       setTitle(res.data.note.title)
//                       setDescription(res.data.note.description)

//               } catch (error) {
//                 console.log(error);
//                 toast.error(error.response.data.message);
//                 if(error.response.status==401){
//                   logout();
//                 }
//               }
//           }

     
//       useEffect(()=>{
//         if(params.id){
//             getnote();
//         }else{
//              logout();
//         }
//       },[])

//   return <>
//        <Card style={{ width: '18rem' }}>
//             <Card.Body>
//                 <div className='d-flex justify-content-between mb-3'>
//                     <Card.Title>{title}</Card.Title>
//                         {/* <div>
//                         <FiEdit size={20} color='green' /> &nbsp;
//                         <MdOutlineDeleteOutline size={25} color='crimson' onClick={()=>handleDelete(e._id,index)}/>
//                         </div> */}
//                 </div>
//                 <Card.Text>
//                  {description}
//                 </Card.Text>
//             </Card.Body>
//           </Card>
  
//   </>
// }

// export default Note



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosService from '../common/Apiservice';
import Card from 'react-bootstrap/Card';

function Note() {
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let params = useParams();

    let getNote = async () => {
        try {
            let res = await AxiosService.get(`/notes/${params.id}`);
            setTitle(res.data.note.title);
            setDescription(res.data.note.description);
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    useEffect(() => {
        if (params.id) {
            getNote();
        } else {
            // Handle logout or other action
        }
    },[]);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '25rem' }}>
                <Card.Body>
                    <div className='d-flex justify-content-between mb-3'>
                        <Card.Title>{title}</Card.Title>
                        {/* <div>
                            <FiEdit size={20} color='green' /> &nbsp;
                            <MdOutlineDeleteOutline size={25} color='crimson' onClick={() => handleDelete(e._id, index)} />
                        </div> */}
                    </div>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Note;
