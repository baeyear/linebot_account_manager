import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import StatusSnackbar from "./StatusSnackbar";
import SendFormDialog from "./SendFormDialog";

const AccountManageList = (props) => {
    const { users, setUsers, officialAccount } = props;
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

    const [openCheckDialog, setOpenCheckDialog] = useState(false);
    const [user, setUser] = useState({ name: "", id: "" });

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
                setSnackbar({
                    message: res.data.message,
                    type: "success",
                    open: true,
                });
                if (res.data.deletedOwn) {
                    window.location.href = "/home";
                } else {
                    setOpenCheckDialog(false);
                    setUsers(
                        users.filter(function (user) {
                            return user.id != userId;
                        })
                    );
                }
            })
            .catch((error) => {
                setSnackbar({
                    message: error.response.data.message,
                    type: "error",
                    open: true,
                });
                setOpenCheckDialog(false);
            });
    };

    const getUsers = () => {
        axios
            .get("/api/official_account/" + officialAccount.id + "/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch(() => {
                console.log("通信に失敗しました");
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
                                onClick={() => {
                                    setUser({ name: user.name, id: user.id });
                                    setOpenCheckDialog(true);
                                }}
                            >
                                <HighlightOffIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
            <StatusSnackbar status={snackbar} handleClose={handleClose} />
            <SendFormDialog
                open={openCheckDialog}
                title="権限削除"
                message={user.name + "の権限を削除しますか？"}
                onSubmitNo={() => setOpenCheckDialog(false)}
                onSubmitYes={() =>
                    deletePermission(user.id, officialAccount.id)
                }
            />
        </List>
    );
};

export default AccountManageList;
