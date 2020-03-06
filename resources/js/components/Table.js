import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Table/Edit'
const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Table = props => {

    const [tableName, setTableName] = useState('Mon tableau')
    const [table, setTable] = useState({lines: [], parameters: {nbLines: 5, nbColumns: 5, style: {}}})

    useEffect(()=>{
        if(table.lines.length== 0)
            setTable(createTab())
    }, []);

    const createTab = ()=>{
        let l = table.parameters.nbLines
        let c = table.parameters.nbColumns
        let newTable = R.clone(table)
        for(let i =1; i<=l; i++){
            let line = {id: 'l'+i, cells: [], style: ''}
            for(let j = 1; j<=c; j++){
                let cell = {}
                cell.id = 'l'+i+'c'+j
                cell.content = 'CELL'+i+''+j
                line.cells.push(cell)
            }
            newTable.lines.push(line)
        }
        console.log(newTable)
        return newTable;
    }

    const updLines = (tab)=>{
        let t = tab
        let l = t.parameters.nbLines-t.lines.length
        let c = t.parameters.nbColumns 
        for(let i = 1; i<=Math.abs(l); i++){ 
            if(l>0)
            {
                let line = {id: 'l'+t.lines.length, cells: [], style: ''}
                for(let j = 1; j<=c; j++){
                    let cell = {}
                    cell.id = line.id+'c'+j
                    cell.content = 'CELL'+(t.lines.length+1)+''+j
                    line.cells.push(cell)
                }
                t.lines.splice(tab.lines.length,0,line)
            }
            else
            t.lines.splice(tab.lines.length-1,1)
            
        }
        return t
    }

    const updColumns = (tab)=>{
        let t = tab
        let c = t.parameters.nbColumns-t.lines[0].cells.length
        t.lines.forEach((line,id)=>{
            if(c>0)
            {
                let cell = {}
                cell.id = line.id+'c'+(line.cells.length+1)
                cell.content = 'CELL'+(id+1)+''+(line.cells.length+1)
                line.cells.splice(line.cells.length,0,cell)
            }
            else
                line.cells.splice(line.cells.length-1,1)
        })
        return t
    }

    const tableHandler = (e)=>{
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
        }
        setTable(updTable)
    }

    const showTable = ()=>{
        let tableContent =
        table.lines.map((line,idL)=>{
            return <tr key={idL}>{line.cells.map((cell,idC)=>{return(<td key={idC}>{cell.content}</td>)})}</tr>
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
