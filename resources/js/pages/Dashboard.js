import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import MainTable from '../components/MainTable';
import PostForm from '../components/CreateAccountForm';

const headerList = ['アカウント名', '権限', '編集', '完了'];

function Dashboard() {
    const [officialAccounts, setOfficialAccounts] = useState([]);
    const [formData, setFormData] = useState({webhook_url:'', channel_id:'', channel_access_token:'', channel_secret:''});

    useEffect(() => {
        getOfficialAccountsData();
    },[])

    const getOfficialAccountsData = () => {
        axios
        .get('/api/official_accounts')
        .then(response => {
            setOfficialAccounts(response.data);
            console.log(response.data);
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
    }

    let rows = [];

    officialAccounts.map((officialAccount)=>{
        rows.push({
            name: officialAccount.channel_id,
            content: officialAccount.webhook_url,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">公式アカウント管理</div>
                        <div className="card-body">
                            <PostForm
                                formData={formData}
                                setFormData={setFormData}
                                officialAccounts={officialAccounts}
                                setOfficialAccounts={setOfficialAccounts}
                            />
                            <MainTable headerList={headerList} rows={rows} />
                        </div>
                        <Button color="primary" variant="contained"　href={`/hometest`}>Exampleに遷移</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
