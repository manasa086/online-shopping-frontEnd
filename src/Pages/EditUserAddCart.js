import React,{useState,useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {  FormGroup,Row,Col, Label } from 'reactstrap';
import routes from "../routes";
import {useHistory} from "react-router-dom";
import logoOnline from "../logoOnline.png";
const EditUserAddCart = () => {
    let {id}=useParams();
    const history=useHistory();
    let [cartData,setCartData]=useState([]);
    let {register,handleSubmit,errors}=useForm(); 
    const [cartUpload,setCartUpload]=useState(false);
    useEffect(()=>{
        fetch("https://manasa-online-shopping-cart.herokuapp.com/getCartDeatilsById/"+id)
        .then((res)=>res.json())
        .then((data)=>{
            setCartData(data.message)});
    },[]);
    const onSubmit=(data)=>{
        data.index=Number(id);
        let useremail=localStorage.getItem("useremail");
        data.useremail=useremail;
        data.token=localStorage.getItem("usertoken");
        data.productquantity=Number(data.productquantity);
        fetch("https://manasa-online-shopping-cart.herokuapp.com/updateCartDetails",{
            method:"PUT",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="Data SuccessFully Updated")
            {
                setCartUpload(true);
            }
            
        })
        
        

    }
    const handleChangeInput=(event)=>{
        setCartData(cartData.map((each)=>{
           for(let key in each){
               if(key===event.target.id)
               {
                   each[key]=event.target.value
               }
               else
               {
                   return key
               }
           }
        }))
    }
    const logOut=()=>{
        localStorage.removeItem("useremail");
        localStorage.removeItem("usertoken");
        history.push(routes.home);
    }
    if(cartData.length>0)
    {
    return (

        <div>
            <div class="header">
  <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
  <div className="carticon">
    <button className="btn" onClick={logOut}>Log out</button></div>
  </div>
</div>
            <div className="aroundSellerDiv">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <p></p>
                    <h5>Edit Item in Cart</h5>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="productname">Product Name</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input className="form-control" type="text" name="productname" id="productname" placeholder="Product Name" ref={register({required:true})}  value={cartData[0].productname}></input>
                        {errors.productname && "Product Name is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup>
                    <p></p>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="productprice">Product Price</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input type="text" className="form-control" name="productprice" id="productprice" placeholder="Product Price" ref={register({required:true})}  value={cartData[0].productprice}></input>
                        {errors.productprice && "Product Price is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup>
                    <p></p>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="productquantity">Quantity</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input type="text"className="form-control" name="productquantity" id="productquantity" placeholder="Quantity" ref={register({required:true})} onChange={handleChangeInput} value={cartData[0].productquantity}></input>
                        {errors.productquantity && "Quantity  is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup><Row form><Col md={4}></Col>
                    
                    <Col >      
                    <p></p>       
                <button type="submit" className="btn btn-secondary">Change Cart Details</button></Col></Row></FormGroup>
                <FormGroup>
                    <Row form>
                        <Col md={3}>
                        </Col>
                        <Col md={7}>{ cartUpload ?"Cart details updated Successfully":null}</Col>
                    </Row>
                </FormGroup>
            
            </form>
            </div>
        </div>
    );
    }
    else
    {
        return null;
    }
}

export default EditUserAddCart;
