import React,{Fragment,useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Row,Col,Button} from 'reactstrap';
import TableContent from '../Components/TableContent';
import logoOnline from "../logoOnline.png";
import routes from "../routes";
import {useHistory} from "react-router-dom";

const AdminContent = () => {
    let [getData,setData]=useState([]);
    let [tableContent,setTableContent]=useState(false);
    let [status,setStatus]=useState("");
    let {register,handleSubmit,errors}=useForm();
    const history =useHistory();

    const onSubmit=(data)=>{
        setTableContent(true);
        // console.log(localStorage.getItem("status"))
        data.token=localStorage.getItem("token");
        fetch("https://manasa-online-shopping-cart.herokuapp.com/sellerDetails",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setData(data.message);
        })          
    }
    const logOut=()=>{
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        history.push(routes.home);
    }
    return (
        <div>
                <div class="header">
    <img src={logoOnline} className="logo" width="50px" height="50px"></img>
    <div class="header-right">
    
        <button className="btn btn-secondary" onClick={logOut}>Log out</button>
    </div>
    </div>
    <p></p>
        <h4 className="font">Approve (or) Reject Seller Registration to add Items to Shopping List</h4>
        <p></p>
                <form onSubmit={handleSubmit(onSubmit)} className="form" >
            <Row form>
                <Col md={2}></Col>
            <Col md={4} className="font"><b>Select one option for changing the Status of Seller:</b></Col>
            <Col md={2}>
            
            <select className="form-control font" name="status" id="status" ref={register({ required: true })}>
                <option value="default">--Select--</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>
            </Col>
            </Row>
            <p></p>
            <Row form>
                <Col md={5}></Col>
                <Col md={5}><Button type="submit">Show Details</Button></Col>
            </Row>
            </form>
            {getData.length>0?<TableContent getData={getData} ></TableContent>:null}
            {tableContent && !(getData.length>0)?<Fragment><p></p><h6 className="details">Sorry, No User Details are available</h6></Fragment>:null}
        </div>
    );
}

export default AdminContent;
