import React, { Component } from 'react'
import './PostContainer.css';
import { Avatar, Button, Paper } from '@mui/material';
import post from "../../../ImageSet/post_2.png";
import like from "../../../ImageSet/like.png";
import likebutton from "../../../ImageSet/likebutton.png";
import commentbutton from "../../../ImageSet/comment.png";
import sharebutton from "../../../ImageSet/share.png";
import { getImage } from '../../../getImage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import DropdownItem from './DropdownItem';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DeleteIcon from '@mui/icons-material/Delete';


class Post extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        open : false,
        comments: [],
        comment: null,
    }

    handleClose = () => {
        this.setState({open : false});

    };
    getData=()=>{
        const thisContext = this;
        fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/commentService/getAllComments/"+this.props.object.postID)
        .then(response => response.json())
        .then(json => {
            thisContext.setState({comments : json});
        })
        .catch(error =>{

        })
    }

    componentDidMount(){
        this.getData();
    }
    isImageAvailable=(data)=>{
        return data == "" ? false : true;
    }

    submitComment=(event)=>{
        if(event.key == "Enter"){
            const thisContext = this;
            let payload = {
                "postID" : this.props.object.postID,
                "userID" : JSON.parse(localStorage.getItem("user")).userID,
                "userImage" : JSON.parse(localStorage.getItem("user")).userImage,
                "userName" : JSON.parse(localStorage.getItem("user")).userName,
                "comment" : this.state.comment
            }
            const requestOptions = {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body : JSON.stringify(payload),
            };

            fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/commentService/save",requestOptions)
            .then(response => response.json())
            .then(data =>{
                thisContext.getData();

            })
            .catch(error =>{

            })
        }
    }

    openOption=()=>{
        if(this.state.open == false){
            this.setState({open : true});
        }
        else{
            this.setState({open : false});
        }
        
    }
    handleDelete=()=>{
        const thisContext = this;
        const requestOptions = {
            method: "DELETE",
        }
        fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/postService/delete/" + this.props.object.postID , requestOptions)
        .then(respone => respone.json())
        .then(data => {  
            thisContext.props.uploadPost();
        })
        .catch(error =>{

        })
    }

    render() { 
        return ( 
            <div>
                <Paper className='post__container'>
                    {/* header */}
                    <div className='post_header'>
                        <div>
                            <Avatar src={this.props.object.imageURL} className='post_header_avatar'/>
                        </div>
                        <div className='post_header_text' >
                            {this.props.object.userName}
                        </div>
                    </div>
                    {/* Ultility */}
                    <div className = 'utility' >
                        <div>
                        <Button color="inherit" variant="text" onClick={this.openOption}>
                            <MoreHorizIcon/>
                        </Button>
                        </div>
                        {/* <div className='dropdown-menu' >
                            <DropdownItem img = {likebutton} text = {"My Profile"}/>
                        </div> */}
                        <div className='dropdown'>
                            {
                                this.state.open == true ? 
                                <Paper square={false} elevation={20} sx={{ width: 230 }}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose}>
                                        <ListItemIcon>
                                            <DeleteIcon fontSize="small" />
                                        </ListItemIcon>
                                        <Typography onClick={this.handleDelete} variant="inherit">Delete post</Typography>
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                                : <span></span>
                            }
                        </div>
                    </div>
                    {/* description */}
                    <div className='post_description' >
                        {this.props.object.description}
                    </div>
                    {/* image */}
                    <div>
                        {
                            this.isImageAvailable ? <img src={this.props.object.postImgURL} className='post_image'/> : <span></span>
                        }
                    </div>
                    {/* Likecount */}
                    <div className='post_likecount_container'>
                        <div>
                            <img className='post_likecount_img' src={like}/>
                        </div>
                        <div className='post_likecount_count'>
                            {this.props.object.likes}
                        </div>
                    </div>
                    {/* Likeshare post */}
                    <div className='post_likeshare'>
                        <div className='post__tab'>
                            <div className='post_tabfirst' >
                                <img className='post__tabimg' src={likebutton}/>
                            </div>
                            <div className='post__tabtext'>
                                Like
                            </div>
                        </div>
                        <div className='post__tab'>
                            <div className='post_tabfirst' >
                                <img className='post__tabimg' src={commentbutton}/>
                            </div>
                            <div className='post__tabtext'>
                                Comment
                            </div>
                        </div>
                        <div className='post__tab'>
                            <div className='post_tabfirst' >
                                <img className='post__tabimg' src={sharebutton}/>
                            </div>
                            <div className='post__tabtext'>
                                Share
                            </div>
                        </div>
                    </div>
                    {/* comment box */}
                    <div className="upload__comment">
                        <div className="comment__section">
                            {
                                this.state.comments.map((item,index)=>(
                                    index > this.state.comments.length-4 ?
                                        <div className="comment">
                                            <Avatar src={item.userImage} className="comment_img" />
                                            <div  className="comment_text" >{item.comment}</div>
                                        </div> : <span></span>
                                ))
                            }
                            
                        </div>
                        <div className="upload_top">
                            <div>
                                <Avatar src={JSON.parse(localStorage.getItem("user")).userImage} className="upload_img"/>
                            </div>
                            <div>
                                <input onKeyDown={this.submitComment} onChange={(event)=>{this.state.comment=event.currentTarget.value}}  className="upload_box" placeholder="What's on your mind ?" type="text" />
                            </div>
                        </div>
                    </div>
                    
                    

                </Paper>
            </div>
         );
    }
}
 
export default Post;