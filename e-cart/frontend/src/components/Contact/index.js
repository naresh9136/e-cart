import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../Navbar';
import "./index.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


function Contact() {

    const [username,setUsername] = useState("")
    const [description,setDescription] = useState("")
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState([])

  const history = useHistory()


    useEffect(()=>{
      getUser()
    },[])

    const onChangeDescription=(e)=>{
        setDescription(e.target.value)
    }

    const onChangeName=(e)=>{
        setUsername(e.target.value)
    }

    const onSubmit=async(e)=>{
      e.preventDefault()
      setLoading(true)
    const options = {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-auth-token":localStorage.getItem("token"),
      },
      body:JSON.stringify({feedback:description}),
    }
    const response  = await fetch("/api/feedback",options)
    const data = await response.json()
    if(response.ok===true){
      console.log(data)
      setLoading(false)
      setSuccess("Feedback Sent!!")
      setError("")
    }else{
      console.log(data)
      setError("Only Characters Required")
      setSuccess("")
    }
    setLoading(false)
    setDescription("")
    //setName("")
   // setPassword("")
  }

    const getUser=async()=>{
      const options = {
        method:"GET",
        headers:{
          "x-auth-token":localStorage.getItem("token"),
        }
      }
      const response  = await fetch("/api/auth",options)
      const data = await response.json()
      if(response.ok===true){
        // console.log(data)
        setUser(data)
      }else{
        console.log(data)
      }
    }

    const getFeedbacks=()=>{
      history.replace("/feedbacks")
      window.location.reload()
    }

  return (
    <div>
        <Navbar />
        <div className='contact-container'>
            <h3>Feedback</h3>
            <form onSubmit={onSubmit}>
            {loading&&(
              <h6>Loading...</h6>
            )}
            <div>
              <input
                type="text"
                name="name"
                className='input-field'
                placeholder='Name'
                value={user.name}
                onChange={onChangeName}
                required
              />
            </div>
            <div>
                <textarea className='description-class' placeholder='Description' pattern="[A-Za-z0-9]+" value={description}
                onChange={onChangeDescription}
                required></textarea>
                {/* type="textarea"
                name="textarea"
                className='description-class'
                placeholder='Description'
                value={description}
                onChange={onChangeDescription}
                required */}
            </div>
            {error&&(
              <span>{error}</span>
            )}
             {success&&(
              <span className='success-msg'>{success}</span>
            )}
            <input
              type="submit"
              value="Send Feedback"
              className="btn btn-primary btn-block login-btn"
            />
            {user&&(user.isAdmin&&(
              <button type="submit"
              value="Get all feedbacks"
              className="btn btn-primary btn-block login-btn" onClick={()=>getFeedbacks()}
              style={{marginTop:"20px"}}>Get All Feedbacks</button>
          ))}
            </form>
        </div>
    </div>
  )
}

export default withRouter(Contact);