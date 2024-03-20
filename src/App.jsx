import { BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "./component/Dashboard"
import CreateNote from "./component/CreateNote"
import EditNote from "./component/EditNote"
import Signup from "./component/Signup"
import Login from "./component/Login"
import Header from "./component/Header"
import Forgetpassword from "./component/Forgetpassword"
import ResetPassword from "./component/ResetPassword"


function App() {
  

  return (
    <>
      <BrowserRouter>
       <Routes>
           <Route path='/dashboard'  element={<><Header/><Dashboard/></>}/>
           <Route path='/create' element={<><Header/><CreateNote/></>} />
           <Route path='/edit/:id' element={<><Header/><EditNote/></>} />
           <Route path='signup'  element={<Signup/>}/>
           <Route path='/forgetpassword' element={<Forgetpassword/>}/>
           <Route path='/resetpassword' element={<ResetPassword/>} />
           <Route path='/' element={<Login/>}  />
           <Route path='/*' element={<Login/>} />
       </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
