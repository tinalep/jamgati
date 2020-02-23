import React, { useState } from "react"
import ReactDOM from 'react-dom';
import Edit from './Nav/Edit'
import Element from './Nav/Element'
import { InputGroup } from "react-bootstrap";

const R = require('ramda');


const Nav = props => {

    /* STATES */

    const [elements, setElements]=useState([]);
    const [navStyle, setNavStyle]=useState({display:"flex"})


   

    const addElt = (elt)=>{
        console.log('The following elt is supposed to be add:')
        console.log(elt)
        let elts = R.clone(elements);
        elts= elts.concat(elt);
        console.log('The new list is:')
        console.log(elts)
        setElements(elts);
    }

    const updateNavStyle=(newStyle)=>{
        setNavStyle(newStyle)
    }

    const showNav = ()=>{
        let nav = []
        nav=nav.concat(elements.map((elt,id)=>{
            if(elt.props.parent===-1){
                let array = elements.filter(element => element.props.parent===elt.key)
                array=array.map((element,id)=>{return(<li key={id}>{element}</li>)})
                console.log(array)
                return(<li key={id}>{elt}{(array.length>0?<ul>{array}</ul>:null)}</li>)
            }
        }))
        return(
            <>
                {nav}
            </>
        );
    }

    // <ul id="menu-deroulant">
    //     <li><a href="#">Lien menu 1</a>
    //         <ul>
    //             <li><a href="#">lien sous menu 1</a></li>
    //             <li><a href="#">lien sous menu 1</a></li>
    //             <li><a href="#">lien sous menu 1</a></li>
    //             <li><a href="#">lien sous menu 1</a></li>
    //         </ul>
    //     </li><!--
    //     <li><a href="#">Lien menu 2</a>
    //         <ul>
    //             <li><a href="#">Lien sous menu 2</a></li>
    //             <li><a href="#">Lien sous menu 2</a></li>
    //             <li><a href="#">Lien sous menu 2</a></li>
    //             <li><a href="#">Lien sous menu 2</a></li>
    //         </ul>
    //     </li>
    // </ul>

    return (
        <div className="Form">
            <div className="form-container">
                <Edit navStyle={navStyle} onClickAdd={addElt} updateNavStyle={updateNavStyle} elements={elements}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition menu</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">
                            <h3>Menu de navigation</h3>
                            <nav><ul className="menu-deroulant" style={{display:navStyle.display}}>{showNav()}</ul></nav>
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