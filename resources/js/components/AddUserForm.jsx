import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useForm, Controller } from "react-hook-form";
import StatusSnackbar from "./StatusSnackbar";
import Loading from "../pages/Loading";

const useStyles = makeStyles((theme) =>
    createStyles({
        form: {
            margin: "8px",
        },
    })
);

const options = [
    {
        title: "管理者",
        value: "1",
    },
    {
        title: "使用者",
        value: "2",
    },
];

function AddUserForm(props) {
    const { users, setUsers, officialAccount } = props;
    const classes = useStyles();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        control,
    } = useForm({
        defaultValues: {
            email: "",
            permission: "",
        },
    });
    const onSubmit = (data) => {
        addUser(data);
        reset();
    };

    const [progress, setProgress] = useState();
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

    const addUser = async (data) => {
        setProgress(true);
        await axios
            .post("/api/official_account/user/create", {
                email: data.email,
                permission: data.permission,
                official_account_id: officialAccount.id,
            })
            .then((res) => {
                getUsers();
                setSnackbar({
                    message: res.data.message,
                    type: "success",
                    open: true,
                });
            })
            .catch((error) => {
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

    const getUsers = () => {
        axios
            .get("/api/official_account/" + officialAccount.id + "/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch(() => {
                console.log("通信に失敗しました");
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

                <FormControl
                    error={errors?.hasOwnProperty("permission")}
                    fullWidth
                >
                    <FormLabel>権限設定</FormLabel>
                    <FormHelperText>
                        {errors?.radio && errors?.radio.message}
                    </FormHelperText>
                    <Controller
                        name="permission"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup value={value} onChange={onChange}>
                                {options.map((option, i) => (
                                    <FormControlLabel
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.title}
                                        key={i}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                </FormControl>

                <Button color="primary" variant="contained" type="submit">
                    登録
                </Button>
                <StatusSnackbar status={snackbar} handleClose={handleClose} />
            </form>
        );
    }
    return form;
}

export default AddUserForm;
