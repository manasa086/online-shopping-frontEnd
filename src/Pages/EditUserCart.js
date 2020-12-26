import React,{useState,useEffect, Fragment} from 'react';
import DisplayUserCart from '../Components/DisplayUserCart';
import routes from "../routes";
import {useHistory} from "react-router-dom";
import logoOnline from "../logoOnline.png";
const EditUserCart = () => {

    const history=useHistory();
    const [cartData,setCartData]=useState([]);
    const [displayCart,setDisplayCart]=useState(false);
    useEffect(()=>{
        let data={useremail:localStorage.getItem("useremail"),
            token:localStorage.getItem("usertoken")}
        fetch("https://manasa-online-shopping-cart.herokuapp.com/getCartDetails",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setDisplayCart(true);
            setCartData(data.message)})
    },[])
    const logOut=()=>{
        localStorage.removeItem("useremail");
        localStorage.removeItem("usertoken");
        history.push(routes.home);
    }
    if(cartData.length>0)
    {
        return (<Fragment>
            <div class="header">
  <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
  <div className="carticon">
    <button className="btn" onClick={logOut}>Log out</button></div>
  </div>
</div>
            <h5 className="cartDetails">Edit Cart Details</h5>
            <div className="container cartLeft">
            <div className="row">
                
                {cartData.map((each,index)=>{
                    return (
                        <div className="row-md-2">
                        <div className="col-6">
                        <DisplayUserCart key={index} content={each}/>
                        </div>
                        </div>
                        
                    )
                })}
                
            </div>
            </div>
            </Fragment>
        );
    }
    else if(displayCart)
    {
        return(
            <Fragment>
            <div class="header">
  <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
  <div className="carticon">
    <button className="btn" onClick={logOut}>Log out</button></div>
  </div>
</div>
            <h5 className="ordermsg">No Products are added to Cart</h5></Fragment>
        )
    }
    else
    {
        return null;
    }
}

export default EditUserCart;
