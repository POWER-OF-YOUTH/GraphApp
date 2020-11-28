import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
function ConstructorRelation({ node,node1,relation, onClick }) {
    return (
        <div>
            <ListItem button onClick={onClick}>
                <ListItemText primary={`id:${relation.id}, ${node.id} <==> ${node1.id} `} />
            </ListItem>
        </div>
    );
}
export default ConstructorRelation;