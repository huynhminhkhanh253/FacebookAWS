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
        fetch("http://facebookaws-1465022890.ap-southeast-1.elb.amazonaws.com/api/postService/getPost")
            .then(respone => respone.json())
            .then(json => {
                this.setState({data : json});
            })
            .catch(error=>{
                
            })
        // let json = [
        //     {
                
        //     },
        //     {

        //     }
        // ]

        // this.setState({data : json});
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
