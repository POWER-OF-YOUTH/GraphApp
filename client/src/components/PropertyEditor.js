import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save'
import DirectionsIcon from '@material-ui/icons/Directions';

import { useAppEditor } from '../contexts/EditorContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function PropertyEditor({ propertyName, nodeId, defaultValue="None" }) {
    const classes = useStyles();
    const { updateNodeProperty } = useAppEditor();

    const [propertyValue, setPropertyValue] = React.useState(defaultValue);

    function handleSave() {
        if(propertyValue === '') {
            setPropertyValue(0);
        }

        updateNodeProperty(nodeId, propertyName, propertyValue);
    }

    return (
        <div>
            <span>{propertyName}</span>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder={defaultValue}
                    inputProps={{ 'aria-label': defaultValue }}
                    onChange={event => setPropertyValue(event.target.value)}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleSave}>
                    <SaveIcon />
                </IconButton>
            </Paper>
        </div>
    );
}