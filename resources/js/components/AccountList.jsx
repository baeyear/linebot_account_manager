import React from "react";
import ReactDOM from "react-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import Paper from "@material-ui/core/Paper";
import green from "@material-ui/core/colors/green";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => createStyles({}));

function AccountList(props) {
    const classes = useStyles();
    const { officialAccounts } = props;
    const history = useHistory();

    return (
        <List>
            {officialAccounts.map((officialAccount, index) => {
                return (
                    <ListItem
                        button
                        key={index}
                        onClick={() =>
                            history.push({
                                pathname: "user_list",
                                state: {
                                    officialAccount: officialAccount,
                                },
                            })
                        }
                    >
                        <ListItemText
                            primary={officialAccount.name}
                            secondary={officialAccount.permission_name}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                disabled={!officialAccount.pivot.permission_id}
                                type="submit"
                                onClick={() =>
                                    history.push({
                                        pathname: "official_account_manage",
                                        state: {
                                            officialAccount: officialAccount,
                                        },
                                    })
                                }
                            >
                                <SettingsIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default AccountList;
