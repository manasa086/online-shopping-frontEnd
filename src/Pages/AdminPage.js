import React,{Fragment, useEffect, useState} from 'react';
// import csc from 'country-state-city';
import { useForm } from 'react-hook-form';
import {useHistory} from "react-router-dom";
import routes from '../routes';
import { Col, Row, Button, Form, FormGroup, Label, input,Input } from 'reactstrap';

const AdminPage = () => {
    const [Resultdata,setResultData]=useState("");
    const [Resultdata1,setResultData1]=useState("");
    const history=useHistory();
    const { register, handleSubmit,errors } = useForm();
    const onSubmit1=(data)=>{
      let email=data.name;
      data.name=data.name.toLowerCase();
        fetch("http://localhost:8080/adminLogin",{
          method:"POST",
          body:JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((res)=>res.json())
        .then((data)=>{
          if(data.message==="Success")
          {
            localStorage.setItem("token", data.token);
            localStorage.setItem("email",email);
            setResultData("");
            setResultData1("");
            history.push(routes.adminContent);
          }
          else if(data.message==="Username or Password is incorrect")
          {
            setResultData("Username or Password is incorrect");
            setResultData1("");
          }
          else
          {
            setResultData("");
            setResultData1("User not found");
          }
    
        })
    }
        
    
    const changeToSeller=()=>{
        history.push(routes.seller)
    }

    const changePage=()=>{
        history.push(routes.home);
    }

    return (
      <Fragment>
      <h2>Welcome to Online Shopping </h2>
        <div class="aroundDiv">
    <div className="top"></div>
    <h5>Login as Admin</h5>
  <form onSubmit={handleSubmit(onSubmit1)} class="form" >
    <Row form>
    <Col md={1}></Col>
    <Col md={5}>
      <FormGroup>
        <Label for="name">User Name</Label>
        <input className="form-control" type="text" name="name" id="name" ref={register({ required: true })} placeholder="User Name" />
        {errors.name && "User Name is required"}
      </FormGroup>
    </Col>
    <Col md={5}>
      <FormGroup>
        <Label for="password">Password</Label>
        <input className="form-control" type="password" name="password" id="password" ref={register({ required: true })} placeholder="Password" />
        {errors.password && "Password is required"}
      </FormGroup>
    </Col>
    </Row>
    <div className="center">
  <button type="submit" className="btn btn-secondary">Submit</button>
  <p></p>
  
  </div>
  <a className="inline" href="#" onClick={changePage}>Login as User</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="inline" href="#" onClick={changeToSeller}>Login as Seller</a>
  {Resultdata!=""?<Fragment><b className="b2">{Resultdata}</b><br></br></Fragment>:null}
  {Resultdata1!=""?<b className="b1">{Resultdata1}</b>:null}
</form>
</div>
</Fragment>
    );
}


export default AdminPage;
