import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Button, Container } from "@material-ui/core";
import AccountList from "../components/AccountList";
import CreateAccountForm from "../components/CreateAccountForm";
import Loading from "./Loading";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
    const [officialAccounts, setOfficialAccounts] = useState();
    const [loading, setLoading] = useState(true);
    let csrf_token = document.head.querySelector(
        'meta[name="csrf-token"]'
    ).content;

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
            <div className="card">
                <div className="card-header">公式アカウント管理</div>
                <div className="card-body">
                    <CreateAccountForm
                        officialAccounts={officialAccounts}
                        setOfficialAccounts={setOfficialAccounts}
                    />
                    <AccountList officialAccounts={officialAccounts} />
                </div>

                <form method="POST" action="/logout">
                    <input type="hidden" name="_token" value={csrf_token} />
                    <Button color="secondary" variant="outlined" type="submit">
                        Logout
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default Dashboard;
