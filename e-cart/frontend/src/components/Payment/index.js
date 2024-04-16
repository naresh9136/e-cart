import React, { useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import "./payment-index.css"

const Payment=()=> {

    const history = useHistory()

    const [cardnumber,setCardNumber] = useState("")
    const [month,setMonth] = useState("")
    const [year,setYear] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState("")
    const [cvv,setCvv] = useState("")
    const [username,setUsername] =  useState("")

    const onChangeUserName=(e)=>{
        setUsername(e.target.value)
    }

    const onChangeCVV=(e)=>{
        setCvv(e.target.value)
    }

    const onChangeCardNumber=(e)=>{
        setCardNumber(e.target.value)
    }

    const onChangeMonth=(e)=>{
        setMonth(e.target.value)
    }

    const onChangeYear=(e)=>{
        setYear(e.target.value)
    }


   if(localStorage.getItem("token")===null){
        history.push("/")
   }

   const onSubmit=(e)=>{
    e.preventDefault()
   }

    return (
      <div>
        <Navbar />
        <div className='payment-container'>
            <h3>Payment Page</h3>
            <div>
            <form onSubmit={onSubmit}>
            {loading&&(
              <h6>Loading...</h6>
            )}
            <div>
              <input
                type="number"
                name="cardnumber"
                className='input-field'
                placeholder='Card Number'
                value={cardnumber}
                onChange={onChangeCardNumber}
                required
              />
            </div>
            <div className='card-month-year'>
                <div>
                <input
                    type="number"
                    name="month"
                    className='input-field'
                    placeholder='Month'
                    value={month}
                    onChange={onChangeMonth}
                    required
                />
                </div>
                <div>
                <input
                    type="number"
                    name="year"
                    className='input-field'
                    placeholder='Year'
                    value={year}
                    onChange={onChangeYear}
                    required
                />
                </div>
            </div>
            <div>
              <input
                type="number"
                name="cvv"
                className='input-field'
                placeholder='CVV'
                value={cvv}
                onChange={onChangeCVV}
                required
              />
            </div>
            <div>
                <input
                    type="text"
                    name="username"
                    className='input-field'
                    placeholder='Cardholder Name'
                    value={username}
                    onChange={onChangeUserName}
                    required
                />
                </div>
            {error&&(
              <span>{error}</span>
            )}
            <input
              type="submit"
              value="Pay Now"
              className="btn btn-primary btn-block login-btn"
            />
          </form>
            </div>
        </div>
      </div>
    )
}

export default withRouter(Payment)