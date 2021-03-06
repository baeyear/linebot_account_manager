import React, { useState, useEffect } from "react";
import { TextField, IconButton, Box } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            marginRight: theme.spacing(2),
        },
    })
);

function SendChatForm(props) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch,
    } = useForm({
        defaultValues: {
            chat: "",
        },
    });
    const watchChat = watch("chat");
    const classes = useStyles(props);
    const { chats, setChats, lineUser, officialAccount } = props;

    const onSubmit = (data) => {
        sendChat(data);
        reset();
    };

    const sendChat = async (data) => {
        await axios
            .post("/api/chat", {
                chat: data.chat,
                line_id: lineUser.line_id,
                official_account_id: officialAccount.id,
            })
            .then((res) => {
                var newChats = [...chats, res.data];
                setChats(newChats);
            })
            .catch((error) => {});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    w: "100%",
                    p: 1,
                }}
            >
                <TextField
                    name="chat"
                    fullWidth
                    multiline
                    variant="outlined"
                    error={Boolean(errors.chat)}
                    helperText={errors.chat && errors.chat.message}
                    {...register("chat", { required: "入力してください" })}
                />
                <IconButton disabled={!watchChat} color="primary" type="submit">
                    <SendIcon />
                </IconButton>
            </Box>
        </form>
    );
}

export default SendChatForm;
