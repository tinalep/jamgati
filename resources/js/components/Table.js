import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Table/Edit'
import {process, copyToClipBoard} from '../functions.js'
import ReactDOMServer from 'react-dom/server';

const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Table = props => {

    const [tableName, setTableName] = useState('Mon tableau')
    const [mode, setMode] = useState('create')
    const [table, setTable] = useState({lines: [], parameters: {nbLines: 5, nbColumns: 5, style: {}}, mode:'edit'})
    const [selected, setSelected] = useState({empty: false, line: 0, column: 0, cell: {l:0,c:0}})
    const [helper, setHelper] = useState('')
    const [temp, setTemp] = useState({lvl: 1, tab: []})
    const [typo, setTypo] = useState({font:'0', size:0, align: '0'})
    const [exportMode, setExportMode] = useState('default')
    const tempSize = 15
    const initCell = {content: 'Nouvelle cellule', style:{fontFamily: 'Lato', textAlign: 'center', fontSize: '16px'}, size:{lon: 1, type: 'cell'}}
    const fonts = ['0','Arial', 'Courier New', 'Lato', 'Roboto', 'Times', 'Times New Roman']
    const fontsSize =[0]
    const svgUrl = (window.location.href.includes('edit')?'../':'')
    for(let i =10; i<=30; i+=2) fontsSize.push(i)


    useEffect(()=>{
        if(document.getElementById('table-root').dataset.table&&mode==='create'){
            setMode('edit')
            let url = window.location.href.replace('/edit','/load')
            axios.get(url).then(response=>{
                if(response.data=='forgiven')
                    console.log('Pas le droit de charger ce formulaire')
                else
                    loadTable(response.data)})
        }
        else if(table.lines.length===0&&mode==='create')
            setTable(createTab())
        else
            setTable(updateSelectedStyle(R.clone(table)))
    }, [selected]);

    const exportPopup = (on)=>{
        document.querySelector('#exportPopup').style.display = (on?'block':'none');
        setExportMode('default')
    }

    const tableToJson = ()=>{
        let json ={name: tableName, table: table}
        return json
    }

    const save = ()=>{
        let json = tableToJson();
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

    const loadTable = (table)=>{
        setTableName(table.name);
        let t = R.clone(table);
        t=JSON.parse(table.table)
        console.log(t)
        setTable(t)
        let save=R.clone(temp)
        save.tab.push({table:t, selected:selected})
        setTemp(save)
    }

    const createTab = ()=>{
        let l = table.parameters.nbLines
        let c = table.parameters.nbColumns
        let newTable = R.clone(table)
        for(let i =1; i<=l; i++){
            let line = {id: 'l'+i, cells: [], style: {}}
            for(let j = 1; j<=c; j++){
                let cell = R.clone(initCell)
                cell.content='Cellule'+i+'-'+j
                line.cells.push(cell)
            }
            newTable.lines.push(line)
        }
        newTable=updateSelectedStyle(newTable)
        let save=R.clone(temp)
        save.tab.push({table:newTable, selected:selected})
        setTemp(save)
        return newTable;
    }

    const updLines = (tab, pos=-1)=>{
        let t = tab
        let l = t.parameters.nbLines-t.lines.length
        let c = t.parameters.nbColumns
        for(let i = 1; i<=Math.abs(l); i++){ 
            if(l>0)
            {
                let line = {id: 'l'+t.lines.length, cells: [], style: {}}
                for(let j = 1; j<=c; j++){
                    let cell = R.clone(initCell)
                    cell.content=''

                    line.cells.push(cell)
                }
                t.lines.splice((pos==-1?t.lines.length:selected.line+pos),0,line)
            }
            else
            t.lines.splice((pos==-1?t.lines.length-1:selected.line),1)
            
        }
        return t
    }

    const updColumns = (tab, pos=-1)=>{
        let t = tab
        let c = t.parameters.nbColumns-t.lines[0].cells.length
        for(let i = 1; i<=Math.abs(c); i++){ 
            t.lines.forEach((line,id)=>{
                if(c>0)
                {
                    let cell = R.clone(initCell)
                    cell.content=''
                    line.cells.splice((pos==-1?line.cells.length:selected.column+pos),0,cell)
                }
                else
                    line.cells.splice((pos==-1?line.cells.length-1:selected.column),1)
            })
        }
        return t
    }

    const updateSelectedStyle = (tab)=>{
        let t = R.clone(tab)
        t.lines.forEach((line,idL)=>{
            line.cells.forEach((cell,idC)=>{
                let bg ={}
                if (t.mode==='fusion'){
                    bg = (idL===selected.cell.l&&idC===selected.cell.c?
                            '#EB7808':
                            (isAdj(idL,idC).bool?'#f3ae6a':'unset')
                    )
                }
                else if (t.mode==='edit'){
                    bg =
                    (idL===selected.cell.l?
                        (idC===selected.cell.c?'#EB7808':'#ef9339')
                        :
                        (idC===selected.cell.c?'#f3ae6a':'unset')
                    ) //1: #F1A214 2: #EC840C 3: #EB7808
                }
                cell.style.backgroundColor = bg // Enlever le false pour ajouter la deselection
            })
        })
        return(t)
    }

    const isAdj = (l,c)=>{
        let obj={bool: false, type: 'row'}
        if(selected.cell.l===l){
            obj.type='col'
            obj.bool=(Math.abs(selected.cell.c-c)===1)
        }
        if(selected.cell.c===c){
            obj.type='row'
            obj.bool=(Math.abs(selected.cell.l-l)===1)
        }
        return obj
    }

    const KeyPress = (e)=>{
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 90 && evtobj.ctrlKey)
        {
            e.preventDefault();
            if(temp.lvl!==1) cancel('undo');
        }
        if (evtobj.keyCode == 89 && evtobj.ctrlKey)
        {
            e.preventDefault();
            if(temp.lvl!==temp.tab.length) cancel('redo');
        }
    }

    const tableHandler = (e)=>{
        let pos = 0
        let target = e.target
        let updTable = R.clone(table)
        let val = target.value
        switch(target.dataset.table){
            case 'nbLines':
                updTable.parameters.nbLines = parseInt(val);
                updTable = updLines(updTable);
            break;
            case 'nbColumns':
                updTable.parameters.nbColumns = parseInt(val);
                updTable = updColumns(updTable);
            break;
            case 'lineBefore' : case 'lineAfter' :
                if(target.dataset.table.includes('Before'))
                {
                    let sel = R.clone(selected)
                    sel.line++
                    sel.cell.l++
                    setSelected(sel)
                }
                else pos++
                updTable.parameters.nbLines += 1;
                updTable = updLines(updTable, pos);
            break;
            case 'columnBefore' : case 'columnAfter' :
                if(target.dataset.table.includes('Before'))
                {
                    let sel = R.clone(selected)
                    sel.column++
                    sel.cell.c++
                    setSelected(sel)
                }
                else pos++
                updTable.parameters.nbColumns += 1;
                updTable = updColumns(updTable, pos);
            break;
            case 'lineDelete' :
                updTable.parameters.nbLines -= 1;
                updTable = updLines(updTable, pos);
                break;
            case 'columnDelete' :
                updTable.parameters.nbColumns -= 1;
                updTable = updColumns(updTable, pos);
                break;
            case 'cellDelete' :
                updTable.lines[selected.line].cells[selected.column].content=''
                break;
            case 'cell' :
                updTable.lines[selected.line].cells[selected.column].content=val
                break;
            case 'fusion' :
                if(updTable.mode==='fusion'){
                    updTable.mode='edit'
                    setHelper('')
                }
                else{
                    updTable.mode='fusion'
                    setHelper('Selectionnez une cellule avec laquelle vous souhaitez fusionner votre cellule.')
                }
                break;
            default : console.log('Problem with the tableHandler')
        }
        let save = R.clone(temp)
        if(save.length>=tempSize) save.tab.splice(0,save.length+1-tempSize)
        else
        {
            save.tab.splice(save.lvl, tempSize-save.lvl)
            save.lvl = save.tab.length+1

        }
        save.tab.push({table:updTable, selected:selected})
        if(target.dataset.table!=='fusion') setTemp(save)
        console.log(save)
        updTable=updateSelectedStyle(updTable)
        setTable(updTable)
    }

    const typoHandler = (e)=>{
        let t = R.clone(typo)
        let target = e.target
        switch(target.dataset.typo){
            case 'font' : t.font = target.value; break;
            case 'size' : t.size = target.value; break;
            case 'left' : case 'right' : case 'center' : t.align = target.dataset.typo===t.align? '0':target.dataset.typo; break;
            default : console.log("Problem in typoHandler")
        }
        console.log(t)
        setTypo(t)
    }

    const applyTypo = (e)=>{
        let t = R.clone(table)
        let save = R.clone(temp)
        let type = e.target.dataset.typo
        console.log(type)
        switch(type){
            case 'applyAll' :
                t.lines.forEach((line)=>{
                    line.cells.forEach((cell)=>{
                        cell.style.fontSize = typo.size==0?cell.style.fontSize:typo.size+'px'
                        cell.style.fontFamily = typo.font=='0'?cell.style.fontFamily:typo.font
                        cell.style.textAlign = typo.align=='0'?cell.style.textAlign:typo.align
                    })
                });
                break;
            case 'applyLine' :
                t.lines[selected.cell.l].cells.forEach((cell)=>{
                        cell.style.fontSize = typo.size==0?cell.style.fontSize:typo.size+'px'
                        cell.style.fontFamily = typo.font=='0'?cell.style.fontFamily:typo.font
                        cell.style.textAlign = typo.align=='0'?cell.style.textAlign:typo.align
                    })
                break;
            case 'applyCol' :
                t.lines.forEach((line)=>{
                    let cell = line.cells[selected.cell.c]
                    cell.style.fontSize = typo.size==0?cell.style.fontSize:typo.size+'px'
                    cell.style.fontFamily = typo.font=='0'?cell.style.fontFamily:typo.font
                    cell.style.textAlign = typo.align=='0'?cell.style.textAlign:typo.align
                    line.cells[selected.cell.c] = cell
                });
                break;
            case 'applyCell' :
                let cell = t.lines[selected.cell.l].cells[selected.cell.c]
                cell.style.fontSize = typo.size==0?cell.style.fontSize:typo.size+'px'
                cell.style.fontFamily = typo.font=='0'?cell.style.fontFamily:typo.font
                cell.style.textAlign = typo.align=='0'?cell.style.textAlign:typo.align
                t.lines[selected.cell.l].cells[selected.cell.c] = cell
                break;
            default : console.log("Problem in typoHandler")
        }
        if(save.length>=tempSize) save.tab.splice(0,save.length+1-tempSize)
        else
        {
            save.tab.splice(save.lvl, tempSize-save.lvl)
            save.lvl = save.tab.length+1

        }
        save.tab.push({table:t, selected:selected})
        if(table!==t) setTemp(save)
        setTypo({font:'0', size:0, align: '0'})
        setTable(t)
    }

    const setCellSize=(cell)=>{
        let size = {row: 1, col: 1}
        switch(cell.size.type){
            case 'row' : size.row=cell.size.lon; break;
            case 'col' : size.col=cell.size.lon; break;
            case 'square' :
                size.col=cell.size.lon;
                size.row=cell.size.lon;
                break;
            default : size = size;
        }
        return size;
    }

    const showTable = ()=>{
        let tableContent =
        table.lines.map((line,idL)=>{
            return(<tr key={idL}>
                {line.cells.map((cell,idC)=>{
                    return(
                        <td className={cell.size.type==='null'?'d-none':''} colSpan={setCellSize(cell).col} rowSpan={setCellSize(cell).row} style={{backgroundColor: cell.style.backgroundColor}} onClick={()=>handleSelected(idL,idC)} key={idC}>
                            <input onFocus={()=>handleSelected(idL,idC)} type="text" data-table="cell" style={{fontFamily: cell.style.fontFamily, fontSize: cell.style.fontSize,textAlign: cell.style.textAlign}} onChange={tableHandler} value={cell.content} />
                        </td>)
                    })}
                </tr>)
        })
        return(
            <table className="table table-bordered table-striped">
                <thead className="thead-light">
                    {tableContent[0]}
                </thead>
                <tbody>
                    {tableContent.filter(e=>e!==tableContent[0])}
                </tbody>
            </table>
        )
    }

    const handleSelected =(l=-1,c=-1) =>{
        if(table.mode==='fusion') handleFusion(l,c)
        let sel = {empty:false, line: l, column: c, cell:{l:l,c:c}}
        if(!(selected.cell.l===l&&selected.cell.c===c)){
            setSelected(sel)
        }
    }

    const handleFusion = (l,c)=>{
        let t = R.clone(table)
        let adj = isAdj(l,c)
        if(adj.bool)
        {
            t.lines[Math.min(selected.cell.l,l)].cells[Math.min(selected.cell.c,c)].size.lon++
            t.lines[Math.min(selected.cell.l,l)].cells[Math.min(selected.cell.c,c)].size.type=adj.type
            t.lines[Math.max(selected.cell.l,l)].cells[Math.max(selected.cell.c,c)].size.type='null'
        }
        t.mode='edit'
        setHelper('')
        setTable(t)
    }

    const unselect = (e)=>{
        console.log($.contains($(e.target).get(0),$('#tablePreview').get(0)))
    }

    const cancel = (type)=>{
        let i = type==='undo'? -1 : 1
        let t = R.clone(temp)
        t.lvl += i
        console.log(t.lvl)
        setTable((temp.tab[t.lvl-1].table))
        setSelected((temp.tab[t.lvl-1].selected))
        console.log(temp.tab[t.lvl-1].table)
        setTemp(t)
    }

    const showHtmlTable = (mode)=>{
        let tableContent =
        table.lines.map((line,idL)=>{
            return(<tr key={idL}>
                {line.cells.map((cell,idC)=>{
                    return(cell.size.type==='null'?null:
                        <td colSpan={setCellSize(cell).col} rowSpan={setCellSize(cell).row} style={{fontSize: cell.style.fontsSize, fontFamily: cell.style.fontFamily, textAlign: cell.style.textAlign}} key={idC}>{cell.content}</td>)
                    })}
                </tr>)
        })
        var el = document.createElement('div');
        let tableDom =
            <table className="table table-bordered table-striped">
                <thead className="thead-light">
                    {tableContent[0]}
                </thead>
                <tbody>
                    {tableContent.filter(e=>e!==tableContent[0])}
                </tbody>
            </table>
        return beauty_html(ReactDOMServer.renderToStaticMarkup(tableDom))
    }

    document.onkeydown = KeyPress;

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
                                {showHtmlTable(exportMode)}
                            </code>
                        </pre>
                    </div>
                        <button className="text-center" onClick={()=>copyToClipBoard(showHtmlTable(exportMode))}>Copier dans le presse-papier</button>
                    </>}
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
            <div className="form-container">
                <Edit tableName={tableName} setTableName={setTableName} table={table} tableHandler={tableHandler} selected={selected}/>
                {/* Partie où est afficher le contenu créé */}
                <div className="form-show" onClick={unselect}>  
                    <div className="form-show__header d-flex justify-content-between">
                        <h2 className="form-show__title">Edition tableau</h2>
                        <div className="form-show__buttons">
                            <button className="button button-bgnone" onClick={()=>exportPopup(true)}>Exporter</button>
                                
                            <button data-toggle="modal" data-target="#saveModal" className="button button-bgred button-no-border" onClick={save}>Sauvegarder</button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <h4 className="app-show__helper">{helper}</h4>
                        <div className="form-show__typography">
                            <select data-typo='font' value={typo.font} onChange={typoHandler}>
                                {fonts.map((f,i)=>{return(<option style={{fontFamily: f}} key={i} value={f}>{f=='0'?'Choisir une police':f}</option>)})}
                            </select>
                            <select data-typo='size' value={typo.size} onChange={typoHandler}>
                                {fontsSize.map((s,i)=>{return(<option key={i} value={s}>{s==0?'Taille':s+' px'}</option>)})}
                            </select>
                            <input className={typo.align==='left'?'active':''} data-typo='left' onClick={typoHandler} type="image" src={svgUrl+'../../resources/assets/images/align-left.svg'}/>
                            <input className={typo.align==='center'?'active':''} data-typo='center' onClick={typoHandler} type="image" src={svgUrl+'../../resources/assets/images/align-center.svg'}/>
                            <input className={typo.align==='right'?'active':''} data-typo='right' onClick={typoHandler} type="image" src={svgUrl+'../../resources/assets/images/align-right.svg'}/>

                            <div className="dropdown apply mr-auto p-1">
                                <button className="p-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Appliquer ...
                                </button>
                                <div className="dropdown-menu text-align-left apply-buttons" aria-labelledby="dropdownMenuButton">
                                    <button data-typo='applyAll' className="dropdown-item" onClick={applyTypo} >Pour le tableau entier</button>
                                    <button data-typo='applyLine' className="dropdown-item" onClick={applyTypo} >Pour la ligne selectionnée</button>
                                    <button data-typo='applyCol' className="dropdown-item" onClick={applyTypo} >Pour la colonne selectionnée</button>
                                    <button data-typo='applyCell' className="dropdown-item" onClick={applyTypo} >Pour la cellule selectionnée</button>
                                </div>
                            </div>

                            <button className="ml-auto" disabled={temp.lvl===1} onClick={()=>cancel('undo')}><i className={"fas fa-undo-alt fa-2x "+(temp.lvl===1?"text-secondary":"text-danger")}></i></button>
                            <button disabled={temp.lvl===temp.tab.length} onClick={()=>cancel('redo')}><i className={"fas fa-redo-alt fa-2x "+(temp.lvl===temp.tab.length?"text-secondary":"text-success")}></i></button>
                        </div>
                        <div className="form-show__preview" id="tablePreview">
                            {showTable()}
                        </div>
                        <h4 className="app-show__helper">Temp: size-{temp.tab.length} lvl-{temp.lvl}</h4>
                        <h4 className="app-show__helper">{selected.cell.l}-{selected.cell.c}</h4>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Table;

if (document.getElementById('table-root')){
    ReactDOM.render(<Table />, document.getElementById('table-root'))
}
