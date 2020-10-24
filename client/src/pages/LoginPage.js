import { Paper, Container, TextField, makeStyles, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useAccount } from '../contexts/AccountContext';

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
    }
}));

function LoginPage() {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { account, setAccount } = useAccount();

    async function submit(event) {
        event.preventDefault();
        const response = await (await fetch(`http://localhost/api/user/login?login=${login}&password=${password}`)).json();
        setAccount({
            login: 'test',
            token: response.data.token
        });
    }

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
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