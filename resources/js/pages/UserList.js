import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const UserList = () => {
    const [officialAccount, setOfficialAccount] = useState([]);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { id } = useParams();
    const classes = useStyles();

    useEffect(() => {
        getOfficialAccountData();
        getUserList();
    }, [])

    const getOfficialAccountData = () => {
        axios
            .get('/api/official_account/' + id)
            .then(response => {
                setOfficialAccount(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    const getUserList = () => {
        axios
            .get('/api/user_list/' + id)
            .then(response => {
                setUserList(response.data);
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
        <Container>
            <div className="card">
                <div className="card-header">
                    <IconButton onClick={() => history.goBack()} ><ArrowBackIosIcon /></IconButton>
                    {officialAccount.name} トーク
                </div>
                <List className={classes.root}>
                    {userList.map((item, index) => (
                        <div key={index}>
                            <ListItem button onClick={() => history.push({ pathname: '../chat', state: { lineUser: item, officialAccount: officialAccount } })} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={item.user_picture_url} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.displayname}
                                    secondary={
                                        <React.Fragment>
                                            {/* <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Ali Connors
                                </Typography> */}
                                            {item.current_chat}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                        </div>
                    ))}
                </List>
            </div>
        </Container>
    );
}

export default UserList;
