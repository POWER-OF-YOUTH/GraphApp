import React, { useEffect } from 'react';
import ToolButton from '../components/ToolButton';
import { useAccount } from '../contexts/AccountContext';
import { useNavigation } from '../contexts/NavigationContext';
import history from '../history';

function EditorPage() {
    const { account } = useAccount();
    const { setTools } = useNavigation();
    useEffect(() => {
        setTools([
        <ToolButton typeoficon={'cursor'}/>,
        <ToolButton typeoficon={'pencil'}/>,
        <ToolButton typeoficon={'pencil-outline'}/>,
        <ToolButton typeoficon={'filter'}/>
    ]);
    }, []);

    if (!account)
    {
        history.push('/');
        return null;
    }
    
    
    return (
        <div>
            Тут будет сам редактор
        </div>
    );
}

export default EditorPage;