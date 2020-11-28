import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAppEditor } from '../contexts/EditorContext';
import { useNavigation } from '../contexts/NavigationContext';
import ToolButton from './ToolButton';
import TestGraph from './../components/TestGraph';
import EditorRightMenuTab from './EditorRightMenuTab';
import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddMark from './AddMark';
import {List,ListItem,ListItemIcon,ListItemText} from'@material-ui/core';
import ConsturctorUzla from './ConstructorUzla';
import ConstructorRelation from'./ConstructorRelation';

 const spisokNode = (
 <div>
     <List component="nav" aria-label="main mailbox folders">
        <ConsturctorUzla node={{id: 991}} onClick={e => console.log("Are you clicking, son?")} />
    </List>
</div>);
const spisokRelation = (
    <div>
        <List component="nav" aria-label="main mailbox folders">
            <ConstructorRelation node={{id: 991}} node1 = {{id: 123}}  relation = {{id: 111}} onClick={e => console.log("Are you clicking, son?")} />
        </List>
    </div>);
function Editor() {
    const { setTools, setRightDrawer } = useNavigation();
    const { connect } = useAppEditor();
    const [addMarkOpen, setAddMarkOpen] = useState(false);

    connect('http://localhost:7532/');

    useEffect(() => {
        setTools([
            <ToolButton typeoficon={'cursor'} hint="Интсрумент выделения" />,
            <ToolButton typeoficon={'pencil'} hint="Инструмент узлов" />,
            <ToolButton typeoficon={'pencil-outline'} hint="Инструмент связей"/>,
            <ToolButton typeoficon={'filter'} hint="Фильтры" />,
            <IconButton onClick={() => setAddMarkOpen(true) }>
                <ArrowDownwardIcon />
            </IconButton>
        ]);
        setRightDrawer([
            <div style={{height: 'calc(100vh - 64px)'}}>
                <EditorRightMenuTab panels={[
                    {
                        title: 'Узлы',
                        body: spisokNode
                    },
                    {
                        title: 'Связи',
                        body: spisokRelation
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
            <AddMark opened={addMarkOpen} setOpen={setAddMarkOpen} />
    </div>
    );
}

export default Editor;