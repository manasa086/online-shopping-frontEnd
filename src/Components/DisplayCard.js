import React,{Fragment,useState} from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText,CardImg,Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
 


const DisplayCard = (props) => {

    
   let imageURL=`https://manasa-online-shopping-cart.herokuapp.com/:${props.content.imagename}`;
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
      fetch("https://manasa-online-shopping-cart.herokuapp.com/addtoCart",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>res.json())
      .then((data)=>{
          if(data.message=="Data Updated Successfully")
          {
            setCartData("Item SuccessFully Added to Cart");
            setModal(!modal);
          }
          else if(data.message=="Product SuccessFully Added to Cart")
          {
            setCartData("Item SuccessFully Added to Cart");
            setModal(!modal);
          }
          else if(data.message==="Product is out of stock")
          {
            setCartData("Sorry for the inconvenience, product is out of stock");
            setModal(!modal);
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
        <div className="column1">
       
          <Card>
            <CardBody>
            <CardImg src={imageURL}  alt="Card image cap" width="80px" height="120px" />
            <CardTitle tag="h6">{props.content.productname}</CardTitle>
              <CardText className="cardText"><ul><li><b><i>Price</i>: <i>₹{props.content.productprice}</i></b></li>
              <li><b><i>Brand Name</i>: <i>{props.content.productbrandname}</i></b></li></ul>
              </CardText>
            </CardBody>
            <CardFooter className="footer"><Button className="display_button" onClick={addtoCart}>Add to Cart</Button></CardFooter>
          </Card>
       
        </div>
      

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