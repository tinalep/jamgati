import React, { useState } from "react"
import ReactDOM from 'react-dom';
import Edit from './Nav/Edit'
import Element from './Nav/Element'
import { InputGroup } from "react-bootstrap";

const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Nav = props => {

    /* STATES */

    const [elements, setElements]=useState([]);
    const [navStyle, setNavStyle]=useState({display:"flex"})


   

    const addElt = (elt)=>{
        //console.log('The following elt is supposed to be add:')
        //console.log(elt)
        let elts = R.clone(elements);
        elts= elts.concat(elt);
        //console.log('The new list is:')
        //console.log(elts)
        setElements(elts);
    }

    const updateNavStyle=(newStyle)=>{
        setNavStyle(newStyle)
    }

    const getChilds = (parent)=>{
        let childs = elements.filter(element => element.props.parent===parent.key) // Tableau avec liste des enfants du parent
        if (childs.length > 0){ // Cherchons les enfants des enfants à condition d'avoir des enfants
            childs = <ul >{
                childs.map((elt,id)=>{
                return (<li key={id}>{getChilds(elt)}</li>) // On prend la liste des enfant, et on la remplace par [[p1,e1],[p2,e2], ..., [pn,en]]
            })}</ul>
        }
        return [parent,childs]
    }

    const getLvlElt = (elt, counter=1)=>{
        if (elt.props.parent === -1){
            return counter
        }
        else{
            let parent = elements.find(element => element.key === elt.props.parent)
            return (getLvlElt(parent, counter+1))
        }
    }

    const showNav = ()=>{
        let parents = elements.filter(element => element.props.parent===-1)
        let nav = parents.map((elt,id)=>{
            return (<li key={id}>{getChilds(elt)}</li>)
        })
        return(
            <>
                {nav}
            </>
        );
    }

    return (
        <div className="Form">
            <div className="form-container">
                <Edit navStyle={navStyle} onClickAdd={addElt} updateNavStyle={updateNavStyle} elements={elements} getLvlElt={getLvlElt}/>
                
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