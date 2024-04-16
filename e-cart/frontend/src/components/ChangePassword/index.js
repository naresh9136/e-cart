import React, { useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../Navbar'
import "./index.css"

function ChangePassword() {

    const [old_password,setOld_Password] = useState("")
    const [new_password,setNew_Password] = useState("")
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")
    const [loading,setLoading] = useState(false)

    const onChangeOldPassword=(e)=>{
        setOld_Password(e.target.value)
    }

    const onChangeNewPassword=(e)=>{
        setNew_Password(e.target.value)
    }

    const onSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
      const options = {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "x-auth-token":localStorage.getItem("token"),
        },
        body:JSON.stringify({old_password,new_password}),
      }
      const response  = await fetch("/change_password",options)
      const data = await response.json()
      if(response.ok===true){
        console.log(data)
        setLoading(false)
        setSuccess(data.msg)
        setError("")
      }else{
        console.log(data)
        setError(data.msg)
        setSuccess("")
      }
      setLoading(false)
      setNew_Password("")
      setOld_Password("")
    }

  return (
    <div>
        <Navbar />
        <div className='change-container'>
            <h3>Change Password</h3>
            <form onSubmit={onSubmit}>
            {loading&&(
              <h6>Loading...</h6>
            )}
            <div>
              <input
                type="password"
                name="old_password"
                className='input-field'
                placeholder='Old Password'
                value={old_password}
                onChange={onChangeOldPassword}
                required
              />
            </div>
            <div>
                <input
                type="password"
                name="new_password"
                className='input-field'
                placeholder='New Password'
                value={new_password}
                onChange={onChangeNewPassword}
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
              value="Change Password"
              className="btn btn-primary btn-block login-btn"
            />
            </form>
        </div>
    </div>
  )
}

export default withRouter(ChangePassword)