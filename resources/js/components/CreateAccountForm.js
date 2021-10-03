import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => createStyles({
    textArea: {
        marginRight: theme.spacing(2),
    },
    form: {
        margin: '8px'
    }
}));


function CreateAccountForm(props) {

    const classes = useStyles();
    const { setOfficialAccounts, officialAccounts, setFormData, formData } = props;

    const createAccount = async (e) => {
        if (formData == '') {
            return false;
        }
        await axios
            .post('/api/official_accounts/create', {
                name: formData.name,
                channel_id: formData.channel_id,
                access_token: formData.access_token,
                channel_secret: formData.channel_secret,
            })
            .then((res) => {
                const tempAccounts = officialAccounts
                tempAccounts.push(res.data);
                setOfficialAccounts(tempAccounts)
                setFormData({ channel_id: '', access_token: '', channel_secret: '', name: '' });
                return false;
                // laravelでバリデーションして結果を返す
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }

    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
        // フォームが全て埋まっていればok
    }

    return (
        <form
            className={classes.form}
        >
            <TextField
                id="name"
                label="name"
                variant="outlined"
                className={classes.textArea}
                name="name"
                value={formData.name}
                onChange={inputChange}
            />
            <TextField
                id="channel_id"
                label="channelId"
                variant="outlined"
                className={classes.textArea}
                name="channel_id"
                value={formData.channel_id}
                onChange={inputChange}
            />
            <TextField
                id="access_token"
                label="AccessToken"
                variant="outlined"
                className={classes.textArea}
                name="access_token"
                value={formData.access_token}
                onChange={inputChange}
            />
            <TextField
                id="channel_secret"
                label="channelSecret"
                variant="outlined"
                className={classes.textArea}
                name="channel_secret"
                value={formData.channel_secret}
                onChange={inputChange}
            />
            <Button
                color="primary"
                variant="contained"
                onClick={createAccount}
            >
                登録
            </Button>
        </form>
    );
}

export default CreateAccountForm;
