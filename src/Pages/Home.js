import React,{Fragment,useState} from 'react';
import { useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form"
import routes from "../routes";
import csc from 'country-state-city';
import { Col, Row, Button, Form, FormGroup, Label, input,Input } from 'reactstrap';


const Home = () => {
    const history=useHistory();
    const [islogin,setLogin]=useState(true);
    const [seller,setSeller]=useState(false);
    const [isAdmin,setAdmin]=useState(false);
    const [forgotPass,setforgotPass]=useState("");
  const [resultdata,setResultData]=useState("");
  const [resultdata1,setResultData1]=useState("");
  const { register, handleSubmit,errors } = useForm();

  const changeDisplay=()=>{
    setResultData1("");
    setResultData("");
    setLogin(!islogin);
  }
  const changetoSeller=()=>{
      setSeller(!seller);
      setLogin(!islogin)
  }
  const onSubmit2=(data)=>{
    var countryname=csc.getCountryById(data.country);
    data.country=countryname.name
    var statename=csc.getStateById(data.state);
    data.state=statename.name;
    var cityname=csc.getCityById(data.city);
    data.city=cityname.name;
    console.log(data);
    data.admin_verify="pending";
    fetch("http://localhost:8080/insertSellerData",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "content-Type":"application/json"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.message==="Email Sent to your email account. Please Verify")
            {
                setResultData("Email Sent to your email account. Please Verify");
                setResultData1(" ");
            }
            else if(data.message==="Email Already Exists.Provide new email Address")
            {
                setResultData1("Email Already Exists.Provide new email Address")
                setResultData(" ");
            }
            else
            {
                setResultData(data.message);
                setResultData1(" ");
            }
    })
  }
  const onSubmit=(data)=>{
    var countryname=csc.getCountryById(data.country);
        data.country=countryname.name
        var statename=csc.getStateById(data.state);
        data.state=statename.name;
        var cityname=csc.getCityById(data.city);
        data.city=cityname.name;
        console.log(data);
        fetch("http://localhost:8080/",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message==="Email Sent to your email account. Please Verify")
            {
                setResultData("Email Sent to your email account. Please Verify");
                setResultData1(" ");
            }
            else if(data.message==="Email Already Exists.Provide new email Address")
            {
                setResultData1("Email Already Exists.Provide new email Address")
                setResultData(" ");
            }
            else
            {
                setResultData(data.message);
                setResultData1(" ");
            }

        });
  }
  const changetoAdmin=()=>{
    history.push(routes.admin)
   }
   const onSubmit1=(data)=>{
     let email=data.email;
       fetch("https://manasa-online-shopping-cart.herokuapp.com/userlogin",{
           method:"POST",
           body:JSON.stringify(data),
           headers:{
               "Content-Type":"application/json"
           }
       })
       .then((res)=>res.json())
       .then((data)=>{
        if(data.message==="Success")
        {
          localStorage.setItem("usertoken", data.token);
          localStorage.setItem("useremail",email);
          setResultData("");
          setResultData1("");
          //alert("Successful");

          history.push(routes.cart);
        }
        else 
        {
          setResultData(data.message);
          setResultData1("");
        }
     
    
       });

   }
   const forgotPassword=()=>{
     let data={
       email:document.getElementById("email").value.toString()
      }
      localStorage.setItem("useremail",document.getElementById("email").value.toString());
      fetch("http://localhost:8080/forgotPasswordUser",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then((res)=>res.json())
      .then((data)=>{
        setResultData("");
        setResultData1("");
        setforgotPass(data.message);
      })

   }
   let countries=csc.getAllCountries();
   let [countryData,setCountryData]=useState(countries)
   let [stateData,setStateData]=useState([]);
   let [cityData,setCityData]=useState([]);
   const changeState=(event)=>{
     setStateData(csc.getStatesOfCountry(event.target.value));
 
   }
   const changeCity=(event)=>{
     console.log(event.target.value);
     setCityData(csc.getCitiesOfState(event.target.value));
   }
   const changeToSellerLogin=()=>{
        history.push(routes.seller)
   }

    if(islogin)
    {
  
    return (
      <div className="app">
        
        <div class="header1">
    
    <div class="header-right1">
    
       
    </div>
    </div>
    <h2>Welcome to Online Shopping </h2>
      <div class="aroundDiv">
        <div className="top"></div>
        <h5>Login as User</h5>
      <form onSubmit={handleSubmit(onSubmit1)} className="form" >
        <Row form>
        <Col md={1}></Col>
        <Col md={5}>
          <FormGroup>
            <Label for="email">Email</Label>
            <input className="form-control" type="email" name="email" id="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && "Email is required"}
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label for="password">Password</Label>
            <input className="form-control" type="password" name="password" id="password" ref={register({ required: true })} placeholder="Password" />
            {errors.password && "Password is required"}
          </FormGroup>
        </Col>
        </Row>
        
        <div className="center">
      <button type="submit" className="btn btn-secondary">Submit</button>
      <p>
      </p>
      <a href="#" onClick={forgotPassword}>Forgot Password</a>
      </div>
      <p></p>
      <a className="inline" href="#" onClick={changetoAdmin}>Login as Admin</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="inline" href="#" onClick={changeToSellerLogin}>Login as Seller</a>
      <p></p>
      <p></p>
      <p className="b">Do you have an account</p>
      <a className="inline" href="#" onClick={changeDisplay}>Sign Up as User?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="inline" href="#" onClick={changetoSeller}>Sign Up as Seller?</a>
      
      
      
    </form>
    {resultdata!=""?<Fragment><b className="b2">{resultdata}</b><br></br></Fragment>:null}
      {resultdata1!=""?<b className="b1">{resultdata1}</b>:null}
      {forgotPass!=""?<b className="b1">{forgotPass}</b>:null}
    </div>
    
    </div>  
      
      
    );
    }
    else if( !(seller) && !(islogin) )
    {
      return (
        <div className="app1">
          <h2>Welcome to Online Shopping </h2>
        <div class="aroundUserDiv">
        <div className="top1"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p class="signup">User Registration Form</p>
            <p></p>
        <Row form>
          <Col md={1}></Col>
        <Col md={5}>
          <FormGroup>
            <Label for="name">Name</Label>
            <input className="form-control" type="text" name="name" id="name" ref={register({ required: true })} placeholder="Name" />
            {errors.name && "Name is required"}
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label for="lastname">LastName</Label>
            <input className="form-control" type="text" name="lastname" id="lastname" ref={register({ required: true })} placeholder="Last Name" />
            {errors.lastname && "Last Name is required"}
          </FormGroup>
        </Col>
        </Row>
        <Row form>
          <Col md={1}></Col>
          <Col md={10}>
          <FormGroup>
            <Label for="email">Email</Label>
            <input  className="form-control" type="email" name="email" id="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && "Email is required"}
          </FormGroup>
          </Col>
          </Row>
          <Row form>
          <Col md={1}></Col>
          <Col md={10}>
      <FormGroup>
        <Label for="password">Password</Label>
        <input className="form-control" type="password" name="password" id="password"  ref={register({ required: true })} placeholder="Password"/>
        {errors.password && "Password is required"}
        
      </FormGroup>
      </Col>
        </Row>    
        <Row form>
          <Col md={1}></Col>
          <Col md={10}>
      <FormGroup>
        <Label for="Address">Address</Label>
        <input className="form-control" type="text" name="address" id="address"  ref={register({ required: true })} placeholder="Address"/>
        {errors.address && "Addess is required"}
        
      </FormGroup>
      </Col>
        </Row>  
        <Row form>
            <Col md={1}></Col>
        <Col md={4}>
          <FormGroup>
            <Label for="country">Country</Label>
        <select  className="form-control" ref={register({ required: true })} name="country" id="country" onChange={changeState}><option key="1" value="default">--Select--</option>
    {countryData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
            {errors.country && "Country is required"}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="state">State</Label>
            <select  className="form-control" type="text"  ref={register({ required: true })} name="state" id="state" onChange={changeCity}><option key="1" value="default">--Select--</option>
    {stateData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
            {errors.state && "State is required"}
          </FormGroup>
          
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="city">City</Label>
            <select className="form-control" type="text" ref={register({ required: true })} name="city" id="city"><option key="1" value="default">--Select--</option>
    {cityData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
      
          </FormGroup>  
          
        </Col>
        </Row>
    
      <div className="center">
      <button type="submit" className="btn btn-secondary">Submit</button>
      </div>
      <p></p>
      {resultdata!=""?<Fragment><b className="b2">{resultdata}</b><br></br><a href="#" className="b1" onClick={changeDisplay}>Click this link to login</a></Fragment>:null}
      {resultdata1!=""?<b className="b1">{resultdata1}</b>:null}
    </form>
    </div>
    </div>
      );
    }
    else
    {
        return ( <div classname="app">
          <h2>Welcome to Online Shopping </h2>
          <div class="aroundDiv2">
        <div className="top1"></div>
        <form onSubmit={handleSubmit(onSubmit2)}>
            <h4 className="signup">Seller Registration Form</h4>
            <p></p>
        <Row form>
          <Col md={1}></Col>
        <Col md={5}>
          <FormGroup>
            <Label for="name">Name</Label>
            <input className="form-control" type="text" name="name" id="name" ref={register({ required: true })} placeholder="Name" />
            {errors.name && "Name is required"}
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label for="lastname">LastName</Label>
            <input className="form-control" type="text" name="lastname" id="lastname" ref={register({ required: true })} placeholder="Last Name" />
            {errors.lastname && "Last Name is required"}
          </FormGroup>
        </Col>
        </Row>
        <Row form>
          <Col md={1}></Col>
          <Col md={10}>
          <FormGroup>
            <Label for="email">Email</Label>
            <input  className="form-control" type="email" name="email" id="email" ref={register({ required: true })} placeholder="Email" />
            {errors.email && "Email is required"}
          </FormGroup>
          </Col>
          </Row>
          <Row form>
          <Col md={1}></Col>
          <Col md={10}>
      <FormGroup>
        <Label for="password">Password</Label>
        <input className="form-control" type="password" name="password" id="password"  ref={register({ required: true })} placeholder="Password"/>
        {errors.password && "Password is required"}
        
      </FormGroup>
      </Col>
        </Row>   
        <Row form>
          <Col md={1}></Col>
          <Col md={10}>
      <FormGroup>
        <Label for="Address">Address</Label>
        <input className="form-control" type="text" name="address" id="address"  ref={register({ required: true })} placeholder="Address"/>
        {errors.address && "Addess is required"}
        
      </FormGroup>
      </Col>
        </Row>  
        <Row form>
            <Col md={1}></Col>
        <Col md={4}>
          <FormGroup>
            <Label for="country">Country</Label>
        <select  className="form-control" ref={register({ required: true })} name="country" id="country" onChange={changeState}><option key="1" value="default">--Select--</option>
    {countryData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
            {errors.country && "Country is required"}
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="state">State</Label>
            <select  className="form-control" type="text"  ref={register({ required: true })} name="state" id="state" onChange={changeCity}><option key="1" value="default">--Select--</option>
    {stateData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
            {errors.state && "State is required"}
          </FormGroup>
          
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for="city">City</Label>
            <select className="form-control" type="text" ref={register({ required: true })} name="city" id="city"><option key="1" value="default">--Select--</option>
    {cityData.map((each,index)=>{
      return <option key={index} value={each.id}>{each.name}</option> ;
  })}</select>
      
          </FormGroup>  
          
        </Col>
        </Row>
        <Row form>
            <Col md={1}></Col>
            <Col md={10}>
                <FormGroup>
                    <Label for="gst">GST</Label>
                    <input className="form-control" type="text" ref={register({required:true})} name="gst" id="gst" placeholder="GST Number"/>
                </FormGroup>
            </Col>
        </Row>
      <div className="center">
      <button type="submit" className="btn btn-secondary">Submit</button>
      </div>
      <p></p>
      {resultdata!=""?<Fragment><b className="b1">{resultdata}</b><br></br><a href="#" className="b1" onClick={changeDisplay}>Click this link to login as user</a></Fragment>:null}
      {resultdata1!=""?<b className="b1">{resultdata1}</b>:null}
    </form>
    </div>
    </div>
    )
    }
   
      
}


export default Home;
