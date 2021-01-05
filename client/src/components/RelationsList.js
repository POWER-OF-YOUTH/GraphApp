import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useAppEditor } from '../contexts/EditorContext';

function RelationsList({ onClick }) {
    const { relations, network, setSelectedEntity } = useAppEditor();

    function selectRelation(id) {
        network.selectEdges([id]); 
        setSelectedEntity({nodes: [], edges: [id]});
    }
    
    let items = [];
    relations.container.forEach((value, key, theMap) => {
        items.push(
            <ListItem button onClick={() => selectRelation(key)}>
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
export default RelationsList;