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
        value: "admin",
    },
    {
        title: "使用者",
        value: "worker",
    },
];

function AddUserForm(props) {
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
                console.log(data.permission);
                console.log(data.email);
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

                <FormControl
                    error={errors?.hasOwnProperty("permission")}
                    fullWidth
                    required
                >
                    <FormLabel>権限設定</FormLabel>
                    <FormHelperText>
                        {errors?.radio && errors?.radio.message}
                    </FormHelperText>
                    <Controller
                        name="permission"
                        control={control}
                        rules={{ required: true }}
                        render={() => (
                            <RadioGroup>
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
