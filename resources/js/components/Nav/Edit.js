import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Element from './Element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Edit = props =>{

    const [isNew, setIsNew] = useState(true)

    const [newElt, setNewElt] = useState(<Element key={0} name="" pos="" link="" parent="no" fresh="true" />)
    const [editElt, setEditElt] = useState(<Element />)

    const [counter, setCounter] = useState(0);

    const R = require('ramda');

    const setElt = (elt)=>{
        if(isNew)
            setNewElt(elt)
        else
            setEditElt(elt)
    }

    const propsChanger = (props, value)=>{
        let elt = R.clone(isNew?newElt:editElt);
        switch(props){
            case 'name' : elt.props.name = value; break;
            case 'link' : elt.props.link = value; break;
        }
        return elt;
    }

    const handleChangeName = (e)=>{
        let elt = propsChanger('name',e.target.value)
        setElt(elt);
    }
    const handleChangeLink = (e)=>{
        let elt = propsChanger('link',e.target.value)
        setElt(elt);
    }

    const displayEditElement = (elt=newElt) =>{
        return (
        <>
            <label>Nom</label>
            <input type="text" value={elt.props.name} onChange={handleChangeName}/>

            <label>Lien</label>
            <input type="text" value={elt.props.link} onChange={handleChangeLink}/>

            <label>Parent</label>
            <select>
                <option value="">-- Selection du parent --</option>
            </select>
            <button onClick={(elt)=>props.onClickUpdate(elt)}>Valider</button>
            {newElt}
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
            </Accordion>
        </div>
        )

}

export default Edit;