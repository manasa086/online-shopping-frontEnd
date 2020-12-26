import React,{Fragment,useState,useEffect} from 'react';
import DisplayCard from "../Components/DisplayCard";
import shoppingcart from "./shopping-cart.png";
import routes from "../routes";
import {useHistory} from "react-router-dom";
import logoOnline from "../logoOnline.png";
import {Row,Col} from "reactstrap";
const Cart = () => {
    const history=useHistory();
    let [product,setProduct]=useState([]);
    useEffect(()=>{
        let data={token:localStorage.getItem("usertoken")}
        fetch("https://manasa-online-shopping-cart.herokuapp.com/productdetails",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{setProduct(data.message)
        })
    },[])

    const displayCart=()=>{
        history.push(routes.detailsCart);
    }
    const logOut=()=>{
        localStorage.removeItem("useremail");
        localStorage.removeItem("usertoken");
        history.push(routes.home);
    }
    const displayOrders=()=>{
        history.push(routes.orders)
    }
    if(product.length>0)
    {
        return (
            
            <Fragment>
                <div className="app">
                <div class="header">
  <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
  <div className="carticon"><p className="viewCart">View Cart:</p><div className="shopping"><img src={shoppingcart} className="cartimg" onClick={displayCart} alt="image not found" width="42px" height="42px"></img></div>
  &nbsp;&nbsp;&nbsp;
    <button className="btn floatUp" onClick={logOut}>Log out</button></div>
  </div>
</div>

       
  
            <h2>Online Shopping Cart Products</h2>
            
                    <button className="items" onClick={displayOrders}>Your Orders</button>
                    
                
            {/* <div className="container cartLeft"> */}
            <div className="row mt-2 cardLeft">
                
                {product.map((each,index)=>{
                    return (
                        <div className="row-md-2">
                        <div className="col-6">
                        <DisplayCard key={index} index={index} content={each}/>
                        </div>
                        </div>
                    )
                })}
                
            </div>
            </div>
            {/* </div> */}
            </Fragment>
        );
    }
    else
    {
        return null;
    }
}

export default Cart;
