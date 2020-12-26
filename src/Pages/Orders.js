import React,{useState,useEffect, Fragment} from 'react';
import DisplayOrderCart from '../Components/DisplayOrderCart';
import routes from "../routes";
import {useHistory} from "react-router-dom";
import logoOnline from "../logoOnline.png";
const Orders = () => {

    const history=useHistory();
    const [orderData,setorderData]=useState([]);
    const [displayOrders,setDisplayOrder]=useState(false);
    useEffect(()=>{
        let data={useremail:localStorage.getItem("useremail"),
            token:localStorage.getItem("usertoken")}
        fetch("https://manasa-online-shopping-cart.herokuapp.com/getOrderDetails",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setDisplayOrder(true);
            setorderData(data.message)})
    },[])
    const logOut=()=>{
        localStorage.removeItem("useremail");
        localStorage.removeItem("usertoken");
        history.push(routes.home);
    }
    if(orderData.length>0)
    {
        return (<Fragment>
            <div class="header">
  <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
  <div className="carticon">
    <button className="btn" onClick={logOut}>Log out</button></div>
  </div>
</div>
            <div className="container cartLeft">
            <div className="row">
                
                {orderData.map((each,index)=>{
                    return (
                        <div className="row-md-2">
                        <div className="col-6">
                        <DisplayOrderCart key={index} content={each}/>
                        </div>
                        </div>
                        
                    )
                })}
                
            </div>
            </div>
            </Fragment>
        );
    }
    else if(displayOrders)
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
            <h5 className="ordermsg">You have not placed any Orders</h5></Fragment>
        )
    }
    else
    {
        return null;
    }
}

export default Orders;
