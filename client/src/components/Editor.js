import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAppEditor } from '../contexts/EditorContext';
import { useNavigation } from '../contexts/NavigationContext';
import ToolButton from './ToolButton';
import GraphContainer from './GraphContainer';
import EditorRightMenuTab from './EditorRightMenuTab';
import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddMark from './AddMark';
import {List,ListItem,ListItemIcon,ListItemText} from'@material-ui/core';
import ConsturctorUzla from './ConstructorUzla';
import ConstructorRelation from'./ConstructorRelation';
import ActiveMarkSelectorWindow from './ActiveMarkSelectorWindow';
import { useAccount } from '../contexts/AccountContext';

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
    const { setTools, setRightDrawer, nodeProperties, setNodeProperties } = useNavigation();
    const { connect } = useAppEditor();
    const [addMarkOpen, setAddMarkOpen] = useState(false);
    const [activeMarkOpen, setActiveMarkOpen] = useState(false);

    connect('http://localhost:7532/');

    useEffect(() => {
        setTools([
            <ToolButton typeoficon={'cursor'} hint="Интсрумент выделения" />,
            <ToolButton onClick={() => setActiveMarkOpen(true)} typeoficon={'add-node'} hint="Инструмент узлов" />,
            <ToolButton typeoficon={'add-relation'} hint="Инструмент связей" />,
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

    return (
    <div>
        <GraphContainer/>
        <AddMark opened={addMarkOpen} setOpen={setAddMarkOpen} />
        <ActiveMarkSelectorWindow opened={activeMarkOpen} setOpen={setActiveMarkOpen} />
    </div>
    );
}

export default Editor;