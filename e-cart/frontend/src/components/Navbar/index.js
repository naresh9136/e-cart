import React, { Component, useState } from 'react'
import "./index.css"
import { Link, useHistory } from 'react-router-dom'
import { IoMdLogOut } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";

function Navbar({user,cart}) {

  // const [user,setUser] = useState(null)

  const history = useHistory()
  const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("cart")
    history.push("/")
    window.location.reload()
  }

  const changePasswordPage=()=>{
    history.push("/changePassword")
    window.location.reload()
  }

  const redirectTOHome=()=>{
    history.push("/products")
    window.location.reload()
  }
  const contactPage=()=>{
    history.push("/contact")
    window.location.reload()
  }

  const redirectToCart=()=>{
    history.push("/cart")
   // localStorage.setItem("cart",JSON.stringify(cart))
    window.location.reload()
  }

  const addUser=()=>{
    history.push("/add")
    window.location.reload()
  }

    return (
      <div id="navbar">
        {
          localStorage.getItem("token")?(
          <Link to="/products" className="home-link" onClick={redirectTOHome}>
            <h2>e-cart</h2>
          </Link>
          ):(
            <Link className="home-link" to="/">
            <h2>e-cart</h2>
          </Link>
          )
        }
        
        <ul id="list">
          {user&&(<li>Hello {user.name}</li>)}
          {/* {localStorage.getItem("token")&&(<Link to="/cart" onClick={redirectToCart}><li>Cart <FaShoppingCart /></li></Link>)} */}
          {localStorage.getItem("token")&&(<li onClick={redirectToCart} className='logout-class' >Cart <FaShoppingCart /></li>)}
          
          {/* {user&&(user.isAdmin&&(
            <Link to="/add" onClick={addUser}><li>Add User <IoIosAddCircle /></li></Link>
          ))} */}
          {user&&(user.isAdmin&&(
            <li onClick={addUser} className='logout-class' >Add User <IoIosAddCircle /></li>
          ))}
          {/* {localStorage.getItem("token")&&(<Link to="/changePassword" onClick={changePasswordPage}><li>Change Password <FaExchangeAlt /></li></Link>)} */}
          {/* {localStorage.getItem("token")&&(<Link to="/contact" onClick={contactPage}><li>Feedback <VscFeedback />
</li></Link>)} */}
          {/* {localStorage.getItem("token")&&(<Link to="/contact" onClick={contactPage}><li className='logout-class'>Profile <CgProfile /></li></Link>)} */}
          {localStorage.getItem("token")&&(<li onClick={changePasswordPage} className='logout-class' >Change Password <FaExchangeAlt /></li>)}
          {localStorage.getItem("token")&&(<li onClick={contactPage} className='logout-class' >Feedback <VscFeedback /></li>)}
          {localStorage.getItem("token")&&(<li onClick={logout} className='logout-class' >Logout <IoMdLogOut /></li>)}
        </ul>
      </div>
    )
  }


export default Navbar
