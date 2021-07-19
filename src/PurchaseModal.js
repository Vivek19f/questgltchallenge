import {Modal, Col, Row, Container, Button, Dropdown, DropdownButton} from 'react-bootstrap'
// import Data from './Data.json'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const PurchaseModal = (props) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [booking, setBooking] = useState(props.allData[0]);

  // console.log(props.allData)

 function diffDays(d1, d2)
{
  
  const tv1 = d1.valueOf();  
  const tv2 = d2.valueOf();
  var ndays = (tv2 - tv1) / 1000 / 86400;
  ndays = Math.round(ndays - 0.5);
  return ndays;
}
function calculateRental(numdays, price ){

  return numdays*price
}

function calculateDurability(durability, day, type) {
  if(type === "plain" && durability !== 0){
    return durability-day
  }else if(durability !==0) {
      let numofmile = day*10*2
      return durability-(day*2)-(numofmile/10)
  }
}
 const handlePurchase = (booking) => {

  let arr = []
  if(localStorage.getItem("data")){
    const local1 = JSON.parse(localStorage.getItem("data"))
    arr = arr.concat(local1)
  }
    const days = diffDays(startDate, endDate)
    const obj = {...booking}
    obj.rentalPeriod = days
    obj.totalRent = days*booking.price

    booking.rentalPeriod = days
    // console.log(calculateDurability(booking.durability, days, booking.type))
    booking.durability = calculateDurability(booking.durability, days, booking.type)
    
    arr.push(obj)
    localStorage.setItem("data",JSON.stringify(arr))
    props.updateData(booking)
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
         Book a Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <DropdownButton id="dropdown-basic-button" title={booking.name} className="text-center">
       {props.allData.filter((i)=> i.availability === true).map((item,index) => {
         return (
           <>
            <Dropdown.Item key={index} onClick={() => setBooking(item)}>{item.name}</Dropdown.Item>
           </>
         )
       })}
      </DropdownButton>
      <Row className="text-left mt-3" style={{placeContent:"normal"}}>
        <h5>Select Dates</h5>
        <Col sm={3}>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={date => setStartDate(date)}
          />
        </Col>
        <Col sm={3}>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={date => setEndDate(date)}
          />
        </Col>
      </Row>
      <p className="text-danger mt-5">Minimum booking period: {booking.minimum_rent_period}</p>
      <p>Total Rentel: {calculateRental(diffDays(startDate, endDate),booking.price)}</p>
      </Modal.Body>
      <Modal.Footer>
        { (diffDays(startDate, endDate) < booking.minimum_rent_period)? 
          <Button disabled>Purchase</Button>: 
          <Button onClick={() => handlePurchase(booking)}>Purchase</Button>
          }
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
     );
}
 
export default PurchaseModal;