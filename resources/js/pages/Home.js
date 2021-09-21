import React, { useState, useEffect }　from 'react';
import axios from 'axios';
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
import PostForm from '../components/CreateAccountForm';

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['name', 'email', '編集', '完了'];

function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [official_accounts, setOfficialAccounts] = useState([]);
    const [formData, setFormData] = useState({webhook_url:'', channel_id:'', channel_access_token:'', channel_secret:''});

    useEffect(() => {
        getOfficialAccountsData();
    },[])

    const getOfficialAccountsData = () => {
        axios
        .get('/api/official_accounts')
        .then(response => {
            setOfficialAccounts(response.data);     //バックエンドから返ってきたデータでpostsを更新する
            console.log(response.data);　//取得データ確認用のconsole.log()
        })
        .catch(() => {
            console.log('通信に失敗しました');
        });
    }

    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    const createAccount = async() => {
        //空だと弾く
        if(formData == ''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/official_accounts/create', {
                webhook_url: formData.webhook_url,
                channel_id: formData.channel_id,
                channel_access_token: formData.channel_access_token,
                channel_secret: formData.channel_secret,
            })
            .then((res) => {
                //戻り値をtodosにセット
                const tempAccounts = official_accounts
                tempAccounts.push(res.data);
                setOfficialAccounts(tempAccounts)
                setFormData('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    let rows = [];

    official_accounts.map((official_account)=>{
        rows.push({
            name: official_account.channel_id,
            content: official_account.webhook_url,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <Card className={classes.card}>
                            <PostForm data={formData} inputChange={inputChange} btnFunc={createAccount}/>
                        </Card>
                        <Card className={classes.card}>
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
