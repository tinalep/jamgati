import React from 'react';

const Element = props => {
    const displayThis = ()=>{
        return <li><a href={'//'+props.link}>{props.name+' '+'position:'+props.pos}</a></li>
    }

    return displayThis();
}

export default Element;