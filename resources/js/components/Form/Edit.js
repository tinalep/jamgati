import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Field from './Field'

const Edit = props =>{
    
    //Variables et states

    const R = require('ramda');

    const [isNew, setIsNew] = useState(true)
    const types ={simple:{'text' : 'Texte simple', 'textarea' : 'Texte multi-ligne', 'date' : 'Date', 'number' : 'Nombre' , 'tel' : 'Numéro de téléphone','email':'Addresse e-mail','url':'Lien hypertexte','password':'Mot de passe','file':'Fichier','text-hidden':'Caché'},
                multiple:{'checkbox':'Cases à cocher', 'radio':'Boutons radios', 'list': 'Liste déroulante'},
                special:{'button':'Boutton', 'text-hidden': 'Champ invisible'}}
    const [newField, setNewField] = useState(<Field key={0} type='' label='' pos={0} values={['','','']} origin={-1}/>)
    const [editField, setEditField] = useState(<Field pos={-1} origin={-1} />)
    const [key, setKey] = useState(0);

    /**
     * Setteur conditionnel: en fonction de si on crée ou modifie un champs
     * 
     * Retourne void
     */
    const setField = (field) =>{
        if(isNew) setNewField(field)
        else setEditField(field)
    }

    //Handler universel de tous les champs de saisie admin
    const handleChangeField = (e)=>{
        let input = e.target
        let field = R.clone(isNew?newField:editField);
        console.log(e.target)
        switch(input.dataset.field){
            case 'type' : field.props.type = input.value; break;
            case 'label' : field.props.label = input.value; break;
            case 'pos' : field.props.pos = input.value-1; break;
            case 'update' : field = (input.value>-1?props.fields[input.value]:field) ; field.props.origin =  parseInt(input.value); field.props.pos = parseInt(input.value);  break;
            case 'values' : field.props.values[input.dataset.id]= input.value; break;
            case 'plus' : field.props.values.splice(input.dataset.id,0,'');  break;
            case 'minus' : field.props.values.splice(input.dataset.id,1); break;

            default : console.log('Problem in switch')
        }
        setField(field)
    }


    /**
     * Permet de créér ou modifier un champ
     * 
     * Retourne du HTML
     */
    const displayEditField = (field=newField.props) =>{
        return(
            <React.Fragment>

                {/* Selecteur de champ */}
                <label className="edit-card__type">Type de champ:</label>
                <select data-field="type" value={field.type} onChange={handleChangeField}>
                        <option value="">--Selection du type de champ à insérer--</option>
                    <optgroup label="Champs de saisie simple">
                        {Object.keys(types.simple).map((key,id)=>{return <option key={id} value={key}>{types.simple[key]}</option>})}
                    </optgroup>
                    <optgroup label="Champs de selection">
                        {Object.keys(types.multiple).map((key,id)=>{return <option key={id} value={key}>{types.multiple[key]}</option>})}
                    </optgroup>
                    <optgroup label="Champs spéciaux">
                        {Object.keys(types.special).map((key,id)=>{return <option key={id} value={key}>{types.special[key]}</option>})}
                    </optgroup>
                </select>


                {field.type==='' ? null :
                    <>
                        <br/>
                        {/* Selecteur de nom de champ (label) */}
                        <label className="edit-card__type">Saisir un nom:</label><br/>
                        <input data-field="label" value={field.label} onChange={handleChangeField}/>

                        <br/>
                        <br/>
                        <br/>

                        {field.type==='checkbox'||field.type==='radio'||field.type==='list'?
                        <>  
                            {/* Selecteur de valeurs pour les champs multiples (apparaît si on a un type checkbox/radio/list) */}
                            <p className="edit-card__type" >Valeurs possibles:</p>
                            {field.values.map((value,id)=>{
                                return (
                                <React.Fragment key={id}>
                                    <input data-field='values' data-id={id} onChange={handleChangeField} placeholder={'Valeur '+(id+1)} value={value}/>
                                    {/* Boutons d'ajout de valeurs possibles pour les champs multiples */}
                                    <button tabIndex="-1"  className="custom-fa custom-faplus" data-field='plus' data-id={id} onClick={handleChangeField}>+</button>
                                    <button tabIndex="-1" className="custom-fa custom-faminus" data-field='minus' data-id={id} onClick={handleChangeField}>-</button>
                                </React.Fragment>)
                            })}
                            <button data-field='plus' data-id={field.values.length} onClick={handleChangeField}>Valeur supplémentaire</button>
                            <br/>
                            <br/>
                            <br/>
                        </>: null}

                        {/* Selecteur de position des champs aussein du formulaire */}
                        <label className="edit-card__type">Position du champ:</label><br/>
                        <input data-field="pos" value={field.pos+1} min={1} max={props.fields.length+(isNew?1:0)} type="number" onChange={handleChangeField}/>
                        <div className="info-bulle">
                            <p>    
                            {isNew?
                                (field.pos===0||field.pos===props.fields.length?
                                    'Le champ sera placé '+(field.pos===0?'au début':'à la fin')+' du formulaire.'
                                    :
                                    'Le champ sera placé entre le champ "'+props.fields[field.pos-1].props.label+'" et le champ "'+props.fields[field.pos].props.label+'".')
                                :
                                (field.pos===field.origin?
                                    'Le champ ne sera pas déplacé'
                                    :
                                    (field.pos===0||field.pos===props.fields.length-1?
                                        'Le champ sera déplacé '+(field.pos===0?'au début':'à la fin')+' du formulaire.'
                                        :
                                        'Le champ sera déplacé entre le champ "'+props.fields[field.pos-(field.pos>field.origin?0:1)].props.label+'" et le champ "'+props.fields[field.pos+(field.pos>field.origin?1:0)].props.label+'".'
                                    )
                                )
                            }
                            </p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </>
                }
            </React.Fragment>)
    }

    return (
        <div className="form-edit">
            {/* Fenêtre d'édition de champ (RECTANGLE DE GAUCHE) */}
            <div className="form-edit__header">
                <h2 className="form-edit__title">Titre formulaire</h2>
            </div>
            <Accordion defaultActiveKey='0'>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>{setIsNew(true); console.log(newField); console.log(editField)}} eventKey="0">
                        <span className="edit-card__title">INSERER</span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                            {displayEditField()}
                            {newField.props.type==='' ? null : 
                                <>   
                                    <button onClick={()=>{props.onClickAdd(newField); setField(<Field key={key+1} type='' label='' origin='' pos={props.fields.length+1} values={['','','']} />); setKey(key+1);}}>Ajouter au formulaire</button>  
                                </>}
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>{setIsNew(false); console.log(newField); console.log(editField)}} eventKey="1">
                        <span className="edit-card__title">MODIFIER
                        </span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <div className="edit-card__body">
                            <div className="edit-card__section">            
                                <span className="edit-card__type">Champ à modifier:</span>
                                <div className="select-field">
                                    <select data-field="update" value={editField.props.pos} onChange={handleChangeField}>
                                        <option value={-1}>--Selection du champ à modifier--</option>
                                        {props.fields.map((field,index)=>{
                                            return(
                                                <option key={index} value={index}>{field.props.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                
                                <div className="custom-field">
                                    {editField.props.pos===-1 ? null : 
                                    <>   
                                        {displayEditField(editField.props)}
                                        <button onClick={()=>{props.onClickUpdate(editField);setField(<Field pos={-1} />);}}>Mettre à jour</button>    
                                        <button onClick={()=>{props.onClickDelete(editField);setField(<Field pos={-1} />);}}>Supprimer</button>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
            </Accordion>
        </div>
        )

}

export default Edit;