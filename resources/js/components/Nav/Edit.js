import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Edit = props =>{

    const [editState, setEditState] = useState('0')

    const R = require('ramda');



    return (
        <div className="form-edit">
            <div className="form-edit__header">
                <h2 className="form-edit__title">Titre menu</h2>
            </div>
            <Accordion defaultActiveKey='0'>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>setEditState('0')} eventKey="0">
                        <span className="edit-card__title">INSERER</span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>setEditState('1')} eventKey="1">
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