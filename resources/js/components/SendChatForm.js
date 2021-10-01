import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => createStyles({
    textArea: {
        marginRight: theme.spacing(2),
    },
}));

function SendChatForm(props) {

    const classes = useStyles();
    const [formData, setFormData] = useState({ chat: '' });
    const { chats, setChats, lineUser, officialAccount } = props;

    const sendChat = async (e) => {
        if (formData == '') {
            return false;
        }
        await axios
            .post('/api/chat', {
                chat: formData.chat,
                line_id: lineUser.line_id,
                webhook_url: officialAccount.webhook_url
            })
            .then((res) => {
                var newChats = [...chats, res.data];
                setChats(newChats);
                setFormData({ chat: '' });
            })
            .catch(error => {
                console.log(error);
            });
    }

    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    return (
        <form>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    w: '100%'
                }}
            >
                <TextField
                    fullWidth
                    multiline
                    id="chat"
                    label="chat"
                    variant="outlined"
                    className={classes.textArea}
                    name="chat"
                    value={formData.chat}
                    onChange={inputChange}
                />
                <IconButton
                    color="primary"
                    onClick={sendChat}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </form >
    );
}

export default SendChatForm;
