import React, { useState } from 'react';
import { TextField, Typography, makeStyles, Radio, RadioGroup, Button, Checkbox, Paper } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    propRoot: {
        '& > *': {
            width: '100%',
        },
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        alignItems: 'center',
    },
    bottom: {
        
    }
}));

function PropertyEditor({ localId, property, setPropertyName, setRequired, setDefaultValue }) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <form className={classes.propRoot}>
                <TextField id="in-login" label="Название свойства" value={property.propertyName} onChange={event => setPropertyName(localId, event.target.value)} required />
                <FormControlLabel
                    control={<Checkbox checked={property.required} onChange={event => setRequired(localId, event.target.checked)} name="in-required" />}
                    label="Необходимо указать"
                />
                <TextField id="in-default" label="Значение по-умолчанию" type="text" value={property.defaultValue} onChange={event => setDefaultValue(localId, event.target.value)} required />
            </form>
        </Paper>
    );
}

export default PropertyEditor;