import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Form/Edit'
import Field from './Form/Field'

import axios from "axios";
import { none } from "ramda";

const Form = props => {

    function process(str) {

        var div = document.createElement('div');
        div.innerHTML = str.trim();
    
        return format(div, 0).innerHTML;
    }
    
    function format(node, level) {
    
        var indentBefore = new Array(level++ + 1).join('  '),
            indentAfter  = new Array(level - 1).join('  '),
            textNode;
    
        for (var i = 0; i < node.children.length; i++) {
    
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);
    
            format(node.children[i], level);
    
            if (node.lastElementChild == node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
    
        return node;
    }

    const [myJson, setMyJson] = useState({})
    const [formName, setFormName] = useState('Formulaire de contact (click to change title)')

    /* STATES */
    /* Form states */
    const [fields, setFields] = useState([]);

    const [forms, setForms] = useState()

    const [exportMode, setExportMode] = useState('default')

    const R = require('ramda');

    const beauty_html = require('js-beautify').html;

    const exportPopup = (on)=>{
        document.querySelector('#exportPopup').style.display = (on?'block':'none');
    }

    const convertToData = ()=>{
        console.log('Conversion à un format adapté...')
        console.log(window.location.href)
        let ourJson = {
                        name: formName,
                        nbFields: fields.length,
                        fields: fields.map(field=>{return({type:field.props.type, label:field.props.label, values:field.props.values})})
                    }
            
        console.log(ourJson)
        setMyJson(ourJson)
    }

    const loadFromBDD = ()=>{
        console.log('Chargement depuis la BDD...')
        const url = window.location.href.replace('/create','');
        axios.get(url).then(response => {
            let forms = response.data
            let array = forms.map((form, index)=>{
                return(<li key={index}>
                    <p>Formulaire "{form.name}"</p><button onClick={()=>loadForm(form)}>Charger</button>
                </li>)
            })
            setForms(array);
        })
    }

    const loadForm = (form)=>{
        setFormName(form.name);
        console.log(form)
        let loadedForm = [];
        JSON.parse(form.fields).map((field,index)=>{
            loadedForm=loadedForm.concat(<Field key={index} type={field.type} label={field.label} values={field.values} />)
        })
        setFields(loadedForm)
    }

    const showForms = ()=>{
        return(<>{forms}</>)
    }

    const showForm = (mode)=>{
        console.log(process(document.querySelector('#formPreview').outerHTML))
        return(beauty_html(document.querySelector('#formPreview').outerHTML))
    }

    const sendToBDD = ()=>{
        console.log('Envoie en cours à la BDD...')
        const url = window.location.href.replace('/create','');
        axios.post(url,myJson).then(response=>{
            console.log(response.data)
        })
    }


    const addField = (field)=>{
        setFields(fields.concat(field));
    }

    const updateFields = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields[field.props.origin] = field;
        let shuffling = Math.sign(field.props.origin-field.props.pos);
        if(shuffling!==0){ //SI ON MONTE OU ON DESCEND
            updatedFields.forEach((cell,index)=>{ 
                if ((index<=field.props.pos&&index>field.props.origin)||(index>=field.props.pos&&index<field.props.origin)){
                    cell.props.pos+=shuffling;          
                }
                if (index!==field.props.origin)
                    cell.props.origin=cell.props.pos;
            })
            updatedFields.sort((a,b)=> a.props.pos-b.props.pos);
            updatedFields[field.props.pos].props.origin=updatedFields[field.props.pos].props.pos;
        }
        setFields(updatedFields);
    }

    const deleteField = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields.splice(field.props.origin,1);
        setFields(updatedFields);
    }

    const updatefieldsForm = ()=>{
        return(
        <>
            {fields}
        </>
        );
    }



    return (
        <div className="Form">
            <div id='exportPopup'>
                <div className="form-show__popup">
                    <button className="form-show__close btn btn-danger" onClick={()=>exportPopup(false)}>X</button>
                    <h3 className="text-center">Quel format pour l'export?</h3>
                    <br/>
                    <br/>
                    <br/>
                    <div className="text-center">
                    <select value={exportMode} onChange={(e)=>(setExportMode(e.target.value))}>
                        <option value='default' style={{fontWeight: 'bold'}}>Choisir le format d'export</option>
                        <option value='html'>Texte HTML</option>
                        <option value='json'>Texte JSON</option>
                    </select>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div className="show__exporttext">
                        <pre>
                            <code>
                                {exportMode=='default'?null:(showForm(exportMode))}
                            </code>
                        </pre>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <button className="text-center">Copier dans le presse-papier</button>
                </div>
            </div>
            <div className="form-container">
                <Edit onClickAdd={addField} onClickUpdate={updateFields} onClickDelete={deleteField} fields={fields}/>
                {/* Partie où est afficher le contenu créé */}
                <div className="form-show">
                    <div className="form-show__header d-flex justify-content-between">
                        <h2 className="form-show__title">Edition formulaire</h2>
                        <div className="form-show__buttons">
                            <button onClick={()=>exportPopup(true)}>Exporter</button>
                                
                            <button>Sauvegarder</button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                            <h3><input style={{border: 'none', width: '100%'}} value={formName} onChange={(e)=>setFormName(e.target.value)}/></h3>
                        </div>
                        <div className="form-show__preview" id="formPreview">

                     
                            {updatefieldsForm()}

                            

                        </div>
                        <button onClick={convertToData}>CONVERT FIELDS TO DATA</button> <br/>
                        <button onClick={sendToBDD}>SEND TO BDD</button> <br/>
                        <button onClick={loadFromBDD}>LOAD TO BDD</button> <br/>
                        <div>
                            <ul>
                                {showForms()}
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Form;

if (document.getElementById('form-root')){
    ReactDOM.render(<Form />, document.getElementById('form-root'))
}