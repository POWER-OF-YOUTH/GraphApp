import React from 'react';
import { useAppEditor } from '../contexts/EditorContext';
import PropertyEditor from './PropertyEditor';

function PropertiesOverview() {
    const {selectedEntity, nodeProperties} = useAppEditor();
    if (selectedEntity.nodes.length == 0)
        return <p>Ничего не выбрано</p>;
    if (selectedEntity.nodes.length > 1)
        return <p>Выбрано много нод</p>;
    const id = selectedEntity.nodes[0];
    const value = nodeProperties.container.get(id);
    let result = [<h3>Свойства ноды [{id} : {value.labels[0]}]</h3>];
    for (let i in value.properties) {
        result.push(<PropertyEditor propertyName={i} nodeId={id} defaultValue={value.properties[i]} />);
    }
    return result;
}

export default PropertiesOverview;