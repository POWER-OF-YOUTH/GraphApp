import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, makeStyles } from '@material-ui/core';
import PropertyEditor from './PropertyEditor';
import { useAccount } from '../contexts/AccountContext';
import MuiAlert from '@material-ui/lab/Alert';
import config from '../config.json';

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
    const { account } = useAccount();
    const [name, setName] = useState('');
    const [response, setResponse] = useState(null);
    const [properties, setProperties] = useState(
        [{
            propertyName: '',
            require: true,
            default: null
        }]
    );

    const handleClose = () => {
        setOpen(false);
    };

    function addProperty(event) {
        setProperties(properties.concat({
            propertyName: '',
            require: false,
            default: null
        }));
    }

    function deleteProperty(localId) {
        setProperties(properties.filter((x, i) => i != localId));
    }

    async function submit(event) {
        event.preventDefault();
        const jsonchik = {
            type: name,
            properties: properties
        };
        fetch(`http://${config.host}/api/graph/createMark?token=${account.token}&data=${JSON.stringify(jsonchik)}`)
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
                        {response && response.code == 0 && <MuiAlert severity="success" elevation={6} variant="filled">Успешно добавлено</MuiAlert>}
                        {response && response.code != 0 && <MuiAlert severity="error" elevation={6} variant="filled">Произошла ошибка: {response.message}</MuiAlert>}
                        <form className={classes.root} onSubmit={submit}>
                            <TextField id="in-name" label="Название" value={name} onChange={event => setName(event.target.value)} required />
                            {properties.map(function (property, index) {
                                return <PropertyEditor
                                    property={property}
                                    localId={index}
                                    key={index}
                                    setPropertyName={(i, v) => setField(i, 'propertyName', v)}
                                    setDefaultValue={(i, v) => setField(i, 'default', v)}
                                    setRequired={(i, v) => setField(i, 'require', true)}
                                    deleteProperty={deleteProperty}
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