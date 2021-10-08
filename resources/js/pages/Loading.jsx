import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    }
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <Container
            className={classes.container}
        >
            <CircularProgress />
        </Container>
    );

}

export default Loading;
