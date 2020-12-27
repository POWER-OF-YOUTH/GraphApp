import React, { useEffect } from 'react';
import { useAccount } from '../contexts/AccountContext';
import history from '../history';
import Editor from '../components/Editor';
import { useAppEditor } from '../contexts/EditorContext';
import config from '../config.json';

function EditorPage() {
    const { account } = useAccount();
    const { marks, setMarks, nodeProperties, setNodeProperties, addNodes, addRelations, initializeNodes } = useAppEditor();

    useEffect(() => {
        async function loadMarks() {
            let url = `http://${config.host}/api/graph/getMarksInfo?token=${account.token}`;

            const marksInfo = (await (await fetch(url)).json()).data.response;
            
            let marksMap = new Map();
            for (let i = 0; i < marksInfo.length; i++)
                marksMap.set(marksInfo[i].type, marksInfo[i].properties);
            
            setMarks({container: marksMap});
        }

        async function loadNodes() {
            let url = `http://${config.host}/api/graph/getNodes?token=${account.token}`;

            const nodes = await (await fetch(url)).json();
            let map = nodeProperties.container;
            initializeNodes(nodes.data.response);
        }

        async function loadRelations() {
            let url = `http://${config.host}/api/graph/getRelations?token=${account.token}`;

            const relationsResult = await (await fetch(url)).json();
            addRelations(relationsResult.data);
        }

        async function inner() {
            if (!account)
            return;

            loadMarks();

            loadNodes();

            loadRelations();
        }

        inner();
    }, []);

    if (!account)
    {
        history.push('/');
        return null;
    }
    
    return (
        <div>
            <Editor />
        </div>
    );
}

export default EditorPage;