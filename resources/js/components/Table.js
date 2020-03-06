import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Table/Edit'
const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Table = props => {

    const [tableName, setTableName] = useState('Mon tableau')
    const [table, setTable] = useState({lines: [], parameters: {nbLines: 5, nbColumns: 5, style: {}}})
    const [selected, setSelected] = useState({line: 0, column: 0, cell: {x:0,y:0}})

    useEffect(()=>{
        if(table.lines.length== 0)
            setTable(createTab())
        else{
            setTable(updateSelectedStyle(R.clone(table)))
            console.log(selected)
        }
    }, [selected]);


    const createTab = ()=>{
        let l = table.parameters.nbLines
        let c = table.parameters.nbColumns
        let newTable = R.clone(table)
        for(let i =1; i<=l; i++){
            let line = {id: 'l'+i, cells: [], style: {}}
            for(let j = 1; j<=c; j++){
                let cell = {id: 'l'+i+'c'+j, content: 'CELL'+i+''+j, style:{}}
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
                    let cell = {id: line.id+'c'+j, content: 'E'+(t.lines.length+1)+j, style: {}}
                    line.cells.push(cell)
                }
                t.lines.splice((pos==-1?t.lines.length:selected.line+pos),0,line)
            }
            else
            t.lines.splice(t.lines.length-1,1)
            
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
                    let cell = {id: line.id+'c'+(line.cells.length+1), content: 'E'+(id+1)+''+(line.cells.length+1), style:{}}
                    line.cells.splice((pos==-1?line.cells.length:selected.column+pos),0,cell)
                }
                else
                    line.cells.splice(line.cells.length-1,1)
            })
        }
        return t
    }

    const updateSelectedStyle = (tab)=>{
        let t = R.clone(tab)
        t.lines.forEach((line,idL)=>{
            line.cells.forEach((cell,idC)=>{
                let bg =
                (idL===selected.cell.x?
                    (idC===selected.cell.y?'#EB7808':'#ef9339')
                    :
                    (idC===selected.cell.y?'#f3ae6a':'unset')
                ) //1: #F1A214 2: #EC840C 3: #EB7808
                cell.style.backgroundColor = bg
            })
        })
        return(t)
    }

    const tableHandler = (e)=>{
        let pos = 0
        let target = e.target
        let updTable = R.clone(table)
        let val = target.value
        switch(target.dataset.table){
            case 'nbLines':
                updTable.parameters.nbLines = val;
                updTable = updLines(updTable);
            break;
            case 'nbColumns':
                updTable.parameters.nbColumns = val;
                updTable = updColumns(updTable);
            break;
            case 'lineBefore' : case 'lineAfter' :
                if(target.dataset.table.includes('Before'))
                {
                    let sel = R.clone(selected)
                    sel.line++
                    sel.cell.x++
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
                    sel.cell.y++
                    setSelected(sel)
                }
                else pos++
                updTable.parameters.nbColumns += 1;
                updTable = updColumns(updTable, pos);
            break;
        }
        updTable=updateSelectedStyle(updTable)
        setTable(updTable)
    }

    const showTable = ()=>{
        let tableContent =
        table.lines.map((line,idL)=>{
            return <tr key={idL}>{line.cells.map((cell,idC)=>{return(<td style={cell.style} onClick={()=>setSelected({line:idL, column:idC, cell:{x:idL,y:idC}})} key={idC}>{cell.content}</td>)})}</tr>
        })
        return(
            <table className="table">
                <thead className="thead-light">
                    {tableContent[0]}
                </thead>
                <tbody>
                    {tableContent.filter(e=>e!==tableContent[0])}
                </tbody>
            </table>
        )
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
                                
                            <button className="button button-bgred button-no-border" >Sauvegarder</button>
                        </div>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">
                            {showTable()}
                        </div>
                        <h4>Ligne selectionnée: {selected.line+1}</h4>
                        <h4>Colonne selectionnée: {selected.column+1}</h4>
                        <h4>Cellule selectionnée: {(selected.cell.x+1)+'-'+(selected.cell.y+1)}</h4>
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
