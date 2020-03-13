import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Table/Edit'
import {process, copyToClipBoard} from '../functions.js'
import ReactDOMServer from 'react-dom/server';
import { BlockPicker } from 'react-color';

const R = require('ramda');
const beauty_html = require('js-beautify').html;
const FileDownload = require('js-file-download');

const Table = props => {

    const [tableName, setTableName] = useState('Mon tableau')
    const [mode, setMode] = useState('create')
    const [table, setTable] = useState({lines: [], parameters: {nbLines: 5, nbColumns: 5, style: {}}, mode:'edit', headers:{row: true, col: true}})
    const [selected, setSelected] = useState({empty: false, line: 0, column: 0, cell: {l:0,c:0}})
    const [helper, setHelper] = useState('')
    const [temp, setTemp] = useState({lvl: 1, tab: []})
    const [typo, setTypo] = useState({fontFamily: '0', textAlign: '0', fontSize: '0', fontWeight: '0', fontStyle: '0', color: '0', textDecoration: '0', backgroundColor: '0'})
    const [exportMode, setExportMode] = useState('default')
    const tempSize = 15
    const initTypo = {fontFamily: '0', textAlign: '0', fontSize: '0', fontWeight: '0', fontStyle: '0', color: '0', textDecoration: '0', backgroundColor: '0'}
    const initCellStyle = {fontFamily: 'Lato', textAlign: 'center', fontSize: '16px', fontWeight: 'unset', fontStyle: 'unset', color: '#000000', textDecoration: 'none', backgroundColor: 'none'}
    const initCell = {content: 'Nouvelle cellule', style:initCellStyle, size:{lon: 1, type: 'cell'}}
    const fonts = ['0','Arial', 'Courier New', 'Lato', 'Roboto', 'Times', 'Times New Roman']
    const fontsSize =[0]
    const svgUrl = (window.location.href.includes('edit')?'../':'')
    for(let i =10; i<=30; i+=2) fontsSize.push(i+'px')

    
    // Création d'un tableau vierge ou du tableau de l'utilisateur
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
        else if(table.lines.length===0&&mode==='create'){
            let t = createTab()
            setTable(t)
        }
    }, []);

    // Fonctions d'intéractions BDD
    const exportPopup = (on)=>{
        document.querySelector('#exportPopup').style.display = (on?'block':'none');
        setExportMode('default')
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
    
    const showHtmlTable = ()=>{
        let loadedFonts = []
        let style =
        '.table{width: 60%;}'
        +'.table_custom th, .table_custom td{ border: solid 1px; padding: 10px 5px; background-color: unset !important;}'
        +'.table_custom thead th{border: solid 2px;}'
        +'.table_custom tbody th:first-child{border: solid 2px;}'
        let tableContent =
        table.lines.map((line,idL)=>{
            return(<tr key={idL}>
                {line.cells.map((cell,idC)=>{
                    style+= '.cell'+idL+'-'+idC+' { font-size: '+cell.style.fontSize+'; font-family: '+cell.style.fontFamily+'; text-align: '+cell.style.textAlign+'; font-style: '+cell.style.fontStyle+'; font-weight: '+cell.style.fontWeight+'; text-decoration: '+cell.style.textDecoration+'; background-color: '+cell.style.backgroundColor+'; color: '+cell.style.color+'}'
                    loadedFonts.push(cell.style.fontFamily)
                    return(cell.size.type==='null'?null:
                        <td className={"cell"+idL+'-'+idC} colSpan={setCellSize(cell).col} rowSpan={setCellSize(cell).row} key={idC}>{cell.content}</td>)
                    })}
                </tr>)
        })
        loadedFonts = loadedFonts.filter( onlyUnique );
        loadedFonts.forEach((font)=>{
            style += "@import url('https://fonts.googleapis.com/css?family="+font+"&display=swap');";

        })
        let thead = tableContent[0]
        let tbody = tableContent.filter(e=>e!==tableContent[0])
        let tableDom =
        <>
            <style dangerouslySetInnerHTML={{__html: style}} />
            <table className="table_custom">
                <caption>{tableName}</caption>
                <thead className="thead_custom">
                    {table.headers.row?thead:null}
                </thead>
                <tbody className="tbody_custom">
                    {table.headers.row?null:thead}
                    {tbody}
                </tbody>
            </table>
        </>
        return beauty_html(ReactDOMServer.renderToStaticMarkup(tableDom))
    }

    const showCsvTable = ()=>{
        let csv = ''
        table.lines.forEach((line,idL)=>{
                line.cells.forEach((cell,idC)=>{
                    csv+=(cell.size.type==="null"?'':cell.content)
                    csv+=(idC===line.cells.length-1?'':';')
                })
                csv+='\n'
        })
        return csv
    }
    
    const loadTable = (table)=>{
        setTableName(table.name)
        let t = R.clone(table)
        t=JSON.parse(table.table)
        t.lines.forEach((line)=>{
            line.cells.forEach((cell)=>{
                if(cell.content==null) cell.content = ''
            })
        })
        setTable(t)
        let save=R.clone(temp)
        save.tab.push({table:t, selected:selected})
        setTemp(save)
    }

    const loadTableFromFile = (content,ext)=>{
        console.log(content)
        let s = {empty: false, line: 0, column: 0, cell: {l:0,c:0}}
        let t = {lines: [], parameters: {nbLines: 0, nbColumns: 0, style: {}}, mode:'edit', headers:{row: false, col: false}}
        setSelected(s)
        switch(ext){
            case 'csv' :
                let lines = []
                let arrayLines = content.split('\n')
                arrayLines.forEach((l,id)=>{
                    let arrayCells = l.split(';');
                    let line = {}
                    let cells = []
                    arrayCells.forEach((c,id)=>{
                        let cell = R.clone(initCell)
                        cell.content=c
                        cells.push(cell)
                    })
                    line.cells=cells
                    console.log(arrayCells.length)
                    arrayCells.length>1? lines.push(line): console.log('Bien ouej')
                })
                t.lines=lines
                t.parameters.nbLines = lines.length
                t.parameters.nbColumns = lines[0].cells.length
                break;
        }
        let save = R.clone(temp)
        if(save.tab.length>=tempSize) save.tab.splice(0,save.tab.length+1-tempSize)
        else
        {
            save.tab.splice(save.lvl, tempSize-save.lvl)
            save.lvl = save.tab.length+1

        }
        save.tab.push({table:t, selected:s})
        setTemp(save)
        setTable(t)
    }

    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    const tableToJson = ()=>{
        let json ={name: tableName, table: table}
        return json
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
            else{
            t.lines.splice((pos==-1?t.lines.length-1:selected.line),1)
            }
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

    const giveSelectedClass = (l,c)=>{
        
        if(table.mode=='fusion')
        {
            let obj = isAdj(l,c)
            if(obj.bool)
            {
                if(obj.bool&&obj.type=='cell') return 'selected-cell'
                if(obj.bool&&obj.type=='col') return 'selected-fusion'
                if(obj.bool&&obj.type=='row') return 'selected-fusion'
                if(obj.bool&&obj.type=='square') return 'selected-fusion'
            }
                
        }
        else
        {
        if(selected.cell.l===l&&selected.cell.c===c){
            return 'selected-cell'
        }
        else if(selected.cell.l!==l&&selected.cell.c===c){
            return 'selected-col'
        }
        else if(selected.cell.l===l&&selected.cell.c!==c){
            return 'selected-row'
        }
        else return ''
        }
    }

    const isAdj = (l,c)=>{
        let sel = table.lines[selected.cell.l].cells[selected.cell.c]
        let obj={bool: false, type: 'row'}
        if(selected.cell.l==l){
            if(selected.cell.c===c){
                obj.bool=true
                obj.type='cell'
            }
            else if((sel.size.type=='cell'||sel.size.type=='col')&&Math.abs(selected.cell.c-c)==1){
                obj.bool=(selected.cell.c*c!=0)
                obj.type=(sel.size.type=='cell'?'row':'square')
            }
        }
        else if (selected.cell.c==c&&(sel.size.type=='cell'||sel.size.type=='row')&&Math.abs(selected.cell.l-l)==1)
        {         
            obj.bool=(selected.cell.l*l!=0)
            obj.type=(sel.size.type=='cell'?'col':'square')
        }
        return obj
    }

    const KeyPress = (e)=>{
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) //ctrlz
        {
            e.preventDefault();
            if(temp.lvl!==1) cancel('undo');
        }
        if (evtobj.keyCode == 89 && evtobj.ctrlKey) //ctrly
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
            case 'rowHeader' : updTable.headers.row= !updTable.headers.row; break;
            case 'colHeader' : updTable.headers.col= !updTable.headers.col; break;
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
            case 'unfusion' :
                let sel = updTable.lines[selected.line].cells[selected.column]
                let lon = sel.size.lon
                if(lon>1)
                {
                    setHelper('')
                    if(sel.size.type=='row'||sel.size.type=='square')
                        updTable.lines[selected.line].cells[selected.column+1].size.type='cell'
                    if(sel.size.type=='col')
                        updTable.lines[selected.line+1].cells[selected.column].size.type='cell'
                    if(sel.size.type=='square')
                        updTable.lines[selected.line+1].cells[selected.column+1].size.type='cell'
                    sel.size.lon=1
                    sel.size.type='cell'
                }
                else
                    setHelper('Veuillez selectionner une cellule qui a été fusionnée') 
                break;
            default : console.log('Problem with the tableHandler')
        }
        let save = R.clone(temp)
        if(save.tab.length>=tempSize) save.tab.splice(0,save.tab.length+1-tempSize)
        else
        {
            save.tab.splice(save.lvl, tempSize-save.lvl)
            save.lvl = save.tab.length+1

        }
        save.tab.push({table:updTable, selected:selected})
        if(target.dataset.table!=='fusion') setTemp(save)
        setTable(updTable)
    }

    const typoHandler = (e)=>{
        let t = R.clone(typo)
        let target = e.target
        switch(target.dataset.typo){
            case 'font' : t.fontFamily = target.value; break;
            case 'size' : t.fontSize = target.value; break;
            case 'bold' : t.fontWeight = t.fontWeight==='bold'?'regular':'bold'; break;
            case 'italic' : t.fontStyle = t.fontStyle==='italic'?'unset':'italic'; break;
            case 'underline' : t.textDecoration = t.textDecoration==='underline'?'none':'underline'; break;
            case 'left' : case 'right' : case 'center' : t.textAlign = target.dataset.typo===t.textAlign? '0':target.dataset.typo; break;
            default : console.log("Problem in typoHandler")
        }
        console.log(t)
        setTypo(t)
    }

    const handleChangeColor = (color) => {
        let t = R.clone(typo)
        t.color = color.hex
        console.log(t)
        setTypo(t)
    }
    
    const handleChangeBg= (color) => {
        let t = R.clone(typo)
        t.backgroundColor = color.hex
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
                        cell = applyToCell(cell)
                    })
                });
                break;
            case 'applyLine' :
                t.lines[selected.cell.l].cells.forEach((cell)=>{
                        cell = applyToCell(cell)
                    })
                break;
            case 'applyCol' :
                t.lines.forEach((line)=>{
                    let cell = line.cells[selected.cell.c]
                    cell = applyToCell(cell)
                    line.cells[selected.cell.c] = cell
                });
                break;
            case 'applyCell' :
                let cell = t.lines[selected.cell.l].cells[selected.cell.c]
                cell = applyToCell(cell)
                t.lines[selected.cell.l].cells[selected.cell.c] = cell
                console.log(cell.style)
                break;
            default : console.log("Problem in applyTypo")
        }
        if(save.tab.length>=tempSize) save.tab.splice(0,save.tab.length+1-tempSize)
        else
        {
            save.tab.splice(save.lvl, tempSize-save.lvl)
            save.lvl = save.tab.length+1
        }
        save.tab.push({table:t, selected:selected})
        if(table!==t) setTemp(save)
        setTypo(initTypo)
        setTable(t)
    }

    const applyToCell=(c)=>{
        let cell = c
        cell.style.fontSize = typo.fontSize=='0'?cell.style.fontSize:typo.fontSize
        cell.style.fontFamily = typo.fontFamily=='0'?cell.style.fontFamily:typo.fontFamily
        cell.style.textAlign = typo.textAlign=='0'?cell.style.textAlign:typo.textAlign
        cell.style.color = typo.color=='0'?cell.style.color:typo.color
        cell.style.backgroundColor = typo.backgroundColor=='0'?cell.style.backgroundColor:typo.backgroundColor
        cell.style.fontWeight = typo.fontWeight=='0'?cell.style.fontWeight:typo.fontWeight
        cell.style.textDecoration = typo.textDecoration=='0'?cell.style.textDecoration:typo.textDecoration
        cell.style.fontStyle = typo.fontStyle=='0'?cell.fontStyle:typo.fontStyle
        return cell
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
                    if(idL===0&&table.headers.row||idC===0&&table.headers.col)
                    {
                    return(
                        <th onClick={(e)=>preventDefault(e)} className={giveSelectedClass(idL,idC)+' '+(cell.size.type==='null'?'d-none':'')} colSpan={setCellSize(cell).row} rowSpan={setCellSize(cell).col} style={{backgroundColor: cell.style.backgroundColor}} onClick={()=>handleSelected(idL,idC)} key={idC}>
                            <textarea spellCheck="false" cols={Math.max(20,cell.content.length)} rows={1+cell.content.length - cell.content.replace(/\n/g,"").length} onFocus={()=>handleSelected(idL,idC)} data-table="cell" style={cell.style} onChange={tableHandler} value={cell.content} />
                        </th>)
                    }
                    else
                    {
                    return(
                        <td className={giveSelectedClass(idL,idC)+' '+(cell.size.type==='null'?'d-none':'')} colSpan={setCellSize(cell).row} rowSpan={setCellSize(cell).col} style={{backgroundColor: cell.style.backgroundColor}} onClick={()=>handleSelected(idL,idC)} key={idC}>
                            <textarea spellCheck="false" cols={Math.max(20,cell.content.length)} rows={1+cell.content.length - cell.content.replace(/\n/g,"").length} onFocus={()=>handleSelected(idL,idC)} style={cell.style} data-table="cell" onChange={tableHandler} value={cell.content} />
                        </td>)
                    }
                    })}
                    
                </tr>)
        })
        let thead = tableContent[0]
        let tbody = tableContent.filter(e=>e!==tableContent[0])
        return(
            <table className="table_custom">
                <thead className="thead_custom">
                    {table.headers.row?thead:null}
                </thead>
                <tbody className="tbody_custom">
                    {table.headers.row?null:thead}
                    {tbody}
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
        let cell = t.lines[l].cells[c]
        let sel = R.clone(t.lines[selected.cell.l].cells[selected.cell.c])
        let obj = isAdj(l,c)
        let save = R.clone(temp)
        if(obj.bool&&obj.type!='cell')
        {
            t.lines[Math.min(selected.cell.l,l)].cells[Math.min(selected.cell.c,c)].size.lon=2
            t.lines[Math.min(selected.cell.l,l)].cells[Math.min(selected.cell.c,c)].size.type=obj.type
            t.lines[Math.max(selected.cell.l,l)].cells[Math.max(selected.cell.c,c)].size.type='null'
            t.lines[Math.min(selected.cell.l,l)].cells[Math.min(selected.cell.c,c)].size.content=sel.content+'+'+cell.content
            if(obj.type=='square') t.lines[(sel.size.type==='col'?1:0)+l].cells[(sel.size.type==='row'?1:0)+c].size.type='null'
            if(save.tab.length>=tempSize) save.tab.splice(0,save.tab.length+1-tempSize)
            else
            {
                save.tab.splice(save.lvl, tempSize-save.lvl)
                save.lvl = save.tab.length+1

            }
            save.tab.push({table:t, selected:selected})
            if(table!==t) setTemp(save)
        }
        t.mode='edit'
        setHelper('')
        setTable(t)
    }

    const unselect = (e)=>{
        console.log($.contains($(e.target).get(0),$('#tablePreview').get(0)))
    }

    const dl = ()=>{
        let mode = exportMode
        if (mode==='html') FileDownload(showHtmlTable(), tableName+".html")
        if (mode==='csv') FileDownload(showCsvTable(), tableName+".csv")
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

    document.onkeydown = KeyPress;

    return (
        <div className="Form">
            <div id='exportPopup'>
                <div className="form-show__popup">
                    <button aria-label="Close" className="form-show__close btn btn-danger" onClick={()=>exportPopup(false)}>X</button>
                    <h3 className="text-center">Quel format pour l'export?</h3>
                    <br/>
                    <br/>
                    <br/>
                    <div className="text-center">
                    <select value={exportMode} onChange={(e)=>{(setExportMode(e.target.value)); console.log(e.target.value)}}>
                        <option value='default' style={{fontWeight: 'bold'}}>Choisir le format d'export</option>
                        <option value='html'>HTML</option>
                        <option value='csv'>CSV</option>
                    </select>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    {exportMode=='default'?null:<>
                    <div className="show__exporttext">
                        <pre className="app-pre">
                            <code id="toClipboard">
                                {(exportMode==='html'?showHtmlTable():showCsvTable())}
                            </code>
                        </pre>
                    </div>
                        <button aria-label="Copy" className="text-center" onClick={()=>copyToClipBoard(showHtmlTable(exportMode))}>Copier dans le presse-papier</button>
                        <button aria-label="Download" className="text-center" onClick={dl}>Télécharger</button>
                    </>}
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>
            <div className="form-container">
                <Edit tableName={tableName} setTableName={setTableName} table={table} tableHandler={tableHandler} selected={selected} loadTableFromFile={loadTableFromFile} />
                {/* Partie où est afficher le contenu créé */}
                <div className="form-show" onClick={unselect}>  
                    <div className="form-show__header d-flex justify-content-between">
                        <h2 className="form-show__title">Edition tableau</h2>
                        <div className="form-show__buttons">
                            <button aria-label="Export" className="button button-bgnone export" onClick={()=>exportPopup(true)}><i className="fas fa-file-export"></i><span>Exporter</span></button>
                                
                            <button aria-label="Save" data-toggle="modal" data-target="#saveModal" className="button button-bgred button-no-border save" onClick={save}><i className="far fa-save"></i> <span>Sauvegarder</span></button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <div className="app-show__undo">
                            <button aria-label="Undo" className="ml-auto" disabled={temp.lvl===1} onClick={()=>cancel('undo')}><i className={"fas fa-undo-alt fa-2x "+(temp.lvl===1?"text-secondary":"text-danger")}></i></button>
                            <button aria-label="Redo" disabled={temp.lvl===temp.tab.length} onClick={()=>cancel('redo')}><i className={"fas fa-redo-alt fa-2x "+(temp.lvl===temp.tab.length?"text-secondary":"text-success")}></i></button>
                        </div>
                        <div className="form-show__typography">
                            {/* typos */}
                            <select data-typo='font' value={typo.fontFamily} onChange={typoHandler}>
                                {fonts.map((f,i)=>{return(<option style={{fontFamily: f}} key={i} value={f}>{f=='0'?'Choisir une police':f}</option>)})}
                            </select>
                            <select data-typo='size' value={typo.fontSize} onChange={typoHandler}>
                                {fontsSize.map((s,i)=>{return(<option key={i} value={s}>{s=="0"?'Taille':s}</option>)})}
                            </select>
                            {/* fa buttons */}
                            <button data-typo="bold" className={(typo.fontWeight==='bold'?'active':'')} onClick={typoHandler}><i data-typo="bold" className={"fas fa-bold "+(typo.fontWeight==='bold'?'on':'off')}></i></button>
                            <button data-typo="italic" className={(typo.fontStyle==='italic'?'active':'')} onClick={typoHandler}><i data-typo="italic" className={"fas fa-italic "+(typo.fontStyle==='italic'?'on':'off')}></i></button>
                            <button data-typo="underline" className={(typo.textDecoration==='underline'?'active':'')} onClick={typoHandler}><i data-typo="underline" className={"fas fa-underline "+(typo.textDecoration==='underline'?'on':'off')}></i></button>
                            <div className="dropdown table-color-selector">
                                <button aria-label="Colors" className="p-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i style={{color: typo.color}} className="fas fa-tint"></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <BlockPicker colors={['#000000', '#FFFFFF', '#EB7808', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']} color={typo.color} onChangeComplete={handleChangeColor}/>
                                </div>
                            </div>
                            <div className="dropdown table-color-selector">
                                <button aria-label="Background colors" className="p-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i style={{color: typo.backgroundColor}} className="fas fa-fill"></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <BlockPicker colors={['#000000', '#FFFFFF', '#EB7808', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']} color={typo.backgroundColor=='0'?'#FFFFFF':typo.backgroundColor} onChangeComplete={handleChangeBg}/>
                                </div>
                            </div>
                            {/* textalign */}
                            <input className={typo.textAlign==='left'?'active':''} data-typo='left' onClick={typoHandler} type="image" alt="align left" src={svgUrl+'../../resources/assets/images/align-left.svg'}/>
                            <input className={typo.textAlign==='center'?'active':''} data-typo='center' onClick={typoHandler} type="image" alt="align center" src={svgUrl+'../../resources/assets/images/align-center.svg'}/>
                            <input className={typo.textAlign==='right'?'active':''} data-typo='right' onClick={typoHandler} type="image" alt="align right" src={svgUrl+'../../resources/assets/images/align-right.svg'}/>


                            <button className='button button-bgnone copystyle' onClick={()=>setTypo(table.lines[selected.cell.l].cells[selected.cell.c].style)}>Copier style</button>
                            <div className="dropdown applystyle">
                                <button aria-label="Apply" className="button button-bgnone applystyle dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Appliquer style
                                </button>
                                <div className="dropdown-menu text-align-left apply-buttons" aria-labelledby="dropdownMenuButton">
                                    <button aria-label="ApplyAll" data-typo='applyAll' className="dropdown-item" onClick={applyTypo} >Pour le tableau entier</button>
                                    <button aria-label="AppliLine" data-typo='applyLine' className="dropdown-item" onClick={applyTypo} >Pour la ligne selectionnée</button>
                                    <button aria-label="ApplyCol" data-typo='applyCol' className="dropdown-item" onClick={applyTypo} >Pour la colonne selectionnée</button>
                                    <button aria-label="AppliCell" data-typo='applyCell' className="dropdown-item" onClick={applyTypo} >Pour la cellule selectionnée</button>
                                </div>
                            </div>
                        </div>
                        <div className="form-show__preview" id="tablePreview">
                            {showTable()}
                        </div>
                        <h4 className="app-show__helper">{helper}</h4>
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
