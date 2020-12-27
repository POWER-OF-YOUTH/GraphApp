import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useAppEditor } from '../contexts/EditorContext';

function ConstructorRelation({ onClick }) {
    const { relations } = useAppEditor();
    
    let items = [];
    relations.container.forEach((value, key, theMap) => {
        items.push(
            <ListItem button onClick={onClick}>
                <ListItemText primary={`id:${key}, ${value.start} → ${value.end} `} />
            </ListItem>
        )
    });
    
    return (
        <div>
            {items}
        </div>
    );
}
export default ConstructorRelation;