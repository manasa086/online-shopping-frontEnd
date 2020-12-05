import React,{useState,useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import routes from "../routes";
import {Row,Col,Label} from "reactstrap";
import {useForm} from "react-hook-form";


const ForgotPassword = () => {

    const [changePassword,setChangePassword]=useState("");
    const [redirect,setRedirect]=useState("");
    const [message,setMessage]=useState("");
    const history=useHistory();
    const {id} =useParams();
    const { register, handleSubmit,errors } = useForm();
    useEffect(() => {
       setRedirect(id.substring(1));
    }, []);
    const onSubmit=(data)=>{
        data.useremail=localStorage.getItem("useremail");
        if(data.newpassword!==data.confirmnewpassword)
        {
            setMessage("Both Passwords do not match")
        }
        else
        {
             fetch("http://localhost:8080/changePasswordofUser",{
                 method:"PUT",
                 body:JSON.stringify(data),
                 headers:{
                     "Content-Type":"application/json"
                 }
             })
             .then((res)=>res.json())
             .then((data)=>{
                 if(data.message==="Data Updated Successfully")
                 {
                     setChangePassword("Data Updated Successfully");
                 }
             });         
        }
    }
    const onSubmit1=(data)=>{
        data.selleremail=localStorage.getItem("selleremail");
        if(data.newpassword!==data.confirmnewpassword)
        {
            setMessage("Both Passwords do not match")
        }
        else
        {
             fetch("http://localhost:8080/changePasswordofSeller",{
                 method:"PUT",
                 body:JSON.stringify(data),
                 headers:{
                     "Content-Type":"application/json"
                 }
             })
             .then((res)=>res.json())
             .then((data)=>{
                 if(data.message==="Data Updated Successfully")
                 {
                     setChangePassword("Data Updated Successfully");
                 }
             });         
        }
    }
    const backToLogin=()=>{
        history.push(routes.home)
    }
    const backToLoginSeller=()=>{
        history.push(routes.seller);
    }
    if(redirect==="user")
    {
        return (
            
            <div className="aroundForgotDiv">
                <p></p>
                <h4 className="font">Change the password of user</h4>
                <p></p>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <Row form>
                        <Col md={1}>
                        </Col>
                        <Col md={5}>
                        <Label for="new-password">New Password:</Label>
                        <input type="password" className="form-control" name="newpassword" id="newpassword" ref={register({required:true})} placeholder="New Password"></input>
                        {errors.newpassword && "New Password is required"}
                        </Col>
                        <Col md={5}>
                        <Label for="confirm-new-password">Confirm New Password:</Label>
                        <input type="password" className="form-control" name="confirmnewpassword" id="confirmnewpassword" ref={register({required:true})} placeholder="Confirm New Password"></input>
                        {errors.confirmnewpassword && "Confirm New Password is required"}
                        </Col>
                    </Row>
                    <p></p>
                    <Row form>
                        <Col md={5}></Col>
                        <Col md={5}><button type="submit" className="btn btn-secondary">Submit</button></Col>
                    </Row>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={5}>{changePassword?<b>{changePassword}</b>:null}</Col>
                    </Row>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={5}>{changePassword?<a href="#" onClick={backToLogin}>Click this link to login as User</a>:""}</Col>
                    </Row>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={5}>{message?<p>{message}</p>:""}</Col>
                    </Row>
                </form>
            </div>
        );
    }
    else if(redirect==="seller")
    {
        return (
            <div className="aroundForgotDiv">
                <p></p>
                <h4 className="font">Change the password of Seller</h4>
                <p></p>
                <form onSubmit={handleSubmit(onSubmit1)} className="form">
                    <Row form>
                        <Col md={1}>
                        </Col>
                        <Col md={5}>
                        <Label for="new-password">New Password:</Label>
                        <input type="password" className="form-control" name="newpassword" id="newpassword" ref={register({required:true})} placeholder="New Password"></input>
                        {errors.newpassword && "New Password is required"}
                        </Col>
                        <Col md={5}>
                        <Label for="confirm-new-password">Confirm New Password:</Label>
                        <input type="password" className="form-control" name="confirmnewpassword" id="confirmnewpassword" ref={register({required:true})} placeholder="Confirm New Password"></input>
                        {errors.confirmnewpassword && "Confirm New Password is required"}
                        </Col>
                    </Row>
                    <p></p>
                    <Row form>
                        <Col md={5}></Col>
                        <Col md={5}><button type="submit" className="btn btn-secondary">Submit</button></Col>
                    </Row>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={5}>{changePassword?<b>{changePassword}</b>:null}</Col>
                    </Row>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={5}>{changePassword?<a href="#" onClick={backToLoginSeller}>Click this link to login as Seller</a>:""}</Col>
                    </Row>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={5}>{message?<p>{message}</p>:""}</Col>
                    </Row>
                </form>
            </div>

        )
    }
    else
    {
        return null;
    }
}

export default ForgotPassword;
