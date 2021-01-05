import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { useAppEditor } from '../contexts/EditorContext';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function RelationMenu({opened, setOpen}) {
    const [textFieldValue, setTextFieldValue] = React.useState('');
    const { setCreatedRelationName } = useAppEditor();

    const [errorOpen, setErrorOpen] = React.useState(false);

    function handleTextFieldChange(event) {
        setTextFieldValue(event.target.value.replaceAll(' ', '_'));
        setErrorOpen(false);
    }

    function handleClose() {
        setOpen(false);
        setErrorOpen(false);
        setTextFieldValue('');
        setCreatedRelationName('');
    }

    function handleOk() {
        if(textFieldValue !== '') {
            setCreatedRelationName(textFieldValue);
            setErrorOpen(false);
            setTextFieldValue('');
            setOpen(false);
        }
        else
            setErrorOpen(true);  
    }

    return (
        <div>
            <Snackbar open={errorOpen} autoHideDuration={3000}>
                <Alert severity="error">
                    Введите название!
                </Alert>
            </Snackbar>
            <Dialog open={opened} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Создание связей</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Название"
                    type="text"
                    fullWidth
                    onChange={handleTextFieldChange}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ок
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RelationMenu;