import React,{Fragment,useEffect,useRef,useState} from 'react';
import {useParams} from "react-router-dom";
import Pdf from "react-to-pdf";
import {Table} from "reactstrap";
import routes from "../routes";
import {useHistory} from "react-router-dom";
import logoOnline from "../logoOnline.png";
const PDF = () => {
    const history=useHistory();
    const { id }=useParams();
    const [cartData,setCartData]=useState("");
    const [shippingCost,setshippingCost]=useState(50)
    const [tax,setTax]=useState("");
    const [total,setTotal]=useState("");
    const ref=useRef()
    useEffect(()=>{
        fetch("http://localhost:8080/getCartDetailsById/"+id)
        .then((res)=>res.json())
        .then((data)=>{
            setCartData(data.message[0]);
            setTax((Number(data.message[0].productprice)*7)/100);
            if(tax)
                setTotal(shippingCost+Number(data.message[0].productprice)+tax);
            console.log(total);
        })
    },[])
    const logOut=()=>{
      localStorage.removeItem("useremail");
      localStorage.removeItem("usertoken");
      history.push(routes.home);
  }
    if(cartData )
    {
    return (
        <Fragment>
          <div className="app">
           <div class="header">
  <img src={logoOnline} className="logo" width="50px" height="50px"></img>
  <div class="header-right">
  <div className="carticon">
    <button className="btn btn-secondary" onClick={logOut}>Log out</button></div>
  </div>
</div>
                <div ref={ref} className="left"> 
                <h2 className="headingTop">Online Shopping Invoice</h2>
                    <div className="row">
                        <div className="col tab1">
                        <Table responsive>
      <thead>
        <tr className="head">
          <th>Product Name</th>
          <th></th>
          <th></th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr className="tr1">
          
          <td>{cartData.productname}</td>
          <td></td>
          <td></td>
          <td>{cartData.productprice}</td>
            <td>{cartData.productquantity}</td>
        </tr>
        <tr className="tr1">
          <td></td>
          <td></td>
          <td></td>
          
          <td>Tax(7%)</td>
            <td>{tax}</td>
        </tr>
        <tr className="tr1">
          <td></td>
          <td></td>
          <td></td>
          
          <td>Shipping Cost</td>
            <td>{shippingCost}</td>
        </tr>
        <tr className="tr1">
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
            <td>{total}</td>
        </tr>
        <tr className="tr1"><td></td><td></td><td></td><td></td><td></td></tr>
      </tbody>
    </Table>
                        </div>
                    </div>
                </div>
                <div className="center">
                <Pdf targetRef={ref} filename="invoice.pdf">
                    {({toPdf})=><button className="btn btn-secondary leftButton" onClick={toPdf}>Capture as PDF</button>}
                </Pdf>
                </div>
                
                </div>
                </Fragment>
    );
    }
    else
    {
        return null;
    }
}

export default PDF;
