import { Avatar, Badge } from '@mui/material';
import React, { Component } from 'react';
import { getImage } from '../../getImage';


class ImageLayout extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div className="imageLayout__container">
                <div className="imageLayout__imglay">
                    {
                        this.props.status ? 
                        <Badge color="success" overlap="circle" badgeContent=" " variant="dot">
                            <Avatar className="imageLayout__img" src={(this.props.image)} />
                        </Badge>
                        : this.props.status==false ?
                        <Avatar className="imageLayout__img" src={(this.props.image)} />
                        : <Avatar className="imageLayout__img" src={this.props.image} />
                    }
                
                </div>
                <div className="imageLayout__text">
                    {this.props.text}
                </div>
            </div>
         );
    }
}
 
export default ImageLayout;