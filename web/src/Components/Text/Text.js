import React, { Component } from 'react';

import './Text.css';

class Text extends Component{
    
    render()
    {
        return(
            <div className="text-container">
                <h1>{this.props.text}</h1>
            </div>
        );
    }
}

export default Text;