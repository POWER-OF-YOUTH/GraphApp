import { Paper, Container, TextField, makeStyles, Typography, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { useAccount } from '../contexts/AccountContext';
import history from '../history';
import config from '../config.json';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(8),
        alignItems: 'center',
    },
    bottom: {
        marginBottom: theme.spacing(4)
    }
}));

const errorDetail = {
    1: "Возможно вы ошиблись логином",
    2: "Неверный пароль"
}

function LoginPage() {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { setAccount } = useAccount();
    const [response, setResponse] = useState();

    async function submit(event) {
        event.preventDefault();
        fetch(`http://${config.host}/api/user/login?login=${login}&password=${password}`)
            .then(response => response.json())
            .then(json => setResponse(json));
    }

    if (response && response.code == 0 && response.data.token) {
        setAccount({
            login: 'temp',
            token: response.data.token
        })
        history.push('/editor');
    }

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                {response && <MuiAlert className={classes.bottom} severity="error" elevation={6} variant="filled">Произошла ошибка: {errorDetail[response.code]}</MuiAlert>}
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <form className={classes.root} onSubmit={submit}>
                    <TextField id="in-login" label="Логин" value={login} onChange={event => setLogin(event.target.value)} error={login && login.length < 3} required />
                    <TextField id="in-password" label="Пароль" type="password" value={password} onChange={event => setPassword(event.target.value)} error={password && password.length < 6} required />
                    <Button type="submit" fullWidth variant="contained" color="primary" >
                        Войти
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default LoginPage;