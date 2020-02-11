import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Element from './Element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Edit = props =>{

    const [isNew, setIsNew] = useState(true)

    const [newElt, setNewElt] = useState(<Element key={0} name="" pos="" link=""/>)
    const [editElt, setEditElt] = useState(<Element />)

    const [counter, setCounter] = useState(0);

    const R = require('ramda');

    const prepareNextElt = ()=>
    {
        setCounter(counter+1)
        setNewElt(<Element key={counter+1} name="" pos="" link=""/>)
    }

    const setElt = (elt)=>{
        if(isNew)
            setNewElt(elt)
        else
            setEditElt(elt)
    }

    const handleChangeElt = (e)=>{
        let field = e.target;
        let elt = R.clone(isNew?newElt:editElt);
        switch(field.id){
            case 'eltName' : elt.props.name = field.value; break;
            case 'eltLink' : elt.props.link = field.value; break;
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
        return (
        <>
            <label>Nom</label>
            <input type="text" value={elt.props.name} id="eltName" onChange={handleChangeElt}/>
            <br/>
            <label>Lien</label>
            <input type="text" value={elt.props.link} id="eltLink" onChange={handleChangeElt}/>
            <br/>
            <label>Parent</label>
            <select>
                <option value="">-- Selection du parent --</option>
            </select>
            <button onClick={()=>{props.onClickUpdate(elt); prepareNextElt()}}>Valider</button>
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