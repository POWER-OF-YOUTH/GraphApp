import ToolButton from "./ToolButton";
import Graph from 'react-graph-vis';
import React from 'react';
import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';
import { useAppEditor } from "../contexts/EditorContext";
import { useAccount } from "../contexts/AccountContext";
import config from '../config.json';

let counter = 10;

function GraphContainer() {
    const { account } = useAccount(); // To bad

    const {
        selectedTool,
        graphData,
        setGraphData,
        activeMarks,
        selectedEntity,
        setSelectedEntity,
        addNode,
        addNodes,
        relations,
        addRelation,
        addRelations,
        network,
        setNetwork,
        createdRelationName,
        nodeProperties
    } = useAppEditor();
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
            hoverWidth: 2,
            physics: true
        },
        nodes: {
            physics: true
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
            const { nodes, edges } = event;
            if (selectedTool == 'add-relation' 
            && selectedEntity.nodes.length == 1 
            && nodes.length == 1 
            && selectedEntity.nodes[0] != nodes[0]
            && createdRelationName !== '') {
                const parent = selectedEntity.nodes[0];
                const child = nodes[0];
                fetch(`http://${config.host}/api/graph/createRelation?token=${account.token}&from=${parent}&to=${child}&name=${createdRelationName}`)
                    .then(response => response.json())
                    .then(json => addRelation({identity: json.data.identity, start: parent, end: child, type: createdRelationName})) // TODO: set identity
                    .catch(err => console.log(err));

                setSelectedEntity({nodes: [], edges: []}) //Сбрасываем выделение
                network.unselectAll();
            }
            else
                setSelectedEntity({nodes, edges});
        },
        click: function(event) {
            if (selectedTool == 'add-node' && activeMarks.size > 0) { //TODO: Можно ускорить!
                fetch(`http://${config.host}/api/graph/createNode?token=${account.token}&mark=${Array.from(activeMarks).join('+')}`)
                    .then(response => response.json())
                    .then(async json => await fetch(`http://${config.host}/api/graph/getNode?token=${account.token}&id=${json.data.identity}`))
                    .then(response => response.json())
                    .then(json => {
                        json.data.response.x = event.pointer.canvas.x; //event.pointer.canvas - содержит координаты указателя.
                        json.data.response.y = event.pointer.canvas.y;
                        addNode(json.data.response)
                    });
                // api/graph/createNode?token=someToken&mark=type1+type2
            }
            else if (selectedTool == 'delete') {
                if (selectedEntity.nodes.length > 0) {
                    let node = graphData.nodes.find((node, index, arr) => node.id === selectedEntity.nodes[0]);
                    if(node != undefined)
                        fetch(`http://${config.host}/api/graph/deleteNode?token=${account.token}&id=${node.id}`);
                    nodeProperties.container.delete(node.id)
                }
                else if (selectedEntity.edges.length > 0) {
                    let edge = graphData.edges.find((edge, index, arr) => edge.id === selectedEntity.edges[0]);
                    if(edge != undefined)
                        fetch(`http://${config.host}/api/graph/deleteRelation?token=${account.token}&from=${edge.from}&to=${edge.to}&name=${edge.label}`);
                    relations.container.delete(selectedEntity.edges[0]);
                }
                setSelectedEntity({nodes: [], edges: []})
                network.deleteSelected();
            }
        }
    };

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
            <Graph key={uuidv4} graph={graphData} options={options} events={events} getNetwork={network => setNetwork(network)}/>
        </div>
    );
}

export default GraphContainer;

