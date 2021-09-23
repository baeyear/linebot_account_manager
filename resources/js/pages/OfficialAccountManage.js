import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

const OfficialAccountManage = () => {
    const [officialAccount, setOfficialAccount] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getOfficialAccountData();
    }, [])

    const getOfficialAccountData = () => {
        axios
            .get('/api/official_account/' + id)
            .then(response => {
                setOfficialAccount(response.data);
                console.log(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">公式アカウント管理</div>

                        <Button color="primary" variant="contained" onClick={() => history.goBack()}>Go Back</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfficialAccountManage;
