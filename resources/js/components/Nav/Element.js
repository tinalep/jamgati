import React from 'react';

const Element = props => {
    const displayThis = ()=>{
        return <li className="mx-2"><a target="_blank" href={'//'+props.link}>{props.name}</a></li>
    }

    return displayThis();
}

export default Element;