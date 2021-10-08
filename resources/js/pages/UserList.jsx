import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { IconButton, Container, Box, Chip, Badge, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Avatar from '@material-ui/core/Avatar';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    inline: {
        display: 'inline',
    },
    replied: {
        display: 'none'
    },
    notReplied: {
        marginLeft: 'auto'
    },
    userBox: {
        display: 'flex',
        alignItems: 'center',
        magrin: '4px',
        "&:hover": {
            backgroundColor: "#e0e9f2"
        },
        "&:active": {
            background: "#e0e9f2"
        }
    }
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
        <Container className={classes.container}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <IconButton onClick={() => history.goBack()} ><ArrowBackIosIcon /></IconButton>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    {officialAccount.name} トーク
                </Box>
            </Box>

            {userList.map((item, index) => (
                <Box
                    className={classes.userBox}
                    key={index}
                    onClick={() =>
                        history.push({
                            pathname: '../chat',
                            state: { lineUser: item, officialAccount: officialAccount }
                        })}>
                    <Box p={1}>
                        <Badge
                            invisible={Boolean(item.is_read_by_admin)}
                            color="secondary"
                            variant="dot">
                            <Avatar alt={item.displayname} src={item.user_picture_url} />
                        </Badge>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                            <Box>
                                {item.displayname}
                            </Box>
                            <Box ml={1}>
                                {item.updated_at}
                            </Box>
                            <Chip
                                className={item.is_replied_by_admin == true ? classes.replied : classes.notReplied}
                                label="要返信"
                                color="secondary"
                                variant="outlined"
                                size="small" />
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>
                            {item.current_chat}
                        </Box>
                    </Box>
                </Box>
            ))
            }
        </Container >

    );
}

export default UserList;
