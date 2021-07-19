import React, {useEffect, useState} from "react";
import './App.css';
import Data from './Data.json'
import DataTable from "react-data-table-component";
import {Button, Row} from 'react-bootstrap'
import PurchaseModal from "./PurchaseModal";
import Fuse from 'fuse.js'
import ReturnModal from "./ReturnModal";

const columns = [
  {
    name: "Code",
    selector: "code",
    sortable: true
  },
  {
    name: "Name",
    selector: "name",
    sortable: true
  },
  {
    name: "type",
    selector: "type",
    sortable: true
  },
  {
    name: "Availability",
    selector: "availability",
    sortable: true,
    cell: col => col.availability ? "True" : "False"
  },
  {
    name: "Need Repair",
    selector: "needing_repair",
    sortable: true,
    cell: col => col.needing_repair ? "True" : "False"
  },
  {
    name: "Durability",
    selector: "durability",
    sortable: true,
  },
  {
    name: "Max Durability",
    selector: "max_durability",
    sortable: true,
  },
  {
    name: "Price",
    selector: "price",
    sortable: true,
  },
  {
    name: "Minimum Rent Period",
    selector: "minimum_rent_period",
    sortable: true,
  },
];




function App() {

  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const [allData, setAllData] = useState(Data)

  // console.log()

  const handleBooking= (newvalue) =>{
     let items = allData.map((item) => {
      if(item.name === newvalue.name){
        return {...item, availability: false, durability: newvalue.durability}
      }
      return {...item}
    })
    setAllData(items);
  }

  const handleReturn= (newvalue) =>{
    let items = allData.map((item) => {
     if(item.name === newvalue.name){
       return {...item, availability: true}
     }
     return {...item}
   })
   setAllData(items);
 }


  
  // Seacrch functionality
  const searchData = (pattern) => {
    if (!pattern) {
      return;
    }

    const fuse = new Fuse(Data, {
      keys: ["name"],
    });

    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      // setData([]);
    } else {
      result.forEach(({item}) => {
        matches.push(item);
      });
    //   console.log(matches)
      setAllData(matches);
    }
  };



  return (
    <div className="App">
      <div className="card">
      <input
            style={{height: 50, textAlign:"center", margin:"20px 40px"}}
            type="search"
            onChange={(e) => searchData(e.target.value)}
            placeholder="Search Data"
            
        />
        <DataTable
          // title="Data"
          columns={columns}
          data={allData}
          defaultSortField="title"
          pagination
        />

        <Row>
          <Button className="btndown" variant="primary" onClick={() => setModalShow(true)}>Book</Button><br />
          <Button className="btndown" variant="primary" onClick={() => setModalShow1(true)}>Return</Button>
        </Row>
      </div>
      <PurchaseModal show={modalShow} allData={allData} onHide={() => setModalShow(false)}  updateData={handleBooking}/>
      <ReturnModal show={modalShow1} onHide={() => setModalShow1(false)} updateData={handleReturn}/>
    </div>
  );
}
export default App;
