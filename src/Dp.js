
// import logo from './logo.svg';
import './Dp.css';
import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineClose , AiOutlineSearch , AiOutlineDownload } from 'react-icons/ai'
import Loader from 'react-loader-spinner';
import {saveAs} from 'file-saver'

function Dp() {

  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [available , setAvailable ] = useState(false);
  const [ url , setURL ] = useState("");
  const [ followers , setFollowers ] = useState("");
  const [ following , setFollowing ] = useState("");
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
      setFollowers(json.graphql.user.edge_followed_by.count);
      setFollowing(json.graphql.user.edge_follow.count);
      setFullName(json.graphql.user.full_name);
      setImageSrc(json.graphql.user.profile_pic_url_hd);
      console.log(followers)
    } )
    .catch((error) => 
    {
      setErrorName("Error : Invalid URL or Private Account ");
      setShow(true);
      console.log(error)
      setFollowers("");
      setFollowing("");
      setImageSrc("");
      setFullName("");
    });
  }
  else
  {
    setErrorName("Error : Empty URL");
    setShow(true);
    setFollowers("");
    setFollowing("");
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


      <label for="url" ><b>Enter Profile URL :</b></label>
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
          <img className="rounded-circle"
                src={imageSrc}
                alt="new"
                id = "image"
              />
            </div>

        <div id="detailsContainer" >
        <div id="nameContainer" >
          <h4>{fullname}</h4>
        </div>
        <div id="followContainer" >
          
        <table className="table table-borderless"  >
          <tbody>
          <tr>
            <td><h4>{ followers }</h4></td>
            <td><h4>{ following }</h4></td>
          </tr>

          <tr>
              <td>Followers</td>
              <td>Following</td>            
          </tr>
          </tbody>
        </table>


        </div>
       
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

export default Dp;
