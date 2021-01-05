import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, makeStyles } from '@material-ui/core';
import MarkProperty from './MarkProperty';
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ActiveMarkSelectionDialog({opened, setOpen}) {
    const [selectedMarks, setSelectMarks] = React.useState(new Set());
    const [errorOpen, setErrorOpen] = React.useState(false);

    const classes = useStyles();
    const { account } = useAccount();
    const { marks, activeMarks, setActiveMarks } = useAppEditor();

    const handleClose = () => {
        setErrorOpen(false);
        setOpen(false);
    };

    function select(key, value) {
        if (value) {
            setErrorOpen(false);
            selectedMarks.add(key);
        }
        else
            selectedMarks.delete(key);
    }

    function ok(event) {
        if(selectedMarks.size > 0) {
            setActiveMarks(selectedMarks);
            setSelectMarks(new Set());
            handleClose();
        }
        else
            setErrorOpen(true);
    }

    return (
        <div>
            <Snackbar open={errorOpen} autoHideDuration={3000}>
                <Alert severity="error">
                    Выберите хотя бы одну метку!
                </Alert>
            </Snackbar>
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
                            <Button onClick={ok}>Ok</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ActiveMarkSelectionDialog;