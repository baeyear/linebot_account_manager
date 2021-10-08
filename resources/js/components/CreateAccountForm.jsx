import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => createStyles({
    textArea: {
        marginRight: theme.spacing(2),
    },
    form: {
        margin: '8px'
    }
}));


function CreateAccountForm(props) {
    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            access_token: '',
            channel_id: '',
            channel_secret: ''
        }
    });

    const onSubmit = (data) => {
        createAccount(data);
        reset();
    };

    const classes = useStyles();
    const { setOfficialAccounts, officialAccounts } = props;

    const createAccount = async (data) => {
        await axios
            .post('/api/official_accounts/create', {
                channel_id: data.channel_id,
                access_token: data.access_token,
                channel_secret: data.channel_secret,
            })
            .then((res) => {
                var newOfficialAccounts = [...officialAccounts, res.data];
                setOfficialAccounts(newOfficialAccounts);
                // laravelでバリデーションして結果を返す
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                fullWidth
                label="channelId"
                variant="outlined"
                name="channel_id"
                error={Boolean(errors.channel_id)}
                helperText={errors.channel_id && errors.channel_id.message}
                {...register('channel_id', { required: '入力してください' })}
            />
            <TextField
                fullWidth
                label="AccessToken"
                variant="outlined"
                name="access_token"
                error={Boolean(errors.access_token)}
                helperText={errors.access_token && errors.access_token.message}
                {...register('access_token', { required: '入力してください' })}
            />
            <TextField
                fullWidth
                label="channelSecret"
                variant="outlined"
                name="channel_secret"
                error={Boolean(errors.channel_secret)}
                helperText={errors.channel_secret && errors.channel_secret.message}
                {...register('channel_secret', { required: '入力してください' })}
            />
            <Button
                color="primary"
                variant="contained"
                type="submit"
            >
                登録
            </Button>
        </form>
    );
}

export default CreateAccountForm;
