import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => createStyles({
    textArea: {
        marginRight: theme.spacing(2),
    },

}));

function SendChatForm(props) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const classes = useStyles(props);
    const { chats, setChats, lineUser, officialAccount } = props;

    const onSubmit = (data) => {
        sendChat(data);
    };

    const sendChat = async (data) => {
        await axios
            .post('/api/chat', {
                chat: data.chat,
                line_id: lineUser.line_id,
                webhook_url: officialAccount.webhook_url
            })
            .then((res) => {
                var newChats = [...chats, res.data];
                setChats(newChats);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    w: '100%',
                    p: 1
                }}
            >
                <TextField
                    name="chat"
                    fullWidth
                    multiline
                    variant="outlined"
                    error={Boolean(errors.chat)}
                    helperText={errors.chat && errors.chat.message}
                    {...register('chat', { required: '入力してください' })}
                />
                <IconButton
                    color="primary"
                    type="submit"
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </form >
    );
}

export default SendChatForm;
