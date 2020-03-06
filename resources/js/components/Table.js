import React, { useState, useEffect } from "react"
import ReactDOM from 'react-dom';
import Edit from './Table/Edit'
const R = require('ramda');
const beauty_html = require('js-beautify').html;

const Table = props => {

    const [tableName, setTableName] = useState('Mon tableau')
    const [table, setTable] = useState({lines: [], parameters: {nbLines: 5, nbColumns: 5, style: {}}})

    useEffect(()=>{
        if(table.lines.length==0)
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

    const tableHandler = (e)=>{
        let target = e.target
        let updTable = R.clone(table)
        switch(target.dataset.table){
            case 'nbLines': updTable.parameters.nbLines = target.value; break;
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
