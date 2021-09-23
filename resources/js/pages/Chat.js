import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import MainTable from '../components/MainTable';
import PostForm from '../components/CreateAccountForm';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const Chat = () => {
    const history = useHistory();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <div className="container">
                <div className="row justify-content-center">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <p>{history.location.state.lineUser.displayname}</p>
            <p>{history.location.state.officialAccount.name}</p>

            {chats.map((item, index) => (
                <div key={index}>
                    {item.chat}
                </div>
            ))}

            <Button color="primary" variant="contained" onClick={() => history.goBack()}>Go Back</Button>
        </div>
    );
}

export default Chat;
