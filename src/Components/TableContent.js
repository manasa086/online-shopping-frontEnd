import React, { useEffect,useState,Fragment} from 'react';
import { useHistory } from 'react-router-dom';
import {Table} from "reactstrap"
import routes from "../routes";
const TableContent = (props) => {
    let history=useHistory();
  
    const changeStatus=()=>{
        history.push(routes.changeStatus.replace(":id",props.getData[0].index));
    }

    

        return(
            <div className="table3">
                    <Table responsive>
                        <thead>
                <tr>
              <th>#</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Status</th>
              <th>Change Status</th>   
            </tr>
          </thead>
                        <tbody>
                    {props.getData.map((data,index)=>{
                        const modifyStatus=()=>{
                            history.push(routes.changeStatus.replace(":id",data.index));
                        }
                        return (<Fragment>
                            <tr key={index} onClick={modifyStatus}>
                            <td key={index+1}>{index+1}</td>
                            <td key={index+2}>{data.name}</td>
                        <td key={index+3}>{data.email}</td>
                        <td key={index+4}>{data.admin_verify}</td>
                        <td key={index+5}><button className="btn btn-secondary" onClick={changeStatus}>Change Status</button></td>
                        </tr>
                            </Fragment>
                        )
                    
                    })}
                    </tbody>
                    </Table>
                    </div> 
            
                
                   
                 
         
      
            
        )
   
}

export default TableContent;
