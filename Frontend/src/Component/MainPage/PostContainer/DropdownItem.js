import React, { Component } from 'react'
import './Dropdownmenu.css';
import feelings from "../../../ImageSet/feelings.png";

class DropdownItem extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <li className = 'dropdownItem'>
                <img src={this.props.img}></img>
                <a> {this.props.text} </a>
            </li>
         );
    }
}
 
export default DropdownItem;