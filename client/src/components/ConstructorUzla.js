import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useAppEditor } from '../contexts/EditorContext';

function ConsturctorUzla({ node, onClick }) {
    const { graphData } = useAppEditor();
    return (
    <div>
        {graphData.nodes.map(node => {
            return (<ListItem button onClick={onClick}>
            <ListItemText primary={node.id} />
         </ListItem>)
        })
        }
        
    </div>
    );
}

export default ConsturctorUzla;