import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button, Container } from '@material-ui/core';
import MainTable from '../components/MainTable';
import CreateAccountForm from '../components/CreateAccountForm';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from './Loading'

const headerList = ['アカウント名', '権限', 'チャット', '管理'];

const Dashboard = () => {
    const [officialAccounts, setOfficialAccounts] = useState([]);
    const [formData, setFormData] = useState({ channel_id: '', access_token: '', channel_secret: '', name: '' });
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOfficialAccountsData();
    }, [])

    const getOfficialAccountsData = () => {
        axios
            .get('/api/official_accounts')
            .then(response => {
                setOfficialAccounts(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    let rows = [];

    officialAccounts.map((officialAccount) => {
        rows.push({
            name: officialAccount.name,
            permissionName: officialAccount.permission_name,
            chatBtn: <Button color="primary" variant="outlined" onClick={() => history.push('user_list/' + officialAccount.id)}>チャット</Button>,
            editBtn: <Button color="primary" variant="contained" onClick={() => history.push('official_account_manage/' + officialAccount.id)}>管理</Button>
        })
    });

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container>
            <div className="card">
                <div className="card-header">公式アカウント管理</div>
                <div className="card-body">
                    <CreateAccountForm
                        formData={formData}
                        setFormData={setFormData}
                        officialAccounts={officialAccounts}
                        setOfficialAccounts={setOfficialAccounts}
                    />
                    <MainTable headerList={headerList} rows={rows} />
                </div>
                <Button color="secondary" variant="outlined">Logout</Button>
            </div>
        </Container>
    );
}

export default Dashboard;
