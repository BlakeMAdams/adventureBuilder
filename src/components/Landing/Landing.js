// Displays game description text and "log in" button
import './../../App.css';
import Tavern from '../Tavern/Tavern'

import React, { Component } from 'react';

export default class Landing extends Component {
    render () {
        return (
            <div className="center bimage1">
             Landing
            <Tavern />
            </div>
            
        );
    }
}

