import React,{Fragment,useState,useEffect} from 'react';
import DisplaySellerCart from '../Components/DisplaySellerCart';
import {useHistory} from "react-router-dom";
import routes from "../routes";
import logoOnline from "../logoOnline.png";
const SellerPage = () => {
    let data={selleremail:localStorage.getItem("selleremail"),
    token:localStorage.getItem("sellertoken")};
    let history=useHistory();

    let [sellercartData,setsellerCartData]=useState([])
    useEffect(()=>{
        fetch("https://manasa-online-shopping-cart.herokuapp.com/getProductDetailsBySellerEmail",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then((data)=>setsellerCartData(data.message))
    },[])
    const addItems=()=>{
        history.push(routes.sellercart)
    }
    const logOut=()=>{
        localStorage.removeItem("selleremail");
        localStorage.removeItem("sellertoken");
        history.push(routes.home);
    }
    if(sellercartData.length>0)
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
<div className="container">
                <p></p>
                <div className="row">
                    <div className="col-5"><h4 className="buttoncarttext">Click this button to add items to cart:</h4></div>
                    <div className="col-5">
                    <button className="items" onClick={addItems}>Add Items to Shoppling List</button>
                    </div>
                
                </div>
                <p></p>
                <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-5">
                    <h4 className="itemlist" >Items Added to Shopping List</h4>        
                    </div>
                </div>
            </div>
            
            <div className="container">
            <div className="row">
                
                {sellercartData.map((each,index)=>{
                    return (
                        <div className="row-md-2">
                        <div className="col-9">
                        <DisplaySellerCart key={index}  content={each}/>
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

export default SellerPage;
