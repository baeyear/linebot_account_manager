import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import StatusSnackbar from "./StatusSnackbar";
import Loading from "../pages/Loading";

const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            marginRight: theme.spacing(2),
        },
        form: {
            margin: "8px",
        },
    })
);

function CreateAccountForm(props) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            access_token: "",
            channel_id: "",
            channel_secret: "",
        },
    });

    const onSubmit = (data) => {
        createAccount(data);
        reset();
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

    const classes = useStyles();
    const { setOfficialAccounts, officialAccounts } = props;
    const [progress, setProgress] = useState();

    const createAccount = async (data) => {
        setProgress(true);
        await axios
            .post("/api/official_accounts/create", {
                channel_id: data.channel_id,
                access_token: data.access_token,
                channel_secret: data.channel_secret,
            })
            .then((res) => {
                var newOfficialAccounts = [...officialAccounts, res.data];
                setOfficialAccounts(newOfficialAccounts);
                setSnackbar({
                    message: "登録完了しました。",
                    type: "success",
                    open: true,
                });
            })
            .catch((error) => {
                console.log(error.response);
                setSnackbar({
                    message: error.response.data.message,
                    type: "error",
                    open: true,
                });
            })
            .then(() => {
                setProgress(false);
            });
    };

    let form = <Loading></Loading>;
    if (!progress) {
        form = (
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    label="channelId"
                    variant="outlined"
                    name="channel_id"
                    error={Boolean(errors.channel_id)}
                    helperText={errors.channel_id && errors.channel_id.message}
                    {...register("channel_id", {
                        required: "入力してください",
                    })}
                />
                <TextField
                    fullWidth
                    label="AccessToken"
                    variant="outlined"
                    name="access_token"
                    error={Boolean(errors.access_token)}
                    helperText={
                        errors.access_token && errors.access_token.message
                    }
                    {...register("access_token", {
                        required: "入力してください",
                    })}
                />
                <TextField
                    fullWidth
                    label="channelSecret"
                    variant="outlined"
                    name="channel_secret"
                    error={Boolean(errors.channel_secret)}
                    helperText={
                        errors.channel_secret && errors.channel_secret.message
                    }
                    {...register("channel_secret", {
                        required: "入力してください",
                    })}
                />
                <Button color="primary" variant="contained" type="submit">
                    登録
                </Button>
                <StatusSnackbar status={snackbar} handleClose={handleClose} />
            </form>
        );
    }
    return form;
}

export default CreateAccountForm;
