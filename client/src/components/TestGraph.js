import ToolButton from "./ToolButton";
import Graph from 'react-graph-vis';
import React from 'react';
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

const graph = {
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
};

function TestGraph() {
    const [graphData, setGraphData] = useState(graph);
    const options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        clickToUse: true,
        locale: 'ru',
        layout: {
            hierarchical: false
        },
        edges: {
            color: "#000000",
            hoverWidth: 10,
            physics: false
        },
        interaction: {
            hover: true,
            navigationButtons: true,
            multiselect: true
        },
        manipulation: {
            enabled: true,
            addNode: function(nodeData, callback) {
                console.log('add n');
            },
            addEdge: function(edgeData, callback) {
                console.log('add e');
            },
            editNode: function(nodeData, callback) {
                console.log('edit n');

            },
            editEdge: function(edgeData, callback) {

                console.log('add edit e');

            },

        }
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
            console.log(nodes);
        }
    };

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
            <Graph key={uuidv4} graph={graphData} options={options} events={events} />
        </div>
    );
}

export default TestGraph;

