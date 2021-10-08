import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { IconButton, Container, Box } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import OfficialAccountList from "../components/OfficialAccountList";

const OfficialAccountManage = () => {
    const [officialAccount, setOfficialAccount] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getOfficialAccountData();
    }, []);

    const getOfficialAccountData = () => {
        axios
            .get("/api/official_account/" + id)
            .then((response) => {
                setOfficialAccount(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log("通信に失敗しました");
            });
    };

    return (
        <Container>
            <div className="card">
                <div className="card-header">
                    <IconButton onClick={() => history.goBack()}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    公式アカウント管理
                </div>
                <Box>アカウント名: {officialAccount.name}</Box>
                <Box>Webhook URL: {officialAccount.webhook_url}</Box>
                <OfficialAccountList officialAccountId={id} />
            </div>
        </Container>
    );
};

export default OfficialAccountManage;
