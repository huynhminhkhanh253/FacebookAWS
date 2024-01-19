import { Paper } from '@mui/material';
import React, { Component } from 'react'
import './StatusBar.css';
import uploadIcon from "../../../ImageSet/upload.png";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../firebase";

class Status extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    openStatusDialog=(event)=>{
        let image = event.target.files[0];
        if(image==undefined || image =='null'){
            return;
        }
        const thisContext = this;
        const storage = getStorage(app);
        const storageRef = ref(storage, 'status/' + image.name);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
            
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => { 
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                let payload = {
                    "userID" : JSON.parse(localStorage.getItem("user")).userID,
                    "userName" : JSON.parse(localStorage.getItem("user")).userName,
                    "statusImageURL" : downloadURL
                }
                const requestOptions = {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload),
                }
                fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/statusService/save", requestOptions)
                .then(respone => respone.json())
                .then(data => {  
                    thisContext.props.refresh();
                })
                .catch(error =>{

                })
            });
        }
        );
    }
    render() { 
        return ( 
            <div>
                {
                    this.props.uploader == "true" ?
                    <Paper className='statusbar__status'>
                        <label for="file-upload-status" className='upload__tabs'>
                            <img src={uploadIcon} className="upload__icon"/>    
                        </label>
                        <input onChange={this.openStatusDialog} type="file" id="file-upload-status"/>
                    </Paper> :
                    <Paper className='statusbar__status'>
                        <img src={this.props.object.statusImageURL} className='status__image'/>
                    </Paper>
                }
                
            </div>
         );
    }
}
 
export default Status;