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
    const [navStyle, setNavStyle]=useState(
        {
            n1:
            {
                ul: {display: 'flex', flexDirection: 'row'},
                li: {border: 'none', borderRadius:'0px', borderSize:'1px', borderColor:'#000000', backgroundColor: '#000000', width: '200px', textAlign: 'center'},
                a: {color: 'white', textTransform:'initial', textDecoration: 'initial', fontWeight: '300', fontSize: '22px', padding: '5px'}
            },
            n2:
            {
                ul: {flexDirection: 'row'},
                li: {border: 'none', borderRadius:'0px', borderSize:'1px', borderColor:'#000000', backgroundColor: '#666666', width: '200px', textAlign: 'left'},
                a: {color: '#000000', textTransform:'initial', textDecoration: 'initial', fontWeight: '300', fontSize: '22px', padding: '5px'}
            }
        })


   

    const addElt = (elt)=>{
        elt.props.style= (getLvlElt(elt)===1?navStyle.n1:navStyle.n2).a
        let elts = R.clone(elements);
        elts= elts.concat(elt);
        //console.log('The new list is:')
        //console.log(elts)
        setElements(elts);
    }

    const updateElt = (elt)=>{
        //console.log('The following elt is supposed to be add:')
        //console.log(elt)
        let elts = R.clone(elements);
        elts[elt.key] = elt
        //console.log('The new list is:')
        //console.log(elts)
        setElements(elts);
    }

    const updateNavStyle=(newStyle)=>{
        setNavStyle(newStyle)
    }

    const getChilds = (parent)=>{
        let childs = elements.filter(element => element.props.parent===parent.key) // Tableau avec liste des enfants du parent
        let link = <a target="_blank" style={getLvlStyle(parent).a} href={parent.props.link}>{parent.props.name}</a>
        console.log(childs)
        if (childs.length > 0){ // Cherchons les enfants des enfants à condition d'avoir des enfants
            childs = <ul style={navStyle.n2.ul} className="dropdown-content">{
                childs.map((elt,id)=>{
                return (<li key={id} style={navStyle.n2.li} >{getChilds(elt)}</li>) // On prend la liste des enfant, et on la remplace par [[p1,e1],[p2,e2], ..., [pn,en]]
            })}</ul>
        }
        return [link,childs]
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

    const getLvlStyle = (elt)=>{
        if (getLvlElt(elt)===1)
            return navStyle.n1
        else   
            return navStyle.n2
    }

    const showNav = ()=>{
        elements.map(elt=>elt.props.style=(getLvlElt===1?navStyle.n1:navStyle.n2).a)
        let parents = elements.filter(element => element.props.parent===-1)
        let nav = parents.map((elt,id)=>{
            return (<li className="dropdown" key={id} style={navStyle.n1.li}>{getChilds(elt)}</li>)
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
                <Edit navStyle={navStyle} onClickAdd={addElt} onClickUpdate={updateElt} updateNavStyle={updateNavStyle} elements={elements} getLvlElt={getLvlElt}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition menu</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">
                            <h3>Menu de navigation</h3>
                            <nav><ul style={ navStyle.n1.ul }>{showNav()}</ul></nav>
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