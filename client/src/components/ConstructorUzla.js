import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useAppEditor } from '../contexts/EditorContext';

function ConsturctorUzla({ onClick }) {
    const { nodeProperties } = useAppEditor();
    let items = [];
    nodeProperties.container.forEach((value, key, theMap) => {
        items.push(
            <ListItem button onClick={onClick}>
                <ListItemText primary={key} />
            </ListItem>
        )
    });
    
    return (
        <div>
            {items}
        </div>
    );
}

export default ConsturctorUzla;