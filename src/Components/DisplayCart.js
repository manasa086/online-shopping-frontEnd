import React,{Fragment,useState} from 'react';
import {useHistory} from "react-router-dom";
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,CardImg,Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import routes from "../routes";




const DisplayCart = (props) => {
    let imageURL=`https://manasa-online-shopping-cart.herokuapp.com/:${props.content.imagename}`;
    const history=useHistory();
    const [modal, setModal] = useState(false);

    const buyNow=()=>{
        let id=Number(props.content.index);
        let data={
          id:id,
          token:localStorage.getItem("usertoken")
        }
        fetch("https://manasa-online-shopping-cart.herokuapp.com/OrderDetails",{
          method:"POST",
          body:JSON.stringify(data),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data)
          if(data.message==="Order has been placed")
          {
            history.push(routes.pdf.replace(":id",id));
          }
          else
          {
            setModal(!modal);
          }
        })

        
    }
    const closeModal=()=>{
      setModal(!modal);
    }
    function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          document.body.appendChild(script);
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          
      });
    }
    async function displayRazorpay() {
      const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }
      let id=Number(props.content.index);
      let data={id:id}
      // creating a new order
      const result=await fetch("https://manasa-online-shopping-cart.herokuapp.com/orders",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      }).then((res)=>res.json())
      
      

      // if (!result) {
      //     alert("Server error. Are you online?");
      //     return;
      // }

      // Getting the order details back
      console.log(result);

      const options = {
          key: "rzp_test_pz7viYBiCcvI1Z", // Enter the Key ID generated from the Dashboard
          amount: result.amount.toString(),
          currency: result.currency,
          name: "Manasa Somisetty",
          description: "Test Transaction",
          order_id: result.id,
          handler: function (response) {       
                if(response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature){
                  let id=Number(props.content.index);
                  let data={
                    id:id,
                    token:localStorage.getItem("usertoken")
                  }
                  fetch("https://manasa-online-shopping-cart.herokuapp.com/OrderDetails",{
                    method:"POST",
                    body:JSON.stringify(data),
                    headers:{
                      "Content-Type":"application/json"
                    }
                  })
                  .then((res)=>res.json())
                  .then((data)=>{
                    console.log(data)
                    if(data.message==="Order has been placed")
                    {
                      history.push(routes.pdf.replace(":id",id));
                    }
                    else
                    {
                      setModal(!modal);
                    }
                  })
                }
          },
          prefill: {
              name: "Manasa Somisetty",
          },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
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
              <CardFooter className="footer"><Button className="display_button" onClick={displayRazorpay}>Buy Now</Button></CardFooter>
            </Card>
          </div>
          </Col>
          </Row>
          </div>
          </div>
          <Modal isOpen={modal} >
        <ModalBody>
        Sorry for inconvenience, Error while placing the order. Kindly, try again.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>Ok</Button>{' '}
          
        </ModalFooter>
      </Modal>
          </Fragment>
    );
}

export default DisplayCart;
