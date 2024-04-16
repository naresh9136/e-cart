import React, { Component, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import "./index.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Products=()=>{

  // state={
  //   user:{},
  //   products:null
  // }

  const [user,setUser] = useState("")
  const [products,setProducts] = useState(null)
  const [succeessMessage,setSucceessMessage] = useState("")
  const history = useHistory()
  // const [cart,setCart] = useState([])

  // componentDidMount=()=>{
  //   this.getUser()
  //   this.getProducts()
  // }

  useEffect(()=>{
    getUser()
    getProducts()
  },[])

  const getProducts=async()=>{
    // const response  = await fetch('https://dummyjson.com/products')
    const response  = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    // console.log(data)
    setProducts(data)
    // setState({products:data.products})
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

  // const redirectToPayment=()=>{
  
  //   history.push("/payment")
  //   window.location.reload()

  // }

  const addToCart=(product)=>{
    var tempCart = []
    var flag = false
    if(localStorage.getItem("cart")){
      var c = JSON.parse(localStorage.getItem("cart"))
      for(var i=0;i<c.length;i++){
        if(product.id===c[i]["id"]){
          flag = true
          alert("Product Already added to Cart")
          return
        }
      }
      if(flag===false){
        tempCart.push(...JSON.parse(localStorage.getItem("cart")))
        tempCart.push({...product,count:1})
      }
      localStorage.setItem("cart",JSON.stringify(tempCart))
      alert("Product Added to Cart")
    }else{
      tempCart = [{...product,count:1}]
      localStorage.setItem("cart",JSON.stringify(tempCart))
      alert("Product Added to Cart")

    }
    //setCart(tempCart)
  }

  if(localStorage.getItem("token")===null){
    history.push("/")
  }


    return (
      <div>
        <Navbar user={user}  />
        <div className='container'>
          {products&&(
            products.map((p)=>(
              // <div className="card" key={p.title}>
              //   <div className="imgBox">
              //     <img src={p.image} alt={p.title} className="mouse"/>
              //   </div>

              //   <div className="contentBox">
              //     <h3>{p.title}</h3>
              //     <h2 className="price">${p.price}</h2>
              //     <a onClick={()=>addToCart(p)} className="buy">Add to Cart</a>
              //   </div>

              // </div>
              <section className="section-card" key={p.id}>
                <div className="card" >
                  <div className="img-container">
                    <img src={p.image} alt=""/>
                  </div>
                  <div className="infos">
                    <h3 className="name">
                      {p.title}
                    </h3>
                    <h2 className="price">
                      ${p.price}
                    </h2>
                    <button className="btn btn-buy" onClick={()=>addToCart(p)}>Buy now</button>
                  </div>
                </div>
              </section>
            ))
          )
          }
        </div>
      </div>
    )
  }

export default withRouter(Products)
