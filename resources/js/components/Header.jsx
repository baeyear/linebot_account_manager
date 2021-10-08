import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    IconButton,
    AppBar,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    displaynone: {
        display: "none",
    },
}));

const Header = (props) => {
    const { title, isHome } = props;
    const [anchorEl, setAnchorEl] = useState();
    const classes = useStyles();
    const history = useHistory();
    let csrf_token = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        document.forms.logout.submit();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    className={isHome ? classes.displaynone : ""}
                    edge="start"
                    color="inherit"
                    onClick={() => history.goBack()}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="subtitle1" className={classes.title}>
                    {title ? title : "LineBot Manager"}
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="menu"
                    onClick={handleClick}
                >
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
                <form method="POST" action="/logout" id="logout">
                    <input type="hidden" name="_token" value={csrf_token} />
                </form>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
