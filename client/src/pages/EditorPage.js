import React, { useEffect } from 'react';
import ToolButton from '../components/ToolButton';
import { useAccount } from '../contexts/AccountContext';
import { useNavigation } from '../contexts/NavigationContext';
import history from '../history';
import Editor from '../components/Editor';
import { Button } from '@material-ui/core';

function EditorPage() {
    const { account } = useAccount();

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