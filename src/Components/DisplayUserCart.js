import React,{Fragment} from 'react';
import {useHistory} from "react-router-dom";
import routes from "../routes";
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,CardImg,Col,Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const DisplayUserCart = (props) => {
    let imageURL=`https://manasa-online-shopping-cart.herokuapp.com/:${props.content.imagename}`;
    let history=useHistory();
    const editItem=()=>{
        let id=Number(props.content.index);
        history.push(routes.editUserAddCart.replace(":id",id));
        // history.push(routes.pdf.replace(":id",id));
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
              <CardFooter className="footer"><Button className="display_button" onClick={editItem}>Edit Item</Button></CardFooter>
            </Card>
          </div>
          </Col>
          </Row>
          </div>
          </div>
          </Fragment>
    );
}

export default DisplayUserCart;
