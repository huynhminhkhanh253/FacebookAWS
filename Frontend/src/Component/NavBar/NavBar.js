import React, { Component } from 'react';
import "./NavBar.css";
import { Avatar, Grid } from '@mui/material';
import fblogo from "../../ImageSet/logo.png";
import searchicon from "../../ImageSet/searchicon.png";
import home from "../../ImageSet/home.svg";
import page from "../../ImageSet/pages.svg";
import watch from "../../ImageSet/watch.svg";
import market from "../../ImageSet/market.svg";
import group from "../../ImageSet/groups.svg";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

class NavBar extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        user_image : null,
        image: null
     }
    updateImage=(event)=>{
        let image = event.target.files[0];
        if(image==undefined || image =='null'){
            return;
        }
        const thisContext = this;
        const storage = getStorage(app);
        const storageRef = ref(storage, 'userImage/' + image.name);

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
                    "userImage" : downloadURL,
                    "userName" : JSON.parse(localStorage.getItem("user")).userName
                }
                const requestOptions = {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload),
                }
                fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/userService/save", requestOptions)
                .then(respone => respone.json())
                .then(data => {  
                    localStorage.setItem("user", JSON.stringify(data))
                    window.location.reload();
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
                <Grid className='navbar__main' container>
                    <Grid item xs = {3}>
                        <div className='navbar__leftbar'>
                            <img className='navbar__logo' src={fblogo}/>
                            <div className='navbar__search'>
                                <img className='navbar__search_icon' src={searchicon}/>
                                <input className='navbar__search_input' type='text' placeholder='Search Facebook'/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs = {6}>
                        <div className='navbar__container'>
                            <div className='navbar__tabs active'>
                                <img src={home} height='35px' width='35px'/>
                            </div>
                            <div className='navbar__tabs'>
                                <img src={page} height='35px' width='35px'/>
                            </div>
                            <div className='navbar__tabs'>
                                <img src={watch} height='35px' width='35px'/>
                            </div>
                            <div className='navbar__tabs'>
                                <img src={market} height='35px' width='35px'/>
                            </div>
                            <div className='navbar__tabs'>
                                <img src={group} height='35px' width='35px'/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs = {3}>
                        <div className='navbar__righttab'>
                            <img className='navbar__img' src='https://ik.imagekit.io/gyxs5vcin/ImageSet/6dotmenu.png?updatedAt=1693133041820'/>
                            <img className='navbar__img' src='https://ik.imagekit.io/gyxs5vcin/ImageSet/mesmenu.png?updatedAt=1693133041800'/>
                            
                            <img className='navbar__img' src='https://ik.imagekit.io/gyxs5vcin/ImageSet/noti.png?updatedAt=1693133041800'/>
                            <label for="userImage-upload" >
                                <Avatar className='navbar__rightimg' src={JSON.parse(localStorage.getItem("user")).userImage}/>
                                                                          
                            </label>
                            <input style={{display:'none'}} onChange={this.updateImage} type="file" id="userImage-upload"/>

                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
 
export default NavBar;