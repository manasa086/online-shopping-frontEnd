import React, { useRef, useState } from 'react';
import axios from 'axios';
import {  FormGroup,Row,Col, Label,   } from 'reactstrap';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import routes from "../routes";
import logoOnline from "../logoOnline.png";

function SellerCart() {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [uploadedFile,setUploadedFile]=useState(false);
    const [productUpload,setProductUpload]=useState(false);
    const el = useRef(); // accesing input element
    const history=useHistory();
    let {register,handleSubmit,errors}=useForm();
    const handleChange = (e) => {
        const file = e.target.files[0]; // accesing file
        setFile(file); // storing file
    }
    const onSubmit=(data)=>{
        delete data['image'];
        let selleremail=localStorage.getItem("selleremail");
        // console.log(selleremail);
        data.imagename=`${data.productname}${selleremail}.jpg`;
        data.selleremail=selleremail;
        data.token=localStorage.getItem("sellertoken");
        const formData=new FormData();
        let newFileName=`${data.productname}${selleremail}.jpg`;
        // formData.append('file',file);
        formData.append('file', file, newFileName);
        console.log(file);
        console.log(data);
        fetch("http://localhost:8080/uploadProducts",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="SuccessFully Inserted")
            {
                setProductUpload(true);
            }
            else
            {
                setProductUpload(false);
            }
        })
        const uploadFile = async ()=>
        {
            try{
                const res=await axios.post('http://localhost:8080/upload',formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                setUploadedFile(true) 
            }
            catch(err)
            {
                if(err.response.status===500){
                    console.log('There was a problem with the server')
                }
                else
                {
                    console.log(err.response.data.msg)
                }
            }
        }
        uploadFile();
    }
    const logOut=()=>{
        localStorage.removeItem("selleremail");
        localStorage.removeItem("sellertoken");
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
            <div className="aroundSellerDiv">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <p></p>
                    <h4 className="itemlist">Add Items to the Shopping List</h4>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="productname">Product Name</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input className="form-control" type="text" name="productname" id="productname" placeholder="Product Name" ref={register({required:true})}></input>
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
                        <input type="text" className="form-control" name="productprice" id="productprice" placeholder="Product Price" ref={register({required:true})}></input>
                        {errors.productprice && "Product Price is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup>
                    <p></p>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="productbrandname">Product Brand Name</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input type="text" className="form-control" name="productbrandname" id="productbrandname" placeholder="Product Brand Name" ref={register({required:true})}></input>
                        {errors.productbrandname && "Product Brand Name is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup>
                    <p></p>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="quantity">Quantity</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input type="text"className="form-control" name="quantity" id="quantity" placeholder="Quantity" ref={register({required:true})}></input>
                        {errors.quantity && "Quantity  is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup>
                    <Row form>
                        
                    <Col md={1}></Col>
                    <Col ><Label for="image">Upload Product Image</Label></Col>
                    </Row>
                        <Row form>
                    <Col md={1}></Col>
                    <Col md={10}>
                    <input type="file" ref={register({required:true})} name="image" id="image"  onChange={handleChange} />
                    {errors.image && "Image is required"}
                    </Col>
                    </Row></FormGroup> 
                    <FormGroup><Row form><Col md={4}></Col>
                    
                    <Col >      
                    <p></p>       
                <button type="submit" className="btn btn-secondary">Add to Shopping List</button></Col></Row></FormGroup>
                <FormGroup>
                    <Row form>
                        <Col md={3}>
                        </Col>
                        <Col md={7}>{ productUpload ?"Product details saved Successfully":null}</Col>
                    </Row>
                </FormGroup>
            
            </form>
            </div>
        </div>
    );
}
export default SellerCart;