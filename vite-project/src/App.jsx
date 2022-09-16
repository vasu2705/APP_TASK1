import React, { createContext, useReducer } from "react";
import {Route,Routes} from 'react-router-dom'
import Admin from "./components/Admin"
import User from './components/User'
import Transcation from './components/Transcation'
import Signin from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Logout from './components/Auth/Logout'
import Forgot from "./components/Auth/Forgot";
import { initialState, reducer } from "./reducer/UseReducer";
export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
     <Routes>
       <Route exact path="/" element={<Admin/>}/>
       <Route exact path="/user" element={<User/>}/>
       <Route exact path='/Transcation' element={<Transcation/>}/>
       <Route exact path='/auth/signup' element={<Signup/>}/>
       <Route exact path='/auth/login' element={<Signin/>}/>
       <Route exact path='/auth/logout' element={<Logout/>}/>
       <Route exact path ="/auth/forgot" element={<Forgot/>}/>
     </Routes>
     </UserContext.Provider>
    </div>
  )
}

export default App
