import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Nav/Edit'
import Element from './Nav/Element'

const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Nav = props => {

    /* STATES */

    const [mode, setMode] = useState('create')
    const [elements, setElements]=useState([]);
    const [navName, setNavName] = useState('Mon menu (cliquez pour modifier)')
    const [hovered, setHovered]=useState(-1)
    const [navStyle, setNavStyle]=useState(
        {
            n1:
            {
                ul: {display: 'flex', flexDirection: 'row'},
                li: {border: 'none', borderRadius:'0px', borderSize:'1px', borderColor:'#000000', backgroundColor: '#000000', width: '200px', textAlign: 'center'},
                a: {color: '#ffffff', textTransform:'initial', textDecoration: 'initial', fontWeight: '300', fontSize: '22px', padding: '5px'}
            },
            n1Hover: // souligenement, couleur, police(couleur)
            {
                ul: {display: 'flex', flexDirection: 'row'},
                li: {border: 'none', borderRadius:'0px', borderSize:'1px', borderColor:'#000000', backgroundColor: '#ff0000', width: '200px', textAlign: 'center'},
                a: {color: '#ff0000', textTransform:'initial', textDecoration: 'underline', fontWeight: '300', fontSize: '22px', padding: '5px'}
            },
            n2:
            {
                ul: {flexDirection: 'row'},
                li: {border: 'none', borderRadius:'0px', borderSize:'1px', borderColor:'#000000', backgroundColor: '#666666', width: '200px', textAlign: 'left'},
                a: {color: '#000000', textTransform:'initial', textDecoration: 'initial', fontWeight: '300', fontSize: '22px', padding: '5px'}
            },
            n2Hover:
            {
                ul: {flexDirection: 'row'},
                li: {border: 'none', borderRadius:'0px', borderSize:'1px', borderColor:'#000000', backgroundColor: '#666666', width: '200px', textAlign: 'left'},
                a: {color: '#000000', textTransform:'initial', textDecoration: 'initial', fontWeight: '300', fontSize: '22px', padding: '5px'}
            }
        })

    useEffect(()=>{
        if(document.getElementById('nav-root').dataset.nav){
            console.log(document.getElementById('nav-root').dataset.nav)
            setMode('edit')
            let url = window.location.href.replace('/edit','/load')
            axios.get(url).then(response=>{
                if(response.data=='forgiven')
                    console.log('Pas le droit de charger ce menu')
                else
                    loadNav(response.data)})
        }
    }, []);

    const navToJson = ()=>{
        let json = {
                    name: navName,
                    elements: elements.map(element=>{return({name: element.props.name, link: element.props.link, parent:element.props.parent, key:element.key})}),
                    style: navStyle
        }
        return json;
    }

    const save = ()=>{
        let json = navToJson();
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
    }

    const loadNav = (nav)=>{
        setNavName(nav.name);
        setNavStyle(JSON.parse(nav.style))
        let loadedNav = [];
        JSON.parse(nav.elements).map((element)=>{ 
            loadedNav=loadedNav.concat(<Element key={element.key} name={element.name} link={element.link} origin="" parent={element.parent} />)
        })
        setElements(loadedNav)
        console.log(loadedNav)
        console.log(nav.name)
    }
   

    const addElt = (elt)=>{
        elt.props.style= (getLvlElt(elt)===1?navStyle.n1:navStyle.n2).a
        let elts = R.clone(elements);
        elts= elts.concat(elt);
        //console.log('The new list is:')
        //console.log(elts)
        setElements(elts);
    }

    const updateElt = (elt)=>{
        //console.log('The following elt is supposed to be add:')
        //console.log(elt)
        let elts = R.clone(elements);
        elts[elt.key] = elt
        //console.log('The new list is:')
        //console.log(elts)
        setElements(elts);
    }

    const updateNavStyle=(newStyle)=>{
        setNavStyle(newStyle)
    }

    const getChilds = (parent)=>{
        let childs = elements.filter(element => element.props.parent===parent.key) // Tableau avec liste des enfants du parent
        let link = <a target="_blank" style={getLvlStyle(parent).a} href={parent.props.link}>{parent.props.name}</a>
        console.log(childs)
        if (childs.length > 0){ // Cherchons les enfants des enfants à condition d'avoir des enfants
            childs = <ul style={navStyle.n2.ul} className="dropdown-content">{
                childs.map((elt,id)=>{
                return (<li key={id} style={navStyle.n2.li} >{getChilds(elt)}</li>) // On prend la liste des enfant, et on la remplace par [[p1,e1],[p2,e2], ..., [pn,en]]
            })}</ul>
        }
        return [link,childs]
    }

    const getLvlElt = (elt, counter=1)=>{
        if (elt.props.parent === -1){
            return counter
        }
        else{
            let parent = elements.find(element => element.key === elt.props.parent)
            return (getLvlElt(parent, counter+1))
        }
    }

    const getLvlStyle = (elt)=>{
        if (getLvlElt(elt)===1)
            return navStyle.n1
        else   
            return navStyle.n2
    }

    const showNav = ()=>{
        let parents = elements.filter(element => element.props.parent===-1)
        let nav = parents.map((elt,id)=>{
            return (<li className="dropdown" key={id} onMouseEnter={(e)=>newHovered(e,elt.key)} onMouseLeave={newHovered} style={hovered==elt.key?navStyle.n1Hover.li:navStyle.n1.li} >{getChilds(elt)}</li>)
        })
        return(
            <>
                {nav}
            </>
        );
    }

    const newHovered=(e,key)=>{
        if(e.type==='mouseenter')
            setHovered(key)
        if(e.type==='mouseleave')
            setHovered(-1)
    }

    return (
        <div className="Form">
            <div className="form-container">
                <Edit navStyle={navStyle} updateNavStyle={updateNavStyle} navName={navName} setNavName={setNavName} onClickAdd={addElt} onClickUpdate={updateElt}  elements={elements} getLvlElt={getLvlElt}/>
                {/* Partie où est afficher le contenu créé */}
                <div className="form-show">  
                    <div className="form-show__header d-flex justify-content-between">
                        <h2 className="form-show__title">Edition menu</h2>
                        <div className="form-show__buttons">
                            <button aria-label="Export" className="button button-bgnone" ><i class="fas fa-file-export"></i><span>Exporter</span></button>
                                
                            <button aria-label="Save" className="button button-bgred button-no-border" onClick={save}><i class="far fa-save"></i> <span>Sauvegarder</span></button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">
                            <nav><ul style={ navStyle.n1.ul }>{showNav()}</ul></nav>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Nav;

if (document.getElementById('nav-root')){
    ReactDOM.render(<Nav />, document.getElementById('nav-root'))
}