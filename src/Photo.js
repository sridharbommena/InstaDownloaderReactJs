
// import logo from './logo.svg';
import './Photo.css';
import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineClose , AiOutlineSearch , AiOutlineDownload } from 'react-icons/ai'
import Loader from 'react-loader-spinner';
import {saveAs} from 'file-saver'

function Photo() {

  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [available , setAvailable ] = useState(false);
  const [ url , setURL ] = useState("");
  const [ fullname , setFullName ] = useState("");
  const [ imageSrc , setImageSrc ] = useState("");
  const [ ErrorName , setErrorName ] = useState("");

  const handleClose = () => setShow(false);

  const search = async(value) => {

    value = value.trim();
  if(value)
  {
    setLoader(true);
    setAvailable(false);
    var newValue = "";
    const index = value.lastIndexOf("?");
    if(index !== -1)
    {
      newValue = value.slice(0,index);
      console.log(newValue);
    }
    else
    {
      newValue = value;
    }
    const url = newValue.concat("?__a=1");
    console.log(url);
    await fetch(url)
        .then(response =>  response.json() )
    .then( json => {
      setAvailable(true);
      
      setFullName(json.graphql.shortcode_media.owner.full_name);
      setImageSrc(json.graphql.shortcode_media.display_url);
    } )
    .catch((error) => 
    {
      setErrorName("Error : Invalid URL or Private Account ");
      setShow(true);
      console.log(error)
      
      setImageSrc("");
      setFullName("");
    });
  }
  else
  {
    setErrorName("Error : Empty URL");
    setShow(true);
    
    setImageSrc("");
    setFullName("");


  }

  setLoader(false);

  }

  const updateURL = (event) =>
  {
    setURL(event.target.value);
  }

  const downloadFile = () =>
  {
    saveAs(imageSrc , fullname+".jpg" );
  }
  
  return (
    <div className="container">
    
      <div className="form-group" id="formGroup" >


      <label for="url" ><b>Enter Post URL :</b></label>
          <div className="flex" id="form" >
            <input className="form-control" id="ht" type="text" value={url}  onChange={ updateURL }  />
            <Button variant="dark" onClick={()=> search(url) } ><AiOutlineSearch size={23} /></Button>
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
      <>
        <div className="d-flex flex-row bd-highlight mb-3 justify-content-center  " >
        
         <div id="imgContainer" >
          <img
                src={imageSrc}
                alt="new"
                id = "image"
              />

        </div>
        </div>
        <div className="d-flex justify-content-center" >
        <Button variant="primary" className="center" onClick={()=> downloadFile() } ><AiOutlineDownload size={23} />Download</Button>

        </div>

      </>
      : null
       }


      {/* Error Modal */}
      <Modal centered={true} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>Error!</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>{ErrorName}</Modal.Body>
        <Modal.Footer>
          <div className="flex pull-left">
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

export default Photo;
