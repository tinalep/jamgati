import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Form/Edit'
import Field from './Form/Field'

/* External functions */
import axios from "axios";
import {process, copyToClipBoard} from '../functions.js'

const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Form = props => {
    
    const [mode, setMode] = useState('create')
    const [formName, setFormName] = useState('Formulaire de contact (click to change title)')
    const [fields, setFields] = useState([]);
    const [exportMode, setExportMode] = useState('default')

    useEffect(()=>{
        if(document.getElementById('form-root').dataset.form){
            setMode('edit')
            let url = window.location.href.replace('/edit','/load')
            axios.get(url).then(response=>{
                if(response.data=='forgiven')
                    console.log('Pas le droit de charger ce formulaire')
                else
                    loadForm(response.data)})
        }
    }, []);

    const exportPopup = (on)=>{
        document.querySelector('#exportPopup').style.display = (on?'block':'none');
        setExportMode('default')
    }

    const formToJson = ()=>{
        let json = {
                    name: formName,
                    nbFields: fields.length,
                    fields: fields.map(field=>{return({type:field.props.type, label:field.props.label, values:field.props.values})})
        }
        return json;
    }

    const save = ()=>{
        let json = formToJson();
        if(mode==='create'){
            const url = window.location.href.replace('/create','');
            axios.post(url,json).then(response=>{
                window.location = response.data.redirect;
            })
        }
        else if(mode==='edit'){
            const url = window.location.href.replace('/edit','');
            axios.put(url,json).then(response=>{
                console.log(response.data)
            })
        }

        setTimeout(function(){ 
            $('.modal.save').modal('hide')
         }, 5000);
    }

    const loadForm = (form)=>{
        setFormName(form.name);
        let loadedForm = [];
        JSON.parse(form.fields).map((field,index)=>{
            loadedForm=loadedForm.concat(<Field key={index} type={field.type} label={field.label} values={field.values} pos={index} origin={index}/>)
        })
        console.log(loadedForm)
        setFields(loadedForm)
    }

    const showForm = (mode)=>{
        return(beauty_html(process(document.querySelector('#formPreview').outerHTML)).replace(/ readonly=""/g,''))
    }



    const addField = (field)=>{
        let updatedFields=fields.concat(field)
        setFields(updatedFields);
        console.log(updatedFields)
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
        console.log(updatedFields)
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
                    {exportMode=='default'?null:<>
                    <div className="show__exporttext">
                        <pre>
                            <code id="toClipboard">
                                {showForm(exportMode)}
                            </code>
                        </pre>
                    </div>
                        <button className="text-center" onClick={()=>copyToClipBoard(showForm(exportMode))}>Copier dans le presse-papier</button>
                    </>}
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
            <div className="form-container">
                <Edit onClickAdd={addField} onClickUpdate={updateFields} onClickDelete={deleteField} fields={fields} />
                {/* Partie où est afficher le contenu créé */}
                <div className="form-show">
                    <div className="form-show__header d-flex justify-content-between">
                        <h2 className="form-show__title">Edition formulaire</h2>
                        <div className="form-show__buttons">
                            <button className="button button-bgnone" onClick={()=>exportPopup(true)}>Exporter</button>
                                
                            <button data-toggle="modal" data-target="#saveModal" className="btn-save button button-bgred button-no-border" onClick={save}>Sauvegarder</button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                            <h3><input style={{border: 'none', width: '100%'}} value={formName} onChange={(e)=>setFormName(e.target.value)}/></h3>
                        </div>
                        <div className="form-show__preview" id="formPreview">

                    
                            {updatefieldsForm()}

                            

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