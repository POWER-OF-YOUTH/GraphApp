import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Typography, makeStyles } from '@material-ui/core';
import PropertyEditor from './PropertyEditor';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '100%'
        },
    }
}));

let counter = 2;

function AddMark({ opened, setOpen }) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [response, setResponse] = useState(null);
    const [properties, setProperties] = useState(
        [{
            propertyName: '',
            required: true,
            defaultValue: null
        }]
    );

    const handleClose = () => {
        setOpen(false);
    };

    function addProperty(event) {
        setProperties(properties.concat({
            propertyName: '',
            required: false,
            defaultValue: null
        }));
    }

    async function submit(event) {
        event.preventDefault();
        fetch(`http://localhost/api/user/login?login=a&password=z`)
            .then(response => response.json())
            .then(json => setResponse(json));
    }

    // TODO: To slow method
    function setField(index, name, value) {
        setProperties(properties.map((x, i) => {
            if (i == index)
                x[name] = value;
            return x;
        }));
    }

    return (
        <div>
            <Dialog
                open={opened}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Создание метки</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Создание метки которая будет использоваться для назначений свойств для узлов и связей
            </DialogContentText>
                    <div>
                        <p>{JSON.stringify(response)}</p>
                        <form className={classes.root} onSubmit={submit}>
                            <TextField id="in-name" label="Название" value={name} onChange={event => setName(event.target.value)} required />
                            {properties.map(function (property, index) {

                                return <PropertyEditor
                                    property={property}
                                    localId={index}
                                    key={index}
                                    setPropertyName={(i, v) => setField(i, 'propertyName', v)}
                                    setDefaultValue={(i, v) => setField(i, 'defaultValue', v)}
                                    setRequired={(i, v) => setField(i, 'required', v)}
                                />

                            })}
                            <Button variant="contained" color="primary" onClick={addProperty} >
                                Добавить свойство
                    </Button>
                            <Button type="submit" fullWidth variant="contained" color="primary" >
                                Создать
                    </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddMark;