import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { IconButton, Container, Box } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AccountManageList from "../components/AccountManageList";
import Header from "../components/Header";
import AddUserForm from "../components/AddUserForm";

const OfficialAccountManage = () => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const officialAccount = history.location.state.officialAccount;

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get("/api/official_account/" + officialAccount.id + "/users")
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log("通信に失敗しました");
            });
    };

    return (
        <Container>
            <Header />
            <div className="card">
                <Box>アカウント名: {officialAccount.name}</Box>
                <Box>Webhook URL: {officialAccount.webhook_url}</Box>
                <AddUserForm users={users} />
                <AccountManageList users={users} />
            </div>
        </Container>
    );
};

export default OfficialAccountManage;
