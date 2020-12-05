import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton, Avatar } from '@material-ui/core';
import { useAccount } from '../contexts/AccountContext';
import cogIcon from '../icons/cog.svg';
import exitIcon from '../icons/exit-run.svg';
import history from '../history';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    container: {
        padding: theme.spacing(1),
        minWidth: theme.spacing(60)
    }
}));

function ProfileSummary({ close }) {
    const classes = useStyles();
    const { account, setAccount } = useAccount();
    if (!account)
        return null;
    function exit() {
        close();
        setAccount(null);
        history.push('/');
    }

    return (
        <Grid className={classes.container} container spacing={2}>
            <Grid item>
                <Avatar src="/temp/avatar.jpg" className={classes.image} />
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="h5">
                            {account.name} {account.surname}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            @{account.login}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={event => history.push('/settings')} color="inherit">
                            <img src={cogIcon} />
                        </IconButton>

                        <IconButton onClick={exit} color="inherit">
                            <img src={exitIcon} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProfileSummary;