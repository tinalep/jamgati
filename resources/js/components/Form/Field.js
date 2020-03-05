import React from 'react';


const Field = props =>{

    const displayField = ()=>{
        switch(props.type){
            case 'checkbox' : case 'radio' : return (
                                <>
                                    <p key={'p'+props.pos} className={props.class}>{props.label}</p> 
                                    {props.values.map((value,index)=>{
                                        return(
                                            <div key={'div'+props.pos+index}>
                                                <input key={'input'+props.pos+index} name={props.label+props.pos} type={props.type} id={'value'+index}/>
                                                <label key={'label'.pos} htmlFor={'value'+index}>{value}</label>
                                            </div>
                                        )
                                    })}
                                </>
            );
            case 'select' : return (
                <>
                    <label htmlFor={'select'+props.pos}>{props.label}</label><br/>
                    <select id={'select'+props.pos} key={'select'+props.pos} className={props.class}>
                    {props.values.map((value,index)=>{
                        return(
                        <option key={index}>{value}</option>
                        )
                    })}
                    </select>
                </>
);
            case 'textarea' : return (
                    <>
                        <label htmlFor={props.id}>{props.label}</label>
                        <br/>
                        <textarea placeholder={props.placeholder} id={props.id}></textarea>
                    </>
            )
            case 'button' : return (<button key={props.pos} type="submit">{props.label}</button>)
            
            default : return (
                    <>
                        <label key={props.pos} className={props.class} htmlFor={props.id}>{props.label+(props.type==='text-hidden'?' (Champ caché pour l\'utilisateur)':'')}</label>
                        <br/>
                        <input readOnly onFocus={(e)=>e.target.removeAttribute('readonly')} type={props.type} placeholder={props.placeholder} onChange={props.onChange} id={props.id}/>
                    </>
            )
        }
    }

    return(
        <div key={props.pos} className={props.className ? props.className : 'form-group'}>
            {displayField()}
        </div>)
}

export default Field;
