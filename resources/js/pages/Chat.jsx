import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { IconButton, Box, Container, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import SendChatForm from "../components/SendChatForm";
import Loading from "./Loading";
import Header from "../components/Header";
import ReturnDialog from "../components/ReturnDialog";

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
}));

const Chat = () => {
    const history = useHistory();
    const [chats, setChats] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lineUser, setLineUser] = useState("");
    const [officialAccount, setOfficialAccount] = useState("");
    const classes = useStyles();
    const ref = React.useRef();

    useEffect(() => {
        if (history.location.state) {
            setOfficialAccount(history.location.state.officialAccount);
            setLineUser(history.location.state.lineUser);
            getChats(history.location.state.lineUser);
        } else {
            setOpenDialog(true);
            setLoading(false);
        }
    }, []);

    useLayoutEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollIntoView();
        }
    });

    const getChats = (lineUser) => {
        axios
            .get("/api/chat/" + lineUser.id)
            .then((response) => {
                setChats(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("通信に失敗しました");
            });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Container className={classes.container}>
            <ReturnDialog openDialog={openDialog} />
            <Header
                title={lineUser.displayname + " / " + officialAccount.name}
            />
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: "scroll",
                    bgcolor: "#7da4cd",
                    overflow: "auto",
                }}
            >
                {chats.map((item, index) => (
                    <MessageBox key={index} chat={item} lineUser={lineUser} />
                ))}
                <div ref={ref}></div>
            </Box>

            <SendChatForm
                chats={chats}
                setChats={setChats}
                lineUser={lineUser}
                officialAccount={officialAccount}
            />
        </Container>
    );
};

export default Chat;
