import React, { Fragment, useEffect,useState } from 'react';
import {useParams} from "react-router-dom";
import { Col, Row, Button, Form, FormGroup, Label, input } from 'reactstrap';
import logoOnline from "../logoOnline.png";
import routes from "../routes";
import {useHistory} from "react-router-dom";
const ChangeStatus = () => {
    const history=useHistory();
    let {id}=useParams();
    let [userData,setUserData]=useState("");
    let [update,setUpdate]=useState(false)
    useEffect(()=>{
        fetch("http://localhost:8080/getSellerDataById/"+id)
        .then((res)=>res.json())
        .then((data)=>setUserData(data.message))
    },[])
    if(userData)
    {
        var changeStatusofSeller=(event)=>{
            let data={status:event.target.value,
                token:localStorage.getItem("token"),
            id:id};
            fetch("http://localhost:8080/changeSellerStatusById",{
                method:"PUT",
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.message=="Updated Successfully")
                {
                    setUpdate(true);
                }
            })
        }
        const logOut=()=>{
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            history.push(routes.home);
        }
        return (
            <Fragment>
            <div class="header">
    <img src={logoOnline} className="logo" width="50px" height="50px"></img>
    <div class="header-right">
    
        <button className="btn btn-secondary" onClick={logOut}>Log out</button>
    </div>
    </div>
            
            <div className="around">
                <p></p>
            <h5>Change Status of Seller</h5>
                <p></p>
                <Form>
                    <Row form>
                        <Col md={1}></Col>
                    <Col md={5}>
                    <FormGroup>
                    <Label for="name">Name:</Label>
                    <input type="text" className="form-control" value={userData.name}></input>
                    </FormGroup>
                    </Col>
                    <Col md={5}>
                    <FormGroup>
                    <Label for="lastname">Last Name:</Label>
                    <input type="text" className="form-control" value={userData.lastname}></input>
                    </FormGroup>
                    </Col>
                    </Row>
                    <Row form>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <FormGroup>
                                <Label for="email">Email:</Label>
                                <input type="email" className="form-control" value={userData.email}></input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <FormGroup>
                                <Label for="gst">GST:</Label>
                                <input type="text" className="form-control" value={userData.gst}></input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={1}></Col>
                        <Col md={10}>

                            <FormGroup>
                                <Label for="address">Address:</Label>
                                <input type="text" className="form-control" value={userData.address.toString()+", "+userData.country.toString()+" "+userData.state.toString()+", "+userData.city.toString()}></input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={3}></Col>
                        <Col md={3}><Button onClick={changeStatusofSeller} value="approved">Approve</Button></Col>
                        <Col md={3}><Button onClick={changeStatusofSeller} value="rejected">Reject</Button></Col>
                        
                    </Row>
                    <p></p>
                    <Row form>
                        <Col md={4}></Col>
                        <Col md={6}>{update?<p>Data Updated Successfully</p>:<p></p>}</Col>
                    </Row>
                </Form>
            </div>
            </Fragment>
        );
    }
    else
    {
        return null
    }
}

export default ChangeStatus;
