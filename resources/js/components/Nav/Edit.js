import React, { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Element from './Element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const R = require('ramda');


const Edit = props =>{

    const [isNew, setIsNew] = useState(true)

    const [newElt, setNewElt] = useState(<Element key={0} name="" pos="" origin="" link="" parent={-1} childs="" />)
    const [editElt, setEditElt] = useState(<Element />)

    useEffect(()=>{
        setNewElt(<Element key={props.elements.length} name="" pos="" origin="" link="" parent={-1} childs=""/>)
    },[props]);

    const setElt = (elt)=>{
        if(isNew)
            setNewElt(elt)
        else
            setEditElt(elt)
    }


    const handleChangeElt = (e)=>{
        let field = e.target;
        let elt = R.clone(isNew?newElt:editElt);
        switch(field.dataset.elt){
            case 'name' : elt.props.name = field.value; break;
            case 'link' : elt.props.link = field.value; break;
            case 'parent' : elt.props.parent = field.value; break;
            default : console.log("Problem with handleChangeElt")
        }
        setElt(elt);
    }

    const handleChangeNavStyle = (e)=>{
        let field = e.target;
        let navStyle = R.clone(props.navStyle);
        switch(field.id){
            case 'navStyleDisplay' : navStyle.display = (field.checked?"flex":"block"); break;
            default : console.log("Problem with handleChangeNavStyle")
        }
        props.updateNavStyle(navStyle)
    }
    

    const displayEditElement = (elt=newElt) =>{
        let p1 = props.elements.filter(element => props.getLvlElt(element) === 1)
        let p2 = props.elements.filter(element => props.getLvlElt(element) === 2)
        return (
        <>
            <label>Nom</label>
            <input type="text" data-elt="name" value={elt.props.name} onChange={handleChangeElt}/>
            <br/>
            <label>Lien</label>
            <input type="text" data-elt="link" value={elt.props.link} onChange={handleChangeElt}/>
            <br/>
            {props.elements.length ===0? null :
                <>
                    <label>Parent</label>
                    <select data-elt="parent" value={elt.props.parent} onChange={handleChangeElt}>
                        <option value={-1}>-- Selection du parent --</option>
                        <optgroup label="Menu">
                            {p1.map(elt => {return <option key={elt.key} value={elt.key}>{elt.props.name}</option>})}
                        </optgroup>
                        {p2.length===0? null :
                        <optgroup label="Sous-menu">
                            {p2.map(elt => {return <option key={elt.key} value={elt.key}>{elt.props.name} (contenu dans {(props.elements.find(element => element.key === elt.props.parent)).props.name})</option>})}
                        </optgroup>
                        }
                    </select>
                </>
            }    
        </>
        )
    }

    return (
        <div className="form-edit">
            <div className="form-edit__header">
                <h2 className="form-edit__title">Titre menu</h2>
            </div>
            <Accordion defaultActiveKey='0'>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>setIsNew(true)} eventKey="0">
                        <span className="edit-card__title">INSERER</span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                                {displayEditElement()}
                                <button onClick={()=>{props.onClickAdd(newElt)}}>Valider</button>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>setIsNew(false)} eventKey="1">
                        <span className="edit-card__title">MODIFIER
                        </span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                                
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" eventKey="2">
                        <span className="edit-card__title">STYLE
                        </span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                                <label className="mr-2">Horizontal?</label>
                                <input type="checkbox" id="navStyleDisplay" checked={props.navStyle.display==='flex'} onChange={handleChangeNavStyle} />
                           </div>
                        </div>
                    </Accordion.Collapse>
                </div>
            </Accordion>
        </div>
        )

}

export default Edit;