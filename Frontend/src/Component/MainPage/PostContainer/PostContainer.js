import React, { Component } from 'react'
import './PostContainer.css';
import Post from './Post';





class PostContainer extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        data: []
    }

    getData=()=>{
        const thisContext = this;
        fetch("http://ec2-54-151-243-101.ap-southeast-1.compute.amazonaws.com:8080/api/postService/getPost")
            .then(respone => respone.json())
            .then(json => {
                thisContext.setState({data : json});
            })
            .catch(error=>{
                
            })
    }
    componentDidMount() {
        this.getData();
    }


    render() { 
        return ( 
            <div>
                    {
                        this.state.data.map((item)=>(
                            <Post object = {item} />
                        ))
                    }

            </div>
         );
    }
}
 
export default PostContainer;
