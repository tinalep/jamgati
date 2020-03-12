import React, { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const R = require('ramda');


const Edit = props =>{


    // useEffect(()=>{
    // },[]);

    const svgUrl = (window.location.href.includes('edit')?'../':'')
    
    return (
        <div className="form-edit">
            <div className="form-edit__header d-flex" >
                <textarea maxLength='30' id='inputToFocus' className='d-block'  value={props.tableName} onChange={(e)=>props.setTableName(e.target.value)}/>
                <i onClick={()=>{$("#inputToFocus").focus()}} className="fas fa-pen ml-auto"></i>
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
                                        <input disabled={props.selected.empty} data-table='lineBefore' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" alt="insert line bottom" src={svgUrl+'../../resources/assets/images/insert-line-bottom.svg'}/>
                                        <input data-table='lineAfter' onClick={props.tableHandler} className="ml-2 border-0 bg-transparent" type="image" alt="insert line top" src={svgUrl+'../../resources/assets/images/insert-line-top.svg'}/>
                                    </div>
                                    <div className="col">
                                        <p>Colonne</p>
                                        <input data-table='columnBefore' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" alt="insert column right" src={svgUrl+'../../resources/assets/images/insert-column-right.svg'} />
                                        <input data-table='columnAfter' onClick={props.tableHandler} className="ml-2 border-0 bg-transparent" type="image" alt="insert column left" src={svgUrl+'../../resources/assets/images/insert-column-left.svg'}/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">FUSIONNER</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <p>Fusionner</p>
                                        <input data-table='fusion' onClick={props.tableHandler} className="border-0 bg-transparent" alt="fusion" type="image" src={svgUrl+'../../resources/assets/images/fusion-button.svg'}/>
                                    </div>
                                    <div className="col-6">
                                        <p>Défusionner</p>
                                        <input data-table='unfusion' onClick={props.tableHandler} className="border-0 bg-transparent" alt="unfusion" type="image" src={svgUrl+'../../resources/assets/images/unfusion-button.svg'}/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">SUPPRIMER</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <p>Ligne</p>
                                        <input data-table='lineDelete' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" alt="delete line" src={svgUrl+'../../resources/assets/images/delete-line.svg'}/>
                                    </div>
                                    <div className="col-6">
                                        <p>Colonne</p>
                                        <input data-table='columnDelete' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" alt="delete column" src={svgUrl+'../../resources/assets/images/delete-column.svg'}/>
                                    </div>
                                    <div className="col-6">
                                        <p>Cellule</p>
                                        <input data-table='cellDelete' onClick={props.tableHandler} className="border-0 bg-transparent" type="image" alt="delete cell" src={svgUrl+'../../resources/assets/images/delete-cell.svg'}/>
                                    </div>
                                </div>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">EN-TÊTE</h4>
                                <div className="row">
                                    <div className="col-6">
                                        <p>Ligne d'en-tête</p>
                                        <input data-table='rowHeader' onClick={props.tableHandler} className={"bg-transparent p-1 "+(props.table.headers.row?"active":"")} alt="row-header-button" type="image" src={svgUrl+'../../resources/assets/images/row-header-button.svg'}/>
                                    </div>
                                    <div className="col-6">
                                        <p>Colonne d'en-tête</p>
                                        <input data-table='colHeader' onClick={props.tableHandler} className={"bg-transparent p-1 "+(props.table.headers.col?"active":"")} alt="row-header-button" type="image" src={svgUrl+'../../resources/assets/images/col-header-button.svg'}/>
                                    </div>
                                </div>
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
                                <h4 className="edit-card__subtitle">Tableau</h4>
                                <p>Bordures</p>
                                <p>Couleur de fond</p>
                            </div>
                            <div className="edit-card__section">
                                <h4 className="edit-card__subtitle">EN-TÊTE</h4>
                            </div>
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