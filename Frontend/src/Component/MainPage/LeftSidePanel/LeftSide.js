import React, { Component } from 'react';
import ImageLayout from '../ImageLayout';
import covid from "../../../ImageSet/covid.png";
import groups from "../../../ImageSet/groups.png";
import memories from "../../../ImageSet/memories.png";
import messengerKids from "../../../ImageSet/messengerkids.png";
import ads from "../../../ImageSet/ads.png";
import adsmanager from "../../../ImageSet/admanager.png";
import blood from "../../../ImageSet/blood.png";
import business from "../../../ImageSet/business.png";



class LeftSide extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        data :[],
        
    }
    getData=()=>{//fake json data
        let jsondata =[
            {
                "image": JSON.parse(localStorage.getItem("user")).userImage,
                "text": JSON.parse(localStorage.getItem("user")).userName
            },
            {
                "image": covid,
                "text": "COVID19 Information Centre"
            },
            {   
                "image": groups,
                "text": "Friends" 
            },
            {
                "image": memories,
                "text" : "Memories"
            },
            {
                "image": messengerKids,
                "text":"Messenger Kids"
            },
            {
                "image": ads,
                "text":"Ad Center"
            },
            {
                "image": adsmanager,
                "text":"Ads Manager"
            },
            {
                "image": blood,
                "text":"Blood Donations"
            },
            {
                "image": business,
                "text":"Business Manager"
            }   
        ];
        this.setState({data : jsondata});
    }
    componentDidMount() {
        this.getData();
    }
    render() { 
        return ( 
            <div>
                {
                    this.state.data.map((item)=>(
                        <ImageLayout image={item.image} text={item.text} />
                    ))
                }
            </div>
         );
    }
}
 
export default LeftSide;