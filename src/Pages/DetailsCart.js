import React,{Fragment,useEffect, useState} from 'react';
import DisplayCart from '../Components/DisplayCart';
import {useHistory} from "react-router-dom";
import logoOnline from "../logoOnline.png";
import routes from "../routes";
const DetailsCart = () => {
    let [cartData,setCartData]=useState([])
    const history=useHistory();
    useEffect(()=>{
        
        let data={useremail:localStorage.getItem("useremail"),
        token:localStorage.getItem("usertoken")}
        fetch("http://localhost:8080/getCartDetails",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setCartData(data.message);
        })
    },[])
    const logOut=()=>{
        localStorage.removeItem("useremail");
        localStorage.removeItem("usertoken");
        history.push(routes.home);
    }
    if(cartData.length>0)
    {
        return (
            <Fragment>
                <div className="app">
                <div class="header">
            <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
   
    <button className="btn btn-secondary" onClick={logOut}>Log out</button>
  </div>
</div>
            <h2>Product details which are added to Cart</h2>
            <div className="container cartLeft">
            <div className="row">
                
                {cartData.map((each,index)=>{
                    return (
                        <div className="row-md-2">
                        <div className="col-6">
                        <DisplayCart key={index}  content={each}/>
                        </div>
                        </div>
                    )
                })}
                
            </div>
            </div>
            </div>
            </Fragment>
        );
    }
    else

    {
        return null;
    }
}

export default DetailsCart;
