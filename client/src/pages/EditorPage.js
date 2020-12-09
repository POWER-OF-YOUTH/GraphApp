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
    const { marks, setMarks } = useAppEditor();

    useEffect(() => {
        if (!account)
            return;
        fetch(`http://localhost/api/graph/getMarksInfo?token=${account.token}`)
            .then(response => response.json())
            .then(json => {
                const arr = json.data.response;
                const map = marks.container;
                for (let i in arr)
                    map.set(arr[i].type, arr[i].properties);
                setMarks({container: map});
            });
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