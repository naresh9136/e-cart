import {Redirect,Route} from "react-router-dom"


const LoginProtected =(props)=>{
    const token = localStorage.getItem("token")
    if(token===undefined){
        return <Redirect to="/" /> 
      }
    
    return <Route {...props} />
}

export default LoginProtected