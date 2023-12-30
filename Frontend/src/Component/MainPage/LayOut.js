import React, { Component } from 'react';
import './Mainpage.css';
import { Grid } from '@mui/material';
import LeftSide from './LeftSidePanel/LeftSide';
import StatusBar from './StatusBar/StatusBar';
import UploadSection from './UploadSection/UploadSection';
import PostContainer from './PostContainer/PostContainer';
import RightSidePanel from './RightSidePanel/RightSidePanel';

class LayOut extends Component {
    constructor(props) {
        super(props);
    }
    state = { 

    }

    letUpdate =() =>{
        this.refs.child.getData(); 
    }
    letUpdate2 = () =>{
        this.refs.update2();
    }
    render() { 
        return (  
            <div className='mainpage__container'>
                <Grid container>
                    <Grid item xs = {3}>
                        <LeftSide/>
                    </Grid>
                    <Grid item xs = {6} className='middle__container'>
                        <StatusBar update={this.letUpdate2}/>
                        <UploadSection update = {this.letUpdate} />
                        <PostContainer ref="child"/>
                    </Grid>
                    <Grid item xs = {3}>
                        <RightSidePanel/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
 
export default LayOut;