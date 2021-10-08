import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import StatusSnackbar from "./StatusSnackbar";
import Loading from "../pages/Loading";

const useStyles = makeStyles((theme) =>
    createStyles({
        form: {
            margin: "8px",
        },
    })
);

function AddUserForm(props) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data) => {
        addUser(data);
        reset();
    };

    const classes = useStyles();
    const { users, setUsers } = props;
    const [type, setType] = useState();
    const [message, setMessage] = useState();
    const [open, setOpen] = useState();
    const [progress, setProgress] = useState();

    const addUser = async (data) => {
        setProgress(true);
        await axios
            .post("/api/official_accounts/add", {
                email: data.email,
            })
            .then((res) => {
                var newUsers = [...users, res.data];
                setUsers(newUsers);
                setType("success");
                setMessage("登録完了!");
                setOpen(true);
            })
            .catch((error) => {
                setType("error");
                setMessage(
                    "登録できませんでした。入力内容を確認してください。"
                );
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
                    label="email"
                    variant="outlined"
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                    {...register("email", {
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

export default AddUserForm;
