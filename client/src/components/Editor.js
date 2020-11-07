import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppEditor } from '../contexts/EditorContext';
import { useNavigation } from '../contexts/NavigationContext';
import ToolButton from './ToolButton';
import TestGraph from './../components/TestGraph';

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

    return (<div>
            <TestGraph/>
    </div>
    );
}

export default Editor;