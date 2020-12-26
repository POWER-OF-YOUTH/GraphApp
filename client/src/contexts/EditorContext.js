import React, { createContext, useContext, useEffect, useState } from 'react';


const EditorContext = createContext();

export const useAppEditor = () => {
    return useContext(EditorContext);
}

export const EditorProvider = ({ children }) => {
    
    function connect() {

    }

    const [network, setNetwork] = useState(undefined);
    const [selectedTool, setSelectedTool] = useState('cursor');
    const [marks, setMarks] = useState({container: new Map()});
    const [graphData, setGraphData] = useState({
        nodes: [
            // { id: 1, label: "Node 1", title: "node 1 tootip text", group: 1 },
            // { id: 2, label: "Node 2", title: "node 2 tootip text", group: 1 },
            // { id: 3, label: "Node 3", title: "node 3 tootip text", group: 2, shape: 'hexagon' },
            // { id: 4, label: "Node 4", title: "node 4 tootip text", color: '#FF0000', group: 2 },
            // { id: 5, label: "Node 5", title: "node 5 tootip text", shape: 'triangle' }
        ],
        edges: [
            // { from: 1, to: 2 },
            // { from: 1, to: 3 },
            // { from: 2, to: 4, dashes: true, hoverWidth: 4 },
            // { from: 2, to: 5, label: 'asdasdasds' }
        ]
    });
    const [nodeProperties, setNodeProperties] = useState({container: new Map()});
    const [relations, setRelations] = useState({container: new Map()});
    const [activeMarks, setActiveMarks] = useState(new Set());
    const [selectedEntity, setSelectedEntity] = useState({nodes: [], edges: []});

    function addNodes(nodes) {
        const newGraph = {
            nodes: []
        }
        const map = nodeProperties.container;
        for (let i in nodes) {
            const node = nodes[i];
            map.set(node.identity, {labels: node.labels, properties: node.properties, x: node.x == undefined ? 0 : node.x, x: node.y == undefined ? 0 : node.y});
            newGraph.nodes.push({
                id: node.identity,
                label: `${node.identity}`,
                shape: 'circle',
                x: node.x == undefined ? 0 : node.x, y: node.y == undefined ? 0 : node.y});
        }
        
        setNodeProperties({container: map});
        setGraphData(data => { return {nodes: data.nodes.concat(newGraph.nodes), edges: data.edges}});
    }

    function addRelations(relationsArray) {
        const newGraph = {
            edges: []
        }
        const map = relations.container;
        for (let i in relationsArray) {
            const relation = relationsArray[i];
            map.set(relation.identity, relation);
            newGraph.edges.push({from: relation.start, to: relation.end, label: relation.type});
        }
        setRelations({container: map});
        setGraphData(data => { return {nodes: data.nodes, edges: data.edges.concat(newGraph.edges)}});
    }

    return (
        <EditorContext.Provider value={{
            connect,
            selectedTool,
            setSelectedTool,
            marks, setMarks,
            activeMarks,
            graphData,
            setGraphData,
            nodeProperties,
            setNodeProperties,
            selectedEntity,
            setSelectedEntity,
            relations,
            setRelations,
            addNodes,
            addRelations,
            network,
            setNetwork,
        }}
            >
                { children }
        </EditorContext.Provider>
    );
}
