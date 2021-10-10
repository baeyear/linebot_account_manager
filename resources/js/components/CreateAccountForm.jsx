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

    const classes = useStyles();
    const { setOfficialAccounts, officialAccounts } = props;
    const [type, setType] = useState();
    const [message, setMessage] = useState();
    const [open, setOpen] = useState();
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
                setType("success");
                setMessage("登録完了!");
                setOpen(true);
            })
            .catch((error) => {
                setType("error");
                console.log(error.response);
                setMessage(error.response.data.message);
                setOpen(true);
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
                <StatusSnackbar
                    message={message}
                    open={open}
                    setOpen={setOpen}
                    type={type}
                />
            </form>
        );
    }
    return form;
}

export default CreateAccountForm;
