import React, { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const R = require('ramda');


const Edit = props =>{

    const [titleEdit, setTitleEdit] = useState(false)

    // useEffect(()=>{
    // },[]);

    
    return (
        <div className="form-edit">
            <div className="form-edit__header" >
                <h2 onClick={(e)=>{setTitleEdit(true); e.target.nextSibling.focus()}} className={titleEdit?'d-none':''}>{props.tableName}<i className="fas fa-pen ml-auto"></i></h2>
                <input onBlur={()=>{setTitleEdit(false)}}  id='inputToFocus' className='d-block' style={titleEdit?{}:{border: 'none', width:'0', height: '0'}}  value={props.tableName} onChange={(e)=>props.setNavName(e.target.value)}/>
            </div>
            <Accordion defaultActiveKey='0'>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div"  eventKey="0">
                        <span className="edit-card__title">Tableau</span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">NOMBRE</h4>
                                <div className="row">
                                    <div className="col">
                                        <p>Lignes</p>
                                        <input className="w-75 border rounded" type="number"/>
                                    </div>
                                    <div className="col">
                                        <p>Colonnes</p>
                                        <input className="w-75 border rounded" type="number"/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">INSERER</h4>
                                <div className="row">
                                    <div className="col">
                                        <p>Lignes</p>
                                        <button className="border-0 bg-transparent" type="number">
                                            <img src="../../resources/assets/images/insert-line-bottom.svg"/>
                                        </button>
                                        <button className="border-0 bg-transparent" type="number">
                                            <img src="../../resources/assets/images/insert-line-top.svg"/>
                                        </button>
                                    </div>
                                    <div className="col">
                                        <p>Colonnes</p>
                                        <button className="border-0 bg-transparent" type="number">
                                            <img src="../../resources/assets/images/insert-column-left.svg"/>
                                        </button>
                                        <button className="border-0 bg-transparent" type="number">
                                            <img src="../../resources/assets/images/insert-column-right.svg"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">FUSIONNER</h4>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">SUPPRIMER</h4>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">EN-TÊTE</h4>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" eventKey="1">
                        <span className="edit-card__title">Style
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
                </div>
            </Accordion>
        </div>
        )

}

export default Edit;