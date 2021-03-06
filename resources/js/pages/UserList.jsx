import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import {
    IconButton,
    Container,
    Box,
    Chip,
    Badge,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Avatar from "@material-ui/core/Avatar";
import Loading from "./Loading";
import Header from "../components/Header";
import ReturnDialog from "../components/ReturnDialog";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    inline: {
        display: "inline",
    },
    replied: {
        display: "none",
    },
    notReplied: {
        marginLeft: "auto",
    },
    userBox: {
        display: "flex",
        alignItems: "center",
        magrin: "4px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#e0e9f2",
        },
        "&:active": {
            background: "#e0e9f2",
        },
    },
}));

const UserList = (props) => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [officialAccount, setOfficialAccount] = useState(false);
    const history = useHistory();

    const classes = useStyles();

    useEffect(() => {
        if (history.location.state) {
            setOfficialAccount(history.location.state.officialAccount);
            getUserList(history.location.state.officialAccount);
        } else {
            setOpenDialog(true);
            setLoading(false);
        }
    }, []);

    const getUserList = (officialAccount) => {
        axios
            .get("/api/user_list/" + officialAccount.id)
            .then((response) => {
                setUserList(response.data);
                setLoading(false);
            })
            .catch(() => {});
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Container className={classes.container}>
            <ReturnDialog openDialog={openDialog} />
            <Header title={officialAccount.name + " ?????????"} />

            {userList.map((item, index) => (
                <Box
                    className={classes.userBox}
                    key={index}
                    onClick={() =>
                        history.push({
                            pathname: "../chat",
                            state: {
                                lineUser: item,
                                officialAccount: officialAccount,
                            },
                        })
                    }
                >
                    <Box p={1}>
                        <Badge
                            invisible={Boolean(item.is_read_by_admin)}
                            color="secondary"
                            variant="dot"
                        >
                            <Avatar
                                alt={item.displayname}
                                src={item.user_picture_url}
                            />
                        </Badge>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Box>{item.displayname}</Box>
                            <Box ml={1}>{item.updated_at}</Box>
                            <Chip
                                className={
                                    item.is_replied_by_admin == true
                                        ? classes.replied
                                        : classes.notReplied
                                }
                                label="?????????"
                                color="secondary"
                                variant="outlined"
                                size="small"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {item.current_chat}
                        </Box>
                    </Box>
                </Box>
            ))}
        </Container>
    );
};

export default UserList;
