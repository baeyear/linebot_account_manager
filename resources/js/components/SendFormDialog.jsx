import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";

const SendFormDialog = (props) => {
    const { open, title, message, onSubmitNo, onSubmitYes } = props;

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmitNo} color="primary">
                    No
                </Button>
                <Button onClick={onSubmitYes} color="primary">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SendFormDialog;
