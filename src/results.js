// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Button, Modal, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineClose , AiOutlineSearch } from 'react-icons/ai'
import Loader from 'react-loader-spinner';

function App() {

  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [available , setAvailable ] = useState(false);
  const [ ht , setHt ] = useState("");
  const [ Name , setName ] = useState("");
  const [ Father , setFather ] = useState("");
  const [ imageSrc , setImageSrc ] = useState("");


  const handleClose = () => setShow(false);

  const search = async(value) => {

    value = value.trim();

    if(value)
    {
        
    setLoader(true);
    //fetching of data

      await fetch("https://scit-student-api.herokuapp.com/details/"+value)
      .then(response => response.json() )
      .then( res => 
        {
          setName(res.name);
          setFather(res.father);
          setImageSrc("http://scce.ac.in/erp/student_upload/"+value+".jpg");
        }
         )

    setLoader(false);
    setAvailable(true);
    }
    else
    {
      setShow(true);
      setAvailable(false);
    }
  }

  const updateURL = (event) =>
  {
    setHt(event.target.value);
  }
  
  return (
    <div className="container">
    
      <div className="form-group" id="formGroup" >
      <label for="url" ><b>Enter Hallticket No:</b></label>
          <div className="flex" id="form" >
            <input className="form-control" id="ht" type="text" value={ht}  onChange={ updateURL }  />
            <Button variant="dark" onClick={()=> search(ht) } ><AiOutlineSearch size={23} /></Button>
          </div>

      </div>

      <div id="loader" >
      <Loader
         type="ThreeDots"
         color="#crimson"
         height={100}
         width={100}
          visible={loader}
      />
      </div>

      { available ? 
        
        
        <div id="details" >

        <Table id="table" responsive>
          <tbody>
            <tr>
              <td>Hallticket No :</td>
              <td>{ ht }</td>
                           
            </tr>
            <tr>
            <td>Name :</td>
            <td>{ Name }</td>
            </tr>
            <tr>
            <td>Father :</td>
            <td>{ Father }</td>
            </tr>
          </tbody>
        </Table>

          <div >
          <img 
                src={imageSrc}
                alt="new"
                id = "image"
              />
            </div>


        </div>
        
        

      : null
       }


      {/* Error Modal */}
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>Error!</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>Error! Enter Hallticket Number</Modal.Body>
        <Modal.Footer>
          <div class="flex pull-left">
          <Button variant="danger" onClick={handleClose}>
          <span style={{ paddingRight : 5 }} ><AiOutlineClose/></span>
          Close 
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Error Modal */}
    </div>
  );
}

export default App;
