import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { IconButton, Box, Container, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MessageBox from '../components/MessageBox';
import SendChatForm from '../components/SendChatForm';
import Loading from './Loading'


const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    }
}));


const Chat = () => {
    const history = useHistory();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        getChats();
    }, [])

    const getChats = () => {
        axios
            .get('/api/chat/' + history.location.state.lineUser.id)
            .then(response => {
                setChats(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container
            className={classes.container}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <IconButton onClick={() => history.goBack()} ><ArrowBackIosIcon /></IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <Box fontWeight="fontWeightRegular">{history.location.state.lineUser.displayname}</Box>
                    <Box fontWeight="fontWeightLight">{history.location.state.officialAccount.name}で会話中</Box>
                </Box>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'scroll',
                    bgcolor: '#7da4cd',
                    overflow: 'auto'
                }}
            >
                {chats.map((item, index) => (
                    <MessageBox
                        key={index}
                        chat={item}
                        lineUser={history.location.state.lineUser}
                    />
                ))}
            </Box>

            <SendChatForm
                chats={chats}
                setChats={setChats}
                lineUser={history.location.state.lineUser}
                officialAccount={history.location.state.officialAccount}
            />
        </Container>
    );
}

export default Chat;
