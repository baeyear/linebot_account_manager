import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import StatusSnackbar from "./StatusSnackbar";

const AccountManageList = (props) => {
    const { users, officialAccount } = props;
    const [snackbar, setSnackbar] = useState({
        message: "",
        type: "",
        open: false,
    });
    const handleClose = (event, reason) => {
        if (reason == "clickaway") {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [open, setOpen] = useState(false);

    const deletePermission = (userId, officialAccountId) => {
        axios
            .delete("api/official_account/user", {
                data: {
                    user_id: userId,
                    official_account_id: officialAccountId,
                },
            })
            .then((res) => {
                console.log(userId);
                setMessage(res.data.message);
                setType("success");
                setOpen(true);
                if (res.data.deletedOwn) {
                    window.location.href = "/home";
                }
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.response.data.message);
                setType("error");
                setOpen(true);
            });
    };

    return (
        <List>
            {users.map((user, index) => {
                return (
                    <ListItem key={index}>
                        <ListItemText
                            primary={user.name}
                            secondary={user.permission_name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() =>
                                    deletePermission(
                                        user.id,
                                        officialAccount.id
                                    )
                                }
                            >
                                <HighlightOffIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
            <StatusSnackbar
                open={open}
                type={type}
                message={message}
                setOpen={setOpen}
            />
        </List>
    );
};

export default AccountManageList;
