import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
//import '../styles/Form.css'
import Edit from './Form/Edit'
import Field from './Form/Field'

import axios from "axios";
import { none } from "ramda";

const Form = props => {

    const [myJson, setMyJson] = useState({})
    const [formName, setFormName] = useState('Formulaire de contact (click to change title)')

    /* STATES */
    /* Form states */
    const [fields, setFields] = useState([]);
    const [keys, setKeys] = useState(0);

    const [forms, setForms] = useState()

    const testFields = [<Field key={0} getKey={0} pos={0} format='input' type='text' label='1'/>,
    <Field key={1} getKey={1} pos={1} format='input' type='text' label='2'/>,
    <Field key={2} getKey={2} pos={2} format='input' type='text' label='3'/>]


    const R = require('ramda');


    const convertToData = ()=>{
        console.log('Conversion à un format adapté...')
        let ourJson = {
                        name: formName,
                        nbFields: fields.length,
                        fields: fields.map(field=>{return({format:field.props.format, type:field.props.type, label:field.props.label, values:field.props.values})})
                    }
            
        console.log(ourJson)
        setMyJson(ourJson)
    }

    const loadFromBDD = ()=>{
        console.log('Chargement depuis la BDD...')
        const url = "http://localhost:8090/Projets/jamgati/public/form/";
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
            loadedForm=loadedForm.concat(<Field key={index} type={field.type} label={field.label} format={field.format} values={field.values} />)
        })
        setFields(loadedForm)
    }

    const showForms = ()=>{
        return(<>{forms}</>)
    }

    const sendToBDD = ()=>{
        console.log('Envoie en cours à la BDD...')
        let url="http://localhost:8090/Projets/jamgati/public/form"
        axios.post(url,myJson).then(response=>{
            console.log(response.data)
        })
    }

    /* FUNCTIONS */

    // const updatePos = ()=>{
    //     let updatedFields = R.clone(fields);
    //     updatedFields.map((field, index)=>{
    //         field.props.pos = index;
    //     })
    //     setFields(updatedFields)
    // }

    const addField = (field)=>{
        setKeys(keys+1);
        let newField = <Field key={keys} pos={keys} getKey={keys} format={field.props.format} type={field.props.type} label={field.props.label} values={field.props.values}/>
        setFields(fields.concat(newField));
    }

    const updateFields = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields[field.props.getKey] = field;
        let shuffling = Math.sign(field.props.getKey-field.props.pos);
        if(shuffling!==0){ //SI ON MONTE OU ON DESCEND
            updatedFields.forEach((cell,index)=>{ 
                if ((index<=field.props.pos&&index>field.props.getKey)||(index>=field.props.pos&&index<field.props.getKey)){
                    cell.props.pos+=shuffling;          
                }
                if (index!==field.props.getKey)
                    cell.props.getKey=cell.props.pos;
            })
            updatedFields.sort((a,b)=> a.props.pos-b.props.pos);
            updatedFields[field.props.pos].props.getKey=updatedFields[field.props.pos].props.pos;
        }
        setFields(updatedFields);
    }

    const deleteField = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields.splice(field.props.getKey,1);
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
            <div className="form-container">
                <Edit onClickAdd={addField} onClickUpdate={updateFields} onClickDelete={deleteField} fields={fields}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition formulaire</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">

                            <h3><input style={{border: 'none', width: '100%'}} value={formName} onChange={(e)=>setFormName(e.target.value)}/></h3>
                     
                            {updatefieldsForm()}

                            <button onClick={()=>console.log(fields)}>PRINT FIELDS</button> <br/>
                            <button onClick={convertToData}>CONVERT FIELDS TO DATA</button> <br/>
                            <button onClick={sendToBDD}>SEND TO BDD</button> <br/>
                            <button onClick={loadFromBDD}>LOAD TO BDD</button> <br/>

                        </div>
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