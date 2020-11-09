import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppEditor } from '../contexts/EditorContext';
import { useNavigation } from '../contexts/NavigationContext';
import ToolButton from './ToolButton';
import TestGraph from './../components/TestGraph';
import EditorRightMenuTab from './EditorRightMenuTab';

function Editor() {
    const { setTools, setRightDrawer } = useNavigation();
    const { connect } = useAppEditor();

    connect('http://localhost:7532/');

    useEffect(() => {
        setTools([
            <ToolButton typeoficon={'cursor'} hint="Интсрумент выделения" />,
            <ToolButton typeoficon={'pencil'} hint="Инструмент узлов" />,
            <ToolButton typeoficon={'pencil-outline'} hint="Инструмент связей"/>,
            <ToolButton typeoficon={'filter'} hint="Фильтры" />
        ]);
        setRightDrawer([
            <div style={{height: 'calc(100vh - 64px)'}}>
                <EditorRightMenuTab panels={[
                    {
                        title: 'Узлы',
                        body: <div><Button>raz</Button><Button>dwa</Button></div>
                    },
                    {
                        title: 'Связи',
                        body: <div>Тут будут связи</div>
                    }
                ]} />
                <EditorRightMenuTab panels={[
                    {
                        title: 'Свойства',
                        body: <div>Свойственная панель</div>
                    }
                ]} />
            </div>
            
        ])
    }, []);

    return (<div>
            <TestGraph/>
    </div>
    );
}

export default Editor;