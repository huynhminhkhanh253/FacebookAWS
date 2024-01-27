import React, { Component } from 'react'
import './RightSidePanel.css';
import ImageLayout from '../ImageLayout';
import covid from "../../../ImageSet/covid.png";
import groups from "../../../ImageSet/groups.png";
import memories from "../../../ImageSet/memories.png";

class RightSidePanel extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        data :[],
        
    }
    getData=()=>{//fake json data
        // let jsondata =[
        //     {
        //         "image": '',
        //         "text": "User1"
        //     },
        //     {
        //         "image": '',
        //         "text": "User2"
        //     },
        //     {   
        //         "image": '',
        //         "text": "User3" 
        //     },
        //     {
        //         "image": '',
        //         "text" : "user4"
        //     }
        // ];
        //this.setState({data : jsondata});
        
        const thisContext = this;
        fetch("http://localhost:8080/api/userService/getAllUsers")
        .then(respone => respone.json())
        .then(json => {
            thisContext.setState({data: json})
        })
        .catch(error => {

        })
    }
    componentDidMount() {
        this.getData();
    }
    render() { 
        return ( 
            <div className='rightside__container'>
                <div className='rightside__header'>
                    Contacts
                </div>
                <div className='rightside__contents'>
                    {
                        this.state.data.map((item)=>(
                            <ImageLayout image={item.userImage} status={item.active} text={item.userName} />
                        ))
                    }
                </div>
            </div>
         );
    }
}
 
export default RightSidePanel;