import React from 'react';

const Element = props => {
    const displayThis = ()=>{
        return <a target="_blank" href={'//'+props.link}>{props.name}</a>
    }

    return displayThis();
}

export default Element;