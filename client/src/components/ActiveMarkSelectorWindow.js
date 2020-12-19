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
import { useAppEditor } from '../contexts/EditorContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '100%'
        },
    }
}));

let counter = 2;

function ActiveMarkSelectorWindow({opened, setOpen}) {
    const classes = useStyles();
    const { account } = useAccount();
    const { marks, activeMarks } = useAppEditor();

    const handleClose = () => {
        setOpen(false);
    };

    function select(key, value) {
        if (value)
            activeMarks.add(key);
        else
            activeMarks.delete(key);
    }

    if (opened) {
        activeMarks.clear();
    }

    function ok(event) {
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={opened}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Метки</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы должны выбрать метки для создаваемого узла
                    </DialogContentText>
                    <div>
                        <form className={classes.root}>
                            {[...marks.container.keys()].map(k => {
                                const key = k;
                                return <FormControlLabel
                                    control={
                                      <Checkbox
                                        onChange={event => select(key, event.target.checked)}
                                        color="primary"
                                      />
                                    }
                                    label={k}
                                />
                            })}
                            <Button onClick={ok}>Ок</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ActiveMarkSelectorWindow;