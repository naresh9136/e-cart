import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import "./index.css"

const Feedbacks = () => {

  const history = useHistory()


    if(localStorage.getItem("token")===null){
        history.push("/")
   }

   const [feedbacks,setFeedbacks] = useState([])

   useEffect(()=>{
    getFeedbacks()
   },[])


   const getFeedbacks=async()=>{
    const options = {
        method:"GET",
        headers:{
          "x-auth-token":localStorage.getItem("token"),
        },
      }
      const response  = await fetch("/api/all/feedbacks",options)
      const data = await response.json()
      if(response.ok===true){
        console.log(data)
        setFeedbacks(data.feedbacks)
      }else{
        console.log(data)
      }

   }


  return (
    <div className='main-feedback-container'>
        <Navbar />
        {feedbacks?(
        <div className='main-feedback-container'>
          All Feedbacks
          <div className='feedback-container'>
              {feedbacks&&(feedbacks.map((feedback)=>(
                  <div className='feedback-card' key={feedback.name}>
                      <h5>Name: {feedback.name}</h5>
                      <p>Feedback: {feedback.feedback}</p>
                  </div>
              )))}
          </div>
        </div>):(<h4>No Feedbacks Yet!</h4>)}
       
        
    </div>
  )
}

export default Feedbacks