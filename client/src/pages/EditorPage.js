import React, { useEffect } from 'react';
import { useAccount } from '../contexts/AccountContext';
import history from '../history';
import Editor from '../components/Editor';
import { useAppEditor } from '../contexts/EditorContext';
import config from '../config.json';

function EditorPage() {
    const { account } = useAccount();
    const { marks, setMarks, nodeProperties, setNodeProperties, addNodes, addRelations } = useAppEditor();

    useEffect(() => {
        async function inner() {
            if (!account)
            return;
            let marksInfo = await (await fetch(`http://${config.host}/api/graph/getMarksInfo?token=${account.token}`)).json();
            const arr = marksInfo.data.response;
            let map = marks.container;
            for (let i in arr)
                map.set(arr[i].type, arr[i].properties);
            setMarks({container: map});

            const nodes = await (await fetch(`http://${config.host}/api/graph/getNodes?token=${account.token}`)).json();
            //map = nodeProperties.container;
            addNodes(nodes.data.response);
            //setNodeProperties({container: map});

            const relationsResult = await (await fetch(`http://${config.host}/api/graph/getRelations?token=${account.token}`)).json();
            addRelations(relationsResult.data);
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