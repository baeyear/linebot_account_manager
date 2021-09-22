import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => createStyles({
    textArea: {
        marginRight: theme.spacing(2),
    },
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
                webhook_url: formData.webhook_url,
                channel_id: formData.channel_id,
                channel_access_token: formData.channel_access_token,
                channel_secret: formData.channel_secret,
            })
            .then((res) => {
                const tempAccounts = officialAccounts
                tempAccounts.push(res.data);
                setOfficialAccounts(tempAccounts)
                setFormData({ webhook_url: '', channel_id: '', channel_access_token: '', channel_secret: '', name: '' });
                return false;
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
    }

    return (
        <form>
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
                id="webhook_url"
                label="webhookUrl"
                variant="outlined"
                className={classes.textArea}
                name="webhook_url"
                value={formData.webhook_url}
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
                id="channel_access_token"
                label="channelAccessToken"
                variant="outlined"
                className={classes.textArea}
                name="channel_access_token"
                value={formData.channel_access_token}
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
