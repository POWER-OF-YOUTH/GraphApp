import ToolButton from "./ToolButton";
import Graph from 'react-graph-vis';
import React from 'react';
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import {useState} from 'react';



     const graph = {
         nodes: [
             { id: 1, label: "Node 1", title: "node 1 tootip text" },
             { id: 2, label: "Node 2", title: "node 2 tootip text" },
             { id: 3, label: "Node 3", title: "node 3 tootip text" },
             { id: 4, label: "Node 4", title: "node 4 tootip text" },
             { id: 5, label: "Node 5", title: "node 5 tootip text" }
         ],
         edges: [
             { from: 1, to: 2 },
             { from: 1, to: 3 },
             { from: 2, to: 4 },
             { from: 2, to: 5 }
         ]
     };

 function TestGraph() {
         const [graphData, setGraphData] = useState(graph);
         const options = {
             layout: {
                 hierarchical: true
             },
             edges: {
                 color: "#000000"
             },
             height: "500px"
         };

         const generateRandomNode = e => {
             let newGraph = cloneDeep(graphData);

             const newNodeId = Math.max(...newGraph.nodes.map(d => d.id)) + 1;
             const newNode = {
                 id: newNodeId,
                 label: `Node ${newNodeId}`,
                 title: `node ${newNodeId} tootip text`
             };
             const randomIndexForEdge =
                 newGraph.nodes[Math.floor(Math.random() * newGraph.nodes.length)].id;

             const fromBool = [true, false][Math.floor(Math.random() * 2)];

             const newRandomEdge = {
                 from: !!fromBool ? randomIndexForEdge : newNodeId,
                 to: !fromBool ? randomIndexForEdge : newNodeId
             };

             newGraph.nodes.push(newNode);
             newGraph.edges.push(newRandomEdge);
             setGraphData(newGraph);
         };
         return (
             <div className="App">
                 <Graph key={uuidv4} graph={graphData} options={options} />
             </div>
         );
     }

export default TestGraph;

