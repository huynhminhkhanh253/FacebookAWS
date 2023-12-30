import React, { Component } from 'react'
import './PostContainer.css';
import { Avatar, Paper } from '@mui/material';
import post from "../../../ImageSet/post_2.png";
import like from "../../../ImageSet/like.png";
import likebutton from "../../../ImageSet/likebutton.png";
import commentbutton from "../../../ImageSet/comment.png";
import sharebutton from "../../../ImageSet/share.png";
import { getImage } from '../../../getImage';

class Post extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        comments: [],
        comment: null
    }
    getData=()=>{
        const thisContext = this;
        fetch("http://ec2-54-151-243-101.ap-southeast-1.compute.amazonaws.com:8080/api/commentService/getAllComments/"+this.props.object.postID)
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

        fetch("http://ec2-54-151-243-101.ap-southeast-1.compute.amazonaws.com:8080/api/commentService/save",requestOptions)
        .then(response => response.json())
        .then(data =>{
            thisContext.getData();

        })
        .catch(error =>{

        })
    }
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