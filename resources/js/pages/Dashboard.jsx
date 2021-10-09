import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import {
    Button,
    Container,
    IconButton,
    AppBar,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AccountIndexList from "../components/AccountIndexList";
import CreateAccountForm from "../components/CreateAccountForm";
import Loading from "./Loading";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Dashboard = () => {
    const [officialAccounts, setOfficialAccounts] = useState();
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        getOfficialAccountsData();
    }, []);

    const getOfficialAccountsData = () => {
        axios
            .get("/api/official_accounts")
            .then((response) => {
                var newOfficialAccounts = [...response.data];
                console.log(response.data);
                setOfficialAccounts(newOfficialAccounts);
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
        <Container>
            <Header isHome={true} />
            <div className="card">
                <div className="card-body">
                    <CreateAccountForm
                        officialAccounts={officialAccounts}
                        setOfficialAccounts={setOfficialAccounts}
                    />
                    <AccountIndexList officialAccounts={officialAccounts} />
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;
