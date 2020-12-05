import { Button } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router-dom';
import history from '../history';

function LinkElement({onClick, to, ...other}) {
    function go() {
        history.push(to);
    }

    return (
        <Button onClick={go} {...other}/>
    )
}

export default withRouter(LinkElement);