import React from 'react';
import { useAccount } from '../contexts/AccountContext';
import history from '../history';

function EditorPage() {
    const { account } = useAccount();
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