import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useAppEditor } from '../contexts/EditorContext';

function NodesList({ onClick }) {
    const { nodeProperties, network, setSelectedEntity} = useAppEditor();

    function selectNode(id) {
        network.selectNodes([id], false); 
        setSelectedEntity({nodes: [id], edges: []});
    }

    let items = [];
    nodeProperties.container.forEach((value, key, theMap) => {
        items.push(
            <ListItem button onClick={() => selectNode(key)}>
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

export default NodesList;