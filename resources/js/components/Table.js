import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Table/Edit'
const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Table = props => {

    const [tableName, setTableName] = useState('Mon tableau')
    const [mode, setMode] = useState('create')
    const [table, setTable] = useState({lines: [], parameters: {nbLines: 5, nbColumns: 5, style: {}}, mode:'edit'})
    const [selected, setSelected] = useState({empty: false, line: 0, column: 0, cell: {l:0,c:0}})
    const [helper, setHelper] = useState('')

    const initCell = {content: 'Nouvelle cellule', style:{}, size:{lon: 1, type: 'cell'}}

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
        updTable=updateSelectedStyle(updTable)
        setTable(updTable)
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
                        <td className={cell.size.type==='null'?'d-none':''} colSpan={setCellSize(cell).col} rowSpan={setCellSize(cell).row} style={cell.style} onClick={()=>handleSelected(idL,idC)} key={idC}>
                            <input onFocus={()=>handleSelected(idL,idC)} type="text" data-table="cell" onChange={tableHandler} value={cell.content} />
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

    const handleSelected =(l,c) =>{
        if(table.mode==='fusion') handleFusion(l,c)
        let sel = {empty:selected.cell.l===l&&selected.cell.c===c, line: l, column: c, cell:{l:l,c:c}}
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

    return (
        <div className="Form">
            <div className="form-container">
                <Edit tableName={tableName} setTableName={setTableName} table={table} tableHandler={tableHandler}/>
                {/* Partie où est afficher le contenu créé */}
                <div className="form-show">  
                    <div className="form-show__header d-flex justify-content-between">
                        <h2 className="form-show__title">Edition tableau</h2>
                        <div className="form-show__buttons">
                            <button className="button button-bgnone" >Exporter</button>
                                
                            <button data-toggle="modal" data-target="#saveModal" className="button button-bgred button-no-border" onClick={save}>Sauvegarder</button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">
                            {showTable()}
                        </div>
                        <h4 className="app-show__helper">{helper}</h4>
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
