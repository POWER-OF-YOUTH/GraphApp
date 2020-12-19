import React, { useEffect } from 'react';
import ToolButton from '../components/ToolButton';
import { useAccount } from '../contexts/AccountContext';
import { useNavigation } from '../contexts/NavigationContext';
import history from '../history';
import Editor from '../components/Editor';
import { Button } from '@material-ui/core';
import { useAppEditor } from '../contexts/EditorContext';

function EditorPage() {
    const { account } = useAccount();
    const { marks, setMarks, nodeProperties, setNodeProperties, addNodes } = useAppEditor();

    useEffect(async () => {
        if (!account)
            return;
        let marksInfo = await (await fetch(`http://localhost/api/graph/getMarksInfo?token=${account.token}`)).json();
        const arr = marksInfo.data.response;
        let map = marks.container;
        for (let i in arr)
            map.set(arr[i].type, arr[i].properties);
        setMarks({container: map});

        const nodes = await (await fetch(`http://localhost/api/graph/getNodes?token=${account.token}`)).json();
        map = nodeProperties.container;
        addNodes(nodes.data.response);
        setNodeProperties({container: map});
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