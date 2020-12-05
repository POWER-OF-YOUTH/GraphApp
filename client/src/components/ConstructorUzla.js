import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

function ConsturctorUzla({ node, onClick }) {
    return (
    <div>
        <ListItem button onClick={onClick}>
           <ListItemText primary={node.id} />
        </ListItem>
    </div>
    );
}

export default ConsturctorUzla;