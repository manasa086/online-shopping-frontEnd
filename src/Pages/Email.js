import React,{useState,useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import routes from "../routes";

const Email = () => {

    const [redirect,setRedirect]=useState("");
    const history=useHistory();
    const {id} =useParams();

    useEffect(() => {
       setRedirect(id.substring(1));
    }, []);

    const backToLogin=()=>{
        history.push(routes.home)
    }
    const backToLoginSeller=()=>{
        history.push(routes.seller);
    }
    if(redirect==="user")
    {
        return (
            
            <div className="aroundEmailDiv">
                <p className="email">Email Verified SuccessFully</p>
                <a href="#" className="b1" onClick={backToLogin}>Click this link to  as user</a>
            </div>
        );
    }
    else if(redirect==="seller")
    {
        return (
            <div className="aroundEmailDiv">
                <p className="email">Email Verified SuccessFully</p>
                <a href="#" className="b1" onClick={backToLoginSeller}>Click this link to login as seller</a>
            </div>

        )
    }
    else
    {
        return null;
    }
}

export default Email;
