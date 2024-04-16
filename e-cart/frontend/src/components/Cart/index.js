import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../Navbar'
import "./index.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const Cart=()=> {

    const history = useHistory()

    const [cart,setCart] = useState(JSON.parse(localStorage.getItem("cart")))
    const [total,setTotal] = useState(0)
    const [products,setProducts] = useState([])



    // var temp = []

    // useEffect(()=>{
    //     if(localStorage.getItem("cart")){
    //         temp = localStorage.getItem("cart")
    //         setCart(temp)
    //         console.log(totalCart)
    //     }
    // },[])



    //console.log(cart)

    // if(localStorage.getItem("cart")){
    //     console.log(localStorage.getItem("cart"))
    //     setCart(JSON.parse(localStorage.getItem("cart")))
    // }

    const getTotal=()=>{
        if(cart!==null){
            var total_temp = 0
            for(var i=0;i<cart.length;i++){
                total_temp += (cart[i]["price"]*cart[i]["count"])
            } 
    
            setTotal(total_temp)
        }
    }
    useEffect(()=>{
        console.log("CART")
        getTotal()
    },[])




    const increment=(id)=>{
        if(cart!==null){
            for(var i=0;i<cart.length;i++){
                if(cart[i]["id"]===id){
                    cart[i]["count"]+=1
                }
            } 
            console.log(cart)
            localStorage.setItem("cart",JSON.stringify(cart))  
            window.location.reload()  
        }
    }

    const decrement=(id)=>{
        if(cart!==null){
            for(var i=0;i<cart.length;i++){
                if(cart[i]["id"]===id){
                    cart[i]["count"]-=1
                }
            } 
            console.log(cart)
            localStorage.setItem("cart",JSON.stringify(cart))  
            window.location.reload()  
        }
    }

    const redirectToPaymentPage=()=>{
        history.push("/payment")
        window.location.reload()
    }

    const removeProduct=(id)=>{
        var tempCartToRemove = []
        if(cart!==null){
            for(var i=0;i<cart.length;i++){
                if(cart[i]["id"]!==id){
                    tempCartToRemove.push(cart[i])
                }
            } 
            console.log(cart)
            localStorage.setItem("cart",JSON.stringify(tempCartToRemove))  
            window.location.reload()  
        }
    }

    if(localStorage.getItem("token")===null){
        history.push("/")
    }
    

   

  return (
    <div>
        <Navbar />
        <div className='cart-container'>
            {(cart!==null&&total>0)?(cart.map((product)=>(
                <div className='product-card' key={product.id}>
                    <h4>{product.title}</h4>
                    <div>
                        <span className='cart-span' onClick={()=>increment(product.id)}>+</span>
                        {
                            product.count>1&&(
                                <span className='cart-span' onClick={()=>decrement(product.id)} >-</span>
                            )
                        }
                    </div>
                    <h4>Count: {product.count}</h4>
                    <input type='submit' value="Remove" className='remove-btn' onClick={()=>removeProduct(product.id)} />
                    <h4>${product.price*product.count}</h4>
                </div>
            ))):(<h2>No Items in Cart</h2>)}
            
            {
                (cart!==null&&total>0)&&(
                <div>
                    <h2>Total: ${total}</h2>
                    <input
                    type="submit"
                    value="Checkout"
                    className="btn btn-primary btn-block login-btn"
                    onClick={redirectToPaymentPage}
                    />
                </div>
                )
            }


        </div>
    </div>
  )
}

export default withRouter(Cart)