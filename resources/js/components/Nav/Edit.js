import React, { useState, useEffect } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Element from './Element'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const R = require('ramda');


const Edit = props =>{

    const [isNew, setIsNew] = useState(true)
    const [levelMenu, setLevelMenu] = useState('0')

    const [newElt, setNewElt] = useState(<Element key={0} name="" lvl="" pos=""  origin="" link="" parent={-1} childs="" />)
    const [editElt, setEditElt] = useState(<Element pos={-1} />)

    useEffect(()=>{
        setNewElt(<Element key={props.elements.length} name="" lvl="" pos="" origin="" link="" parent={-1} childs=""/>)
        setEditElt(<Element pos={-1} />)
    },[props]);

    const setElt = (elt)=>{
        if(isNew)
            setNewElt(elt)
        else
            setEditElt(elt)
    }


    const handleChangeElt = (e)=>{
        let field = e.target;
        let elt = R.clone(isNew?newElt:editElt);
        switch(field.dataset.elt){
            case 'name' : elt.props.name = field.value; break;
            case 'link' : elt.props.link = field.value; break;
            case 'parent' : elt.props.parent = field.value; break;
            case 'update' :  elt = (field.value>-1?props.elements[field.value]:elt);  break;
            default : console.log("Problem with handleChangeElt")
        }
        setElt(elt);
    }

    const displayEditElement = (elt=newElt) =>{
        let p1 = props.elements.filter(element => props.getLvlElt(element) === 1)
        let p2 = props.elements.filter(element => props.getLvlElt(element) === 2)
        return (
        <>
            <label>Nom</label>
            <input type="text" data-elt="name" value={elt.props.name} onChange={handleChangeElt}/>
            <br/>
            <label>Lien</label>
            <input type="text" data-elt="link" value={elt.props.link} onChange={handleChangeElt}/>
            <br/>
            {props.elements.length ===0? null :
                <>
                    <label>Parent</label>
                    <select data-elt="parent" value={elt.props.parent} onChange={handleChangeElt}>
                        <option value={-1}>-- Selection du parent --</option>
                        <optgroup label="Menu">
                            {p1.map(elt => {return <option key={elt.key} value={elt.key}>{elt.props.name}</option>})}
                        </optgroup>
                        {p2.length===0? null :
                        <optgroup label="Sous-menu">
                            {p2.map(elt => {return <option key={elt.key} value={elt.key}>{elt.props.name} (contenu dans {(props.elements.find(element => element.key === elt.props.parent)).props.name})</option>})}
                        </optgroup>
                        }
                    </select>
                </>
            }    
        </>
        )
    }

    const displayEditStyle = () => {
        
        let weights = []
        for(let i=1; i<10 ;i++){
            weights.push(<option key={i} style={{fontWeight: i*100}} value={''+i*100}>{i+'00'}</option>)
        }

        return(<>
        <h4>Style du niveau {levelMenu}</h4>
        <h5 className="m-2"><b>Disposition:</b></h5>
            <input data-style='flexDirection' type="radio" checked={getN().ul.flexDirection==='row'} value='row' onChange={handleChangeStyle} />
            <label className="mr-2">Horizontale</label><br/>
            <input data-style='flexDirection' type="radio" checked={getN().ul.flexDirection==='column'} value='column' onChange={handleChangeStyle} />
            <label className="mr-2">Verticale</label>
            
        <h5 className="m-2"><b>Typographie:</b></h5>
            
            <label className="mr-2">Couleur:</label>
            <input data-style='textColor' value={getN().a.color} onChange={handleChangeStyle} type="color"/><br/>
            <label className="mr-2">Graisse:</label>
            <select data-style='fontWeight' value={getN().a.fontWeight} onChange={handleChangeStyle}>
                {weights}
            </select><br/>
            <label className="mr-2">Alignement horizontal:</label>
            <select data-style='textAlign' value={getN().li.textAlign} onChange={handleChangeStyle}>
                <option value='left' key={1}>Gauche</option>
                <option value='center' key={2}>Milieu</option>
                <option value='right' key={3}>Droite</option>
            </select><br/>
            <label className="mr-2">Taille:</label>
            <input data-style='fontSize' value={pxToNb(getN().a.fontSize)} onChange={handleChangeStyle} type="number"/>px<br/>
            <label className="mr-2">Casse:</label>
            <select data-style='textTransform' value={getN().a.textTransform} onChange={handleChangeStyle}>
                <option value='initial' key={1}>Unchangée</option>
                <option value='capitalize' key={2}>Titre</option>
                <option value='uppercase' key={3}>Majuscule</option>
                <option value='lowercase' key={4}>Minuscule</option>
            </select><br/>
            <label className="mr-2">Soulignement</label>
            <select data-style="textDecoration" value={getN().a.textDecoration} onChange={handleChangeStyle}>
                <option value='initial' key={1}>Non</option>
                <option value='underline' key={2}>Oui</option>
            </select><br/>


        <h5 className="m-2"><b>Boutons:</b></h5>

            <label className="mr-2">Couleur de fond:</label>
            <input data-style="bgColor" value={getN().li.backgroundColor} onChange={handleChangeStyle} type="color"/><br/>
            <label className="mr-2">Bordure:</label>
            <select data-style="border" value={getN().li.border} onChange={handleChangeStyle}>
                <option value='none' key={1}>Non</option>
                <option value='solid' key={2}>Oui</option>
            </select><br/>
            <label className="mr-2">Couleur de bordure:</label>
            <input data-style="borderColor" value={getN().li.borderColor} onChange={handleChangeStyle} type="color"/>
            <label className="mr-2">Taille de bordure:</label>
            <input data-style="borderSize" value={pxToNb(getN().li.borderSize)} onChange={handleChangeStyle} type="number"/>px<br/>
            {/* <label className="mr-2">Hauteur</label>
            <input data-style="width" value={pxToNb(getN().li.height)} onChange={handleChangeStyle} type="number"/>px<br/> */}
            <label className="mr-2">Largeur:</label>
            <input data-style="height" value={pxToNb(getN().li.width)} onChange={handleChangeStyle} type="number"/>px<br/>
        </>)
    }

    const handleChangeStyle = (e) =>{
        let target = e.target
        let style = R.clone(props.navStyle)
        let styleN = getN(style)
        switch(target.dataset.style){
            case 'chose' : setLevelMenu(target.value); return true;
            case 'flexDirection' : styleN.ul.flexDirection = target.value; break;
            case 'textColor' : styleN.a.color = target.value; break;
            case 'fontWeight' : styleN.a.fontWeight = target.value; break;
            case 'textAlign' : styleN.li.textAlign = target.value; break;
            case 'fontSize' : styleN.a.fontSize = target.value+'px'; break;
            case 'fontCase' : styleN.a.textTransform = target.value; break;
            case 'textDecoration' : styleN.a.textDecoration = target.value; break;
            case 'bgColor' : styleN.li.backgroundColor = target.value; break;
            case 'border' : styleN.li.border = target.value; break;
            case 'borderColor' : styleN.li.borderColor = target.value; break;
            case 'borderSize' : styleN.li.borderSize = target.value+'px'; break;
            case 'width' : styleN.li.width = target.value+'px'; break;
            case 'height' : styleN.li.height = target.value+'px'; break;
            default : console.log("Problem with handleChangeStyle")
        }
        console.log(style)
        style = setN(style,styleN)
        props.updateNavStyle(style)
    }

    const pxToNb = (p) =>{
        return(parseInt(p.replace('px','')))
    }

    const getN = (style=props.navStyle) =>{
        switch(levelMenu){
            case '0' : break;
            case '1' : return style.n1;
            case '2' : return style.n2;
            case '3' : return style.n3;
            default: console.log("Problem with getN")
        }
    }
    const setN = (style, value) =>{
        let newStyle = R.clone(style)
        switch(levelMenu){
            case '1' : newStyle.n1 = value; break;
            case '2' : newStyle.n2 = value; break;
            case '3' : newStyle.n3 = value; break;
            default: console.log("Problem with getLvlStyle")
        }
        return newStyle
    }


    return (
        <div className="form-edit">
            <div className="form-edit__header" >
                <h2 className="form-edit__title" >Titre menu</h2>
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
                                <button onClick={()=>{props.onClickAdd(newElt)}}>Valider</button>
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
                                <span className="edit-card__type">Champ à modifier:</span>
                                <div className="select-elt">
                                    <select data-elt="update" value={editElt.props.pos} onChange={handleChangeElt}>
                                        <option value={-1}>--Selection de l'élément à modifier--</option>
                                        {props.elements.map((elt,index)=>{
                                            return(
                                                <option key={index} value={index}>{elt.props.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                
                                <div className="custom-field">
                                    {editElt.props.pos===-1 ? null : 
                                    <>   
                                        {displayEditElement(editElt)}
                                        <button onClick={()=>{props.onClickUpdate(editElt)}}>Mettre à jour</button>    
                                        {/* <button onClick={()=>{props.onClickDelete(editElt)}}>Supprimer</button> */}
                                    </>}
                                </div>
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
                                <select data-style='chose' value={levelMenu} onChange={handleChangeStyle}>
                                   <option value={0}>-- Choisir un niveau de menu --</option>
                                   <option value={1}>Niveau 1</option>
                                   <option value={2}>Niveau 2</option>
                                   <option value={3}>Niveau 3</option>
                                </select>
                                <div className="custom-field">
                                    {levelMenu==='0' ? null : 
                                    <>   
                                        {displayEditStyle()} 
                                    </>}
                                </div>
                           </div>
                        </div>
                    </Accordion.Collapse>
                    <button onClick={()=>console.log(props.elements)}>TEST</button>
                </div>
            </Accordion>
        </div>
        )

}

export default Edit;