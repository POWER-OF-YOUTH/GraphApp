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

 const spisok = (<div> <List component="nav" aria-label="main mailbox folders">
     <ListItem button>
        <ListItemText primary="Inbox" />
     </ListItem>
     <ListItem button>
         <ListItemText primary="что-тотам" />
     </ListItem></List>
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
                        body: spisok
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
            <AddMark opened={addMarkOpen} setOpen={setAddMarkOpen} />
    </div>
    );
}

export default Editor;