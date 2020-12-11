import React, { createContext, useContext, useEffect, useState } from 'react';


const EditorContext = createContext();

export const useAppEditor = () => {
    return useContext(EditorContext);
}

export const EditorProvider = ({ children }) => {
    
    function connect() {

    }

    const [selectedTool, setSelectedTool] = useState('cursor');
    const [marks, setMarks] = useState({container: new Map()});
    const [graphData, setGraphData] = useState({
        nodes: [
            { id: 1, label: "Node 1", title: "node 1 tootip text", group: 1 },
            { id: 2, label: "Node 2", title: "node 2 tootip text", group: 1 },
            { id: 3, label: "Node 3", title: "node 3 tootip text", group: 2, shape: 'hexagon' },
            { id: 4, label: "Node 4", title: "node 4 tootip text", color: '#FF0000', group: 2 },
            { id: 5, label: "Node 5", title: "node 5 tootip text", shape: 'triangle' }
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4, dashes: true, hoverWidth: 4 },
            { from: 2, to: 5, label: 'asdasdasds' }
        ]
    });
    const [activeMarks, setActiveMarks] = useState(new Set());

    return (
        <EditorContext.Provider value={{
            connect,
            selectedTool,
            setSelectedTool,
            marks, setMarks,
            activeMarks,
            graphData,
            setGraphData}}
            >
                { children }
        </EditorContext.Provider>
    );
}
