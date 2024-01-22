import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import app from "../../firebase";
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


  

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

// const updateImage=(event)=>{
//   let image = event.target.files[0];
//   if(image==undefined || image =='null'){
//       return;
//   }
//   const thisContext = this;
//   const storage = getStorage(app);
//   const storageRef = ref(storage, 'userImage/' + image.name);

//   const uploadTask = uploadBytesResumable(storageRef, image);
//   uploadTask.on('state_changed', 
//   (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//       switch (snapshot.state) {
//       case 'paused':
//           console.log('Upload is paused');
//           break;
//       case 'running':
//           console.log('Upload is running');
//           break;
//       }
      
//   }, 
//   (error) => {
//       // Handle unsuccessful uploads
//   }, 
//   () => { 
//           // Handle successful uploads on complete
//           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           let payload = {
//               "userID" : JSON.parse(localStorage.getItem("user")).userID,
//               "userImage" : downloadURL,
//               "userName" : JSON.parse(localStorage.getItem("user")).userName
//           }
//           const requestOptions = {
//               method: "POST",
//               headers: {'Content-Type': 'application/json'},
//               body: JSON.stringify(payload),
//           }
//           fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/userService/save", requestOptions)
//           .then(respone => respone.json())
//           .then(data => {  
//               localStorage.setItem("user", JSON.stringify(data))
//               window.location.reload();
//           })
//           .catch(error =>{

//           })
//       });
//   }
//   );
// }

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }
  const updateImage=(event)=>{
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
            handleClose();
        });
    }
    );
  }
  
  return (
    <div>
      <Avatar style={{cursor:'pointer'}} onClick={handleClick} className='navbar__rightimg' src={JSON.parse(localStorage.getItem("user")).userImage}/>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <label for="userImage-upload">
        <MenuItem disableRipple>
          <InsertPhotoIcon />
          Update avatar
          <input style={{display:'none'}} onChange={updateImage} type="file" id="userImage-upload"/>
        </MenuItem>
        </label>

        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleSignout} disableRipple>
          <LogoutIcon />
          Sign out
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <PersonRemoveIcon/>
          Sign out and remove user
        </MenuItem>
        
      </StyledMenu>
    </div>
  );
}