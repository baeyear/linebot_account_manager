import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import StatusSnackbar from "./StatusSnackbar";
import Loading from "../pages/Loading";

function TestConnectionForm(props) {
    const { setOfficialAccount, officialAccount } = props;
    const {
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = () => {
        checkAccount();
    };

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

    const checkAccount = async () => {
        await axios
            .post("/api/official_account/check", {
                id: officialAccount.id,
            })
            .then((res) => {
                setSnackbar({
                    message: res.data.message,
                    type: "success",
                    open: true,
                });
                setOfficialAccount(res.data.officialAccount);
            })
            .catch((error) => {
                setSnackbar({
                    message: error.response.data.message,
                    type: "error",
                    open: true,
                });
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Button color="primary" variant="contained" type="submit">
                接続テスト
            </Button>
            <StatusSnackbar status={snackbar} handleClose={handleClose} />
        </form>
    );
}

export default TestConnectionForm;
