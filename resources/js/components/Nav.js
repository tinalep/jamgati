import React, { useState } from "react"
import ReactDOM from 'react-dom';
import Edit from './Nav/Edit'


const Nav = props => {

    /* STATES */


    const R = require('ramda');


    return (
        <div className="Form">
            <div className="form-container">
                <Edit />
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition menu</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">

                            <h3>Menu de navigation</h3>

                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Nav;

if (document.getElementById('nav-root')){
    ReactDOM.render(<Nav />, document.getElementById('nav-root'))
}