import React, { useEffect } from 'react';
import ToolButton from '../components/ToolButton';
import { useAccount } from '../contexts/AccountContext';
import { useNavigation } from '../contexts/NavigationContext';
import history from '../history';
import Editor from '../components/Editor';
import { Button } from '@material-ui/core';

function EditorPage() {
    const { account } = useAccount();
    const { setTools, setRightDrawer } = useNavigation();

    useEffect(() => {
        setTools([
            <ToolButton typeoficon={'cursor'} hint="Интсрумент выделения" />,
            <ToolButton typeoficon={'pencil'} hint="Инструмент узлов" />,
            <ToolButton typeoficon={'pencil-outline'} hint="Инструмент связей"/>,
            <ToolButton typeoficon={'filter'} hint="Фильтры" />
        ]);
        setRightDrawer([
            <Button>asdasd</Button>,
            <Button>asdasd</Button>,
            <Button>asdasd</Button>,
            <Button>asdasd</Button>,
            <Button>asdasd</Button>,
            <Button>asdasd</Button>,
            <Button>asdasd</Button>,
            <Button>Бан</Button>
        ])
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