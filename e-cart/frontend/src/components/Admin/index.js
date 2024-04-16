import React, { useState } from 'react'
import Navbar from '../Navbar'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import "./index.css"

function Admin() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")
    const [loading,setLoading] = useState(false)

    const onChangeName=(e)=>{
        setName(e.target.value)
    }

    const onChangeEmail=(e)=>{
        setEmail(e.target.value)
    }

    const onChangePassword=(e)=>{
        setPassword(e.target.value)
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
        body:JSON.stringify({name,email,password}),
      }
      const response  = await fetch("/api/register",options)
      const data = await response.json()
      if(response.ok===true){
        console.log(data)
        setLoading(false)
        setSuccess("User Added Successfully")
        setError("")
      }else{
        console.log(data)
        setError(data.msg)
        setSuccess("")
      }
      setLoading(false)
      setEmail("")
      setName("")
      setPassword("")
    }

  return (
    <div>
        <Navbar />
        <div className='add-container'>
            <h3>Add User</h3>
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
                value={name}
                onChange={onChangeName}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                className='input-field'
                placeholder='Email'
                value={email}
                onChange={onChangeEmail}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                className='input-field'
                placeholder='Password'
                value={password}
                onChange={onChangePassword}
                required
              />
            </div>
            {error&&(
              <span>{error}</span>
            )}
            {success&&(
              <span className='success-msg'>{success}</span>
            )}
            <input
              type="submit"
              value="Add"
              className="btn btn-primary btn-block login-btn"
            />
          </form>
        </div>
    </div>
  )
}

export default withRouter(Admin)