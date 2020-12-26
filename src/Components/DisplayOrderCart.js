import React,{Fragment,useEffect,useState} from 'react';
import {useHistory} from "react-router-dom";
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,CardImg,Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import routes from "../routes";

const DisplayOrderCart = (props) => {
    let imageURL=`https://manasa-online-shopping-cart.herokuapp.com/:${props.content.imagename}`;
    const history=useHistory();
    const [modal, setModal] = useState(false);
    const [content,setContent]=useState("");
    
    const cancelOrder=()=>{
        let id=Number(props.content.index);
        let data={
          id:id,
          token:localStorage.getItem("token")
        }
        fetch("https://manasa-online-shopping-cart.herokuapp.com/CancelOrder",{
          method:"POST",
          body:JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((res)=>res.json())
        .then((data)=>{
          if(data.message==="Order has been cancelled")
          {
            setModal(!modal);
            setContent("Order has been cancelled");
            
            
          }
          else
          {
            setModal(!modal);
            setContent("Sorry for inconvenience, Error while cancelling the order. Kindly, try again.")
          }
        })

        
    }
    const closeModal=()=>{
      setModal(!modal);
      window.location.reload();
    }

    return (
        <Fragment>
         
        <div className="row display">
       
        <div className="col-5 ml-3 middle">
          <Row md={4}>
          <Col md={5} className="col-lg-4 col-xl-4 mt-4">
        <div className="cart">
            <Card>
              <CardBody>
              <CardImg src={imageURL}  alt="Card image cap" width="80px" height="120px" />
              <CardTitle tag="h6">{props.content.productname}</CardTitle>
                <CardText className="cartText"><ul><li><b><i>Price</i>: <i>₹{props.content.productprice}</i></b></li>
                <li><b><i>Quantity</i>: <i>{props.content.productquantity}</i></b></li></ul>
                </CardText>
                <CardText></CardText>
              </CardBody>
              <CardFooter className="footer"><Button className="display_button" onClick={cancelOrder}>Cancel Order</Button></CardFooter>
            </Card>
          </div>
          </Col>
          </Row>
          </div>
          </div>
          <Modal isOpen={modal} >
        <ModalBody>
        {content}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>Ok</Button>{' '}
          
        </ModalFooter>
      </Modal>
          </Fragment>
    );
}

export default DisplayOrderCart;
