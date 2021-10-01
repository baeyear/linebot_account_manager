import React from 'react';
import { Avatar, Box } from '@material-ui/core';

function MessageBox(props) {

    const { chat } = props;

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
                        maxWidth: '70%',
                        borderRadius: '5px',
                        bgcolor: '#30e852',
                        p: 1
                    }}
                >
                    {chat.chat}
                </Box>

            </Box >
        );
    }

    else {
        return (
            <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                p: 1
            }}>
                <Avatar
                    src="/broken-image.jpg"
                    sx={{
                        width: '10%',
                    }}
                />
                <Box
                    sx={{
                        maxWidth: '70%',
                        borderRadius: '5px',
                        bgcolor: '#edf1ee',
                        height: '100%',
                        ml: 1,
                        p: 1
                    }}
                >
                    {chat.chat}
                </Box>

            </Box >
        );
    }
}


export default MessageBox;
