import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            <div className="container">
                <div className="row justify-content-center">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">{officialAccount.name} トーク</div>
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
                        <Button color="primary" variant="contained" onClick={() => history.goBack()}>Go Back</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserList;
