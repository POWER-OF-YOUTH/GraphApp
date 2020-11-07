import React, { useEffect } from 'react';
import ToolButton from '../components/ToolButton';
import { useAccount } from '../contexts/AccountContext';
import { useNavigation } from '../contexts/NavigationContext';
import history from '../history';
import Editor from '../components/Editor';
import { Button } from '@material-ui/core';
import { EditorProvider } from '../contexts/EditorContext';

function EditorPage() {
    const { account } = useAccount();

    if (!account)
    {
        history.push('/');
        return null;
    }
    
    
    return (
        <div>
            <EditorProvider>
                <Editor />
            </EditorProvider>
        </div>
    );
}

export default EditorPage;