import React,{Fragment,useState} from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText,CardImg,Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
 


const DisplayCard = (props) => {

    
   let imageURL=`http://localhost:8080/:${props.content.imagename}`;
   let [cartData,setCartData]=useState("");
   const [modal, setModal] = useState(false);
    const addtoCart=()=>{
     
      let data={useremail:localStorage.getItem("useremail"),
    productprice:Number(props.content.productprice),
    productname:props.content.productname,
    productquantity:1,
    index:Number(props.index+1),
    imagename:props.content.imagename,
    token:localStorage.getItem("usertoken")
  }
    console.log(data);
      fetch("http://localhost:8080/addtoCart",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>res.json())
      .then((data)=>{
          console.log(data.message)
          if(data.message=="Data Updated Successfully")
          {
            setCartData("Item SuccessFully Added to Cart");
            setModal(!modal);
          }
          else if(data.message=="Product SuccessFully Added to Cart")
          {
            setCartData("Item SuccessFully Added to Cart");
            console.log(cartData);
            setModal(!modal);
            console.log(modal);

          }
          else
          {
            setCartData("Error while adding to cart")
          }
      })
      
    }
    const closeModal=()=>{
      setModal(!modal);
    }

    return( 
      <Fragment>
      <div className="row display">
      <div className="col-5 ml-3 middle">
        <Row md={4}>
        <Col md={5} className="col-lg-4 col-xl-4 mt-4">
      <div className="card">
          <Card>
            <CardBody>
            <CardImg src={imageURL}  alt="Card image cap" width="80px" height="120px" />
            <CardTitle tag="h5">{props.content.productname}</CardTitle>
              <CardText><ul><li><b><i>Price</i>: <i>₹{props.content.productprice}</i></b></li>
              <li><b><i>Brand Name</i>: <i>{props.content.productbrandname}</i></b></li></ul>
              </CardText>
            </CardBody>
            <CardFooter className="footer"><Button className="display_button" onClick={addtoCart}>Add to Cart</Button></CardFooter>
          </Card>
        </div>
        </Col>
        </Row>
        </div>
        </div>
        {/* {cartData?<ModalMessageBox>{cartData}</ModalMessageBox>:null} */}
        <div>
        <Modal isOpen={modal} >
        <ModalBody>
        {cartData}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>Ok</Button>{' '}
          
        </ModalFooter>
      </Modal>
        </div>
        </Fragment>
       
        
       
    )
  
  
  
 
};

export default DisplayCard