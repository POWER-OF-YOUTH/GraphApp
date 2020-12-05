import { Paper, Container, TextField, makeStyles, Typography, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegisterPage() {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState();

    const errorObj = {
        login: login && login.length < 3,
        email: email && !validateEmail(email),
        password: password && password.length < 6
    }

    function submit(event) {
        event.preventDefault();
        if (errorObj.email || errorObj.login || errorObj.password)
            return;
        fetch(`http://localhost/api/user/register?login=${login}&mail=${email}&name=${name}&surname=${surname}&password=${password}`)
            .then(response => response.json())
            .then(json => setResponse(json))
            .catch(err => console.log(err));
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                {response && response.code != 0 && <Alert className={classes.bottom} severity="error">Произошла ошибка!</Alert>}
                {response && response.code == 0 && <Alert className={classes.bottom} severity="success">Успешная регистрация!</Alert>}
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <form className={classes.root} onSubmit={submit}>
                    <TextField id="in-login" label="Логин" value={login} onChange={event => setLogin(event.target.value)} error={errorObj.login} required />
                    <TextField id="in-name" label="Имя" value={name} onChange={event => setName(event.target.value)} required />
                    <TextField id="in-surname" label="Фамилия" value={surname} onChange={event => setSurname(event.target.value)} required />
                    <TextField id="in-email" label="Почта" value={email} onChange={event => setEmail(event.target.value)} error={errorObj.email} required />
                    <TextField id="in-password" label="Пароль" type="password" value={password} onChange={event => setPassword(event.target.value)} error={errorObj.password} required />
                    <Button type="submit" fullWidth variant="contained" color="primary" >
                        Регистрация
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default RegisterPage;