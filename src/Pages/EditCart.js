import React,{useState,useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {  FormGroup,Row,Col, Label,   } from 'reactstrap';
import axios from 'axios';
const EditCart = () => {
    let {id}=useParams();
    let [productData,setproductData]=useState([]);
    let {register,handleSubmit,errors}=useForm();
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [uploadedFile,setUploadedFile]=useState(false);
    const [productUpload,setProductUpload]=useState(false);
    useEffect(()=>{
        fetch("http://localhost:8080/getProductDetailsById/"+id)
        .then((res)=>res.json())
        .then((data)=>{
            setproductData(data.message)});
    },[])
    const handleChange = (e) => {
        const file = e.target.files[0]; // accesing file
        setFile(file); // storing file
    }
    const onSubmit=(data)=>{
        delete data['image'];
        data.index=Number(id);
        let selleremail=localStorage.getItem("selleremail");
        // console.log(selleremail);
        data.imagename=`${data.productname}${selleremail}.jpg`;
        data.selleremail=selleremail;
        data.token=localStorage.getItem("sellertoken")
        const formData=new FormData();
        let newFileName=`${data.productname}${selleremail}.jpg`;
        // formData.append('file',file);
        // console.log(data);
        formData.append('file', file, newFileName);
        fetch("http://localhost:8080/updateProductDetails",{
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
                setProductUpload(true);
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
    const handleChangeInput=(event)=>{
        setproductData(productData.map((each)=>{
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
    if(productData.length>0)
    {
    return (

        <div>
            <div className="aroundSellerDiv">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <p></p>
                    <h5>Edit Item in Shopping List</h5>
                    <Row>
                    <Col md={1}></Col>
                    <Col ><Label for="productname">Product Name</Label></Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                        </Col>
                        <Col md={10}>
                        <input className="form-control" type="text" name="productname" id="productname" placeholder="Product Name" ref={register({required:true})} onChange={handleChangeInput} value={productData[0].productname}></input>
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
                        <input type="text" className="form-control" name="productprice" id="productprice" placeholder="Product Price" ref={register({required:true})} onChange={handleChangeInput} value={productData[0].productprice}></input>
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
                        <input type="text" className="form-control" name="productbrandname" id="productbrandname" placeholder="Product Brand Name" ref={register({required:true})} onChange={handleChangeInput} value={productData[0].productbrandname}></input>
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
                        <input type="text"className="form-control" name="quantity" id="quantity" placeholder="Quantity" ref={register({required:true})} onChange={handleChangeInput} value={productData[0].quantity}></input>
                        {errors.quantity && "Quantity  is required"}
                        </Col>
                    </Row>
                    </FormGroup>
                    <FormGroup>
                    <Row form>
                        
                    <Col md={1}></Col>
                    <Col ><Label for="image">Change Product Image</Label></Col>
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
                        <Col md={7}>{ productUpload ?"Product details updated Successfully":null}</Col>
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

export default EditCart;
