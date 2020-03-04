import React from 'react';

const Element = props => {
    const displayThis = ()=>{
        return <a target="_blank" style={props.style} href={'//'+props.link} >{props.name}</a>
    }

    return displayThis();
}

export default Element;