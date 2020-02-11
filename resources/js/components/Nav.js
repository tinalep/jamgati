import React, { useState } from "react"
import ReactDOM from 'react-dom';
import Edit from './Nav/Edit'
import Element from './Nav/Element'


const Nav = props => {

    /* STATES */

    const [elements, setElements]=useState([]);
    const [navStyle, setNavStyle]=useState({display:"flex"})


    const R = require('ramda');

    const updateNav = (elt)=>{
        console.log('The following elt is supposed to be add')
        console.log(elements)
        let elts = R.clone(elements);
        elts= elts.concat(elt);
        setElements(elts);
    }

    const updateNavStyle=(newStyle)=>{
        setNavStyle(newStyle)
    }

    const showNav = ()=>{
        return(
            <>
                {elements}
            </>
        );
    }


    return (
        <div className="Form">
            <div className="form-container">
                <Edit navStyle={navStyle} onClickUpdate={updateNav} updateNavStyle={updateNavStyle}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition menu</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">
                            <h3>Menu de navigation</h3>
                            <nav><ul style={{display:navStyle.display}}>{showNav()}</ul></nav>
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