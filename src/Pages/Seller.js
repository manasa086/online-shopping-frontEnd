import React,{Fragment,useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form"
import routes from "../routes";
import csc from 'country-state-city';
import { Col, Row, Button, Form, FormGroup, Label, input,Input } from 'reactstrap';

const Seller = () => {
    const history=useHistory();
    const [resultdata,setResultData]=useState("")
    const { register, handleSubmit,errors } = useForm();
    const [forgotPass,setforgotPass]=useState("");

    const changetoAdmin=()=>{
        history.push(routes.admin)
    }
    const changeToUser=()=>{
        history.push(routes.home);
    }
    const onSubmit=(data)=>{
        let email=data.email;
        fetch("https://manasa-online-shopping-cart.herokuapp.com/sellerlogin",{
            method:"POST",
            body:JSON.stringify(data),
            headers: {
                "Content-Type":"application/json"
            }

        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="Success")
            {
                localStorage.setItem("sellertoken", data.token);
                localStorage.setItem("selleremail",email);
                setResultData("");
                //alert("Successful");
                // console.log(localStorage.getItem("selleremail"));
                history.push(routes.sellerPage);
            }
            else 
            {
                setResultData(data.message);
            }
        });

    }
    const forgotPassword=()=>{
      let data={
        email:document.getElementById("email").value.toString()
       }
       localStorage.setItem("selleremail",document.getElementById("email").value.toString());
       fetch("https://manasa-online-shopping-cart.herokuapp.com/forgotPasswordSeller",{
         method:"POST",
         body:JSON.stringify(data),
         headers:{
           "Content-Type":"application/json"
         }
       })
       .then((res)=>res.json())
       .then((data)=>{
         setResultData("");
         setforgotPass(data.message);
       })
    }
    return (
          <div className="app">
            <h2>Welcome to Online Shopping </h2>
             <div class="aroundDiv">
               
        <div className="top"></div>
        <h5>Login as Seller</h5>
      <form onSubmit={handleSubmit(onSubmit)} class="form" >
        <Row form>
        <Col md={1}></Col>
        <Col md={5}>
          <FormGroup>
            <Label for="email">Email</Label>
            <input className="form-control" type="email" name="email" id="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && "Email is required"}
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
      <p>
      </p>
      <a href="#" onClick={forgotPassword}>Forgot Password</a>
      </div>
      <p></p>
      <a className="inline" href="#" onClick={changetoAdmin}>Login as Admin</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="inline" href="#" onClick={changeToUser}>Login as User</a>
    </form>
    {resultdata!=""?<Fragment><b className="b2">{resultdata}</b><br></br></Fragment>:null}
    {forgotPass!=""?<b className="b1">{forgotPass}</b>:null}
    </div>
    </div>
    );
}

export default Seller;
