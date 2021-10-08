import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import moment from 'moment';

function MessageBox(props) {

    const { chat, lineUser } = props;
    const message = chat.chat;
    const day = moment(chat.created_at).format('YYYY/MM/DD');
    const time = moment(chat.created_at).format('HH:mm');

    if (chat.is_sent_by_admin == true) {
        return (
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1
            }}>
                <Box
                    sx={{
                        mr: 1,
                        alignSelf: 'flex-end',
                        fontSize: '0.7em'
                    }}
                >
                    <Box>
                        {day}
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'right'
                        }}
                    >
                        {time}
                    </Box>
                </Box>
                <Box
                    sx={{
                        maxWidth: '70%',
                        borderRadius: '5px',
                        bgcolor: '#30e852',
                        p: 1,
                        wordWrap: 'break-word'
                    }}
                >
                    {message}
                </Box>

            </Box >
        );
    }

    else {
        return (
            <Box sx={{
                width: '100%',
                display: 'flex',
                p: 1
            }}>
                <Avatar
                    src={lineUser.user_picture_url ? lineUser.user_picture_url : "/broken-image.jpg"}
                    sx={{
                        width: '10%',
                    }}
                />
                <Box
                    sx={{
                        maxWidth: '65%',
                        borderRadius: '5px',
                        bgcolor: '#edf1ee',
                        height: '100%',
                        ml: 1,
                        p: 1,
                        wordWrap: 'break-word'
                    }}
                >
                    {message}
                </Box>
                <Box
                    sx={{
                        ml: 1,
                        alignSelf: 'flex-end',
                        fontSize: '0.7em'
                    }}
                >
                    <Box>
                        {day}
                    </Box>
                    <Box>
                        {time}
                    </Box>
                </Box>

            </Box >
        );
    }
}


export default MessageBox;
