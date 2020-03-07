import React, { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const R = require('ramda');


const Edit = props =>{

    const [titleEdit, setTitleEdit] = useState(false)

    // useEffect(()=>{
    // },[]);

    const svgUrl = (window.location.href.includes('edit')?'../':'')
    
    return (
        <div className="form-edit">
            <div className="form-edit__header" >
                <h2 onClick={(e)=>{setTitleEdit(true); $("#inputToFocus").focus()}} className={titleEdit?'d-none':''}>{props.tableName}<i className="fas fa-pen ml-auto"></i></h2>
                <input onBlur={()=>{setTitleEdit(false)}}  id='inputToFocus' className='d-block' style={titleEdit?{}:{border: 'none', width:'0', height: '0'}}  value={props.tableName} onChange={(e)=>props.setTableName(e.target.value)}/>
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
                                        <input data-table='nbLines' className="w-75 border rounded text-center" onChange={props.tableHandler} value={props.table.parameters.nbLines} type="number"/>
                                    </div>
                                    <div className="col">
                                        <p>Colonnes</p>
                                        <input data-table='nbColumns' className="w-75 border rounded text-center" onChange={props.tableHandler} value={props.table.parameters.nbColumns} type="number"/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">INSERER</h4>
                                <div className="row">
                                    <div className="col">
                                        <p>Ligne</p>
                                        <input data-table='lineBefore' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/insert-line-bottom.svg'}/>
                                        <input data-table='lineAfter' onClick={props.tableHandler} className="ml-2 border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/insert-line-top.svg'}/>
                                    </div>
                                    <div className="col">
                                        <p>Colonne</p>
                                        <input data-table='columnBefore' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/insert-column-right.svg'} />
                                        <input data-table='columnAfter' onClick={props.tableHandler} className="ml-2 border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/insert-column-left.svg'}/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">FUSIONNER</h4>
                                <p>Fusion de cellules</p>
                                <input data-table='fusion' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/fusion-button.svg'}/>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">SUPPRIMER</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <p>Ligne</p>
                                        <input data-table='lineDelete' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/delete-line.svg'}/>
                                    </div>
                                    <div className="col-6">
                                        <p>Colonne</p>
                                        <input data-table='columnDelete' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/delete-column.svg'}/>
                                    </div>
                                    <div className="col-6">
                                        <p>Cellule</p>
                                        <input data-table='cellDelete' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" src={svgUrl+'../../resources/assets/images/delete-cell.svg'}/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">EN-TÊTE</h4>
                                <p>Activer ligne d'en tête</p>
                                <button className="border-0 bg-transparent" type="number">
                                    <img src={svgUrl+'../../resources/assets/images/header-button.svg'}/>
                                </button>
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