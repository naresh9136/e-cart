import React, { Component } from 'react'
import {withRouter}  from "react-router-dom"
import Navbar from '../Navbar'
import "./index.css"
import { Redirect } from 'react-router-dom'

class Home extends Component {

  state={
    email:"",
    password:"",
    error:"",
    loading:false
  }

  // componentDidMount=()=>{
    
  //     if(localStorage.getItem("token")){
  //       this.props.history.push("/products")
  //     }
  
  // }

   onSubmit=async(e)=>{
      e.preventDefault()
      const {email,password} = this.state
      this.setState({loading:true})
      const options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,password}),
      }
      const response  = await fetch("/login",options)
      const data = await response.json()
      if(response.ok===true){
        const {history} = this.props
        //console.log(history)
        console.log(data)
        localStorage.setItem("token",data.token);
        this.setState({loading:false})
         history.replace("/products")
         window.location.reload()
        // return Redirect("/products")
      }else{
        console.log(data)
        this.setState({error:data.msg})
      }
      this.setState({loading:false})
   }

   onChangeEmail=(e)=>{
    this.setState({email:e.target.value})
  }

  onChangePassword=(e)=>{
    this.setState({password:e.target.value})
  }




  render() {

    if(localStorage.getItem("token")){
      return <Redirect to="/products" />
    }

    return (
      <div className='bg-image-classes'>
        <Navbar />
        <div className="home-container">
          <div className='login-card'>
            <h3 className='user-login-font'>User/Admin Login</h3>
            <form onSubmit={this.onSubmit}>
              {this.state.loading&&(
                <h6>Loading...</h6>
              )}
              <div>
                <input
                  type="email"
                  name="email"
                  className='input-field'
                  placeholder='Email'
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  className='input-field'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </div>
              {this.state.error&&(
                <span>{this.state.error}</span>
              )}
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block login-btn"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Home)