import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { LocalDiningOutlined } from "@material-ui/icons";

const OfficialAccountList = (props) => {
    const [users, setUsers] = useState([]);
    const { officialAccountId } = props;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get("/api/official_account/" + officialAccountId + "/users")
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
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
                                type="submit"
                                onClick={() => console.log(user.id)}
                            >
                                <HighlightOffIcon color="secondary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default OfficialAccountList;
