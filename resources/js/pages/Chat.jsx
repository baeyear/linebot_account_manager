import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { IconButton, Box, Container, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import SendChatForm from "../components/SendChatForm";
import Loading from "./Loading";
import Header from "../components/Header";

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
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const ref = React.useRef();

    useEffect(() => {
        getChats();
    }, []);

    useLayoutEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollIntoView();
        }
    });

    const getChats = () => {
        axios
            .get("/api/chat/" + history.location.state.lineUser.id)
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
            <Header
                title={
                    history.location.state.lineUser.displayname +
                    " / " +
                    history.location.state.officialAccount.name
                }
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
                    <MessageBox
                        key={index}
                        chat={item}
                        lineUser={history.location.state.lineUser}
                    />
                ))}
                <div ref={ref}></div>
            </Box>

            <SendChatForm
                chats={chats}
                setChats={setChats}
                lineUser={history.location.state.lineUser}
                officialAccount={history.location.state.officialAccount}
            />
        </Container>
    );
};

export default Chat;
