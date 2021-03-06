import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAppEditor } from '../contexts/EditorContext';
import { useNavigation } from '../contexts/NavigationContext';
import ToolButton from './ToolButton';
import GraphContainer from './GraphContainer';
import EditorRightMenuTab from './EditorRightMenuTab';
import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddMarkDialog from './AddMarkDialog';
import {List,ListItem,ListItemIcon,ListItemText} from'@material-ui/core';
import RelationMenu from './RelationNameDialog'
import NodesList from './NodesList';
import RelationsList from'./RelationsList';
import ActiveMarkSelectionDialog from './ActiveMarkSelectionDialog';
import { useAccount } from '../contexts/AccountContext';
import PropertiesOverview from './PropertiesOverview';
import config from '../config.json';

 const spisokNode = (
 <div>
     <List component="nav">
        <NodesList onClick={(event, id) => console.log("Are you clicking, son?")} />
    </List>
</div>);
const relationsList = (
    <div>
        <List component="nav">
            <RelationsList onClick={(event, id) => console.log("Are you clicking, son?")} />
        </List>
    </div>);
function Editor() {
    const { setTools, setRightDrawer, } = useNavigation();
    const { connect, selectedEntity, nodeProperties } = useAppEditor();
    
    const [isRelationMenuOpen, setIsRelationMenuOpen] = useState(false);
    const [addMarkOpen, setAddMarkOpen] = useState(false);
    const [activeMarkOpen, setActiveMarkOpen] = useState(false);

    connect(`http://${config.host}:7532/`);

    useEffect(() => {
        setTools([
            <ToolButton typeoficon={'cursor'} hint="Инструмент выделения" />,
            <ToolButton onClick={() => setActiveMarkOpen(true)} typeoficon={'add-node'} hint="Инструмент узлов" />,
            <ToolButton onClick={() => setIsRelationMenuOpen(true)} typeoficon={'add-relation'} hint="Инструмент связей" />,
            <ToolButton typeoficon={'delete'} hint="Инструмент удаления" />,
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
                        body: relationsList
                    }
                ]} />
                <EditorRightMenuTab panels={[
                    {
                        title: 'Свойства',
                        body: <PropertiesOverview selectedEntity={selectedEntity} nodeProperties={nodeProperties} />
                    }
                ]} />
            </div>
            
        ])
    }, []);

    return (
    <div>
        <GraphContainer/>
        <AddMarkDialog opened={addMarkOpen} setOpen={setAddMarkOpen} />
        <ActiveMarkSelectionDialog opened={activeMarkOpen} setOpen={setActiveMarkOpen} />
        <RelationMenu opened={isRelationMenuOpen} setOpen={setIsRelationMenuOpen} />
    </div>
    );
}

export default Editor;