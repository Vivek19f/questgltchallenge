import {Modal, Col, Row, Container, Button, Dropdown, DropdownButton} from 'react-bootstrap'
// import Data from './Data.json'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ReturnModal = (props) => {

  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("data")))
  const [returnData, setReturnData] = useState(localData[0])

  const handleReturn = (returnData) => {

    let arr = []
    if(localStorage.getItem("data")){
      const local1 = JSON.parse(localStorage.getItem("data"))
      arr = arr.concat(local1)
    }
      arr.map((item) => {
        if(item.name === returnData.name){
          arr.pop(item)
        }
      })
      
      // arr.push(obj)
      console.log(arr)
      localStorage.setItem("data",JSON.stringify(arr))
      props.updateData(returnData)
      props.onHide()
   }

    return ( 
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
         Return a Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <DropdownButton id="dropdown-basic-button" title={returnData.name} className="text-center">
       {localData.map((item,index) => {
         return (
           <>
            <Dropdown.Item key={index} onClick={() => setReturnData(item)}>{item.name}</Dropdown.Item>
           </>
         )
       })}
      </DropdownButton>
      <Row className="text-left mt-3" style={{placeContent:"normal"}}>
      </Row>
      <p className="text-danger mt-5">Minimum booking period: {returnData.minimum_rent_period}</p>
      <p >Product Needs to be fixed: {returnData.needing_repair ? "True" : "False"}</p>
       <p>Rental Period: {returnData.rentalPeriod}</p>
      <p>Total Rentel: {returnData.totalRent}</p>
      </Modal.Body>
      <Modal.Footer>
        
          <Button onClick={() => handleReturn(returnData)} >Return</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
     );
}
 
export default ReturnModal;