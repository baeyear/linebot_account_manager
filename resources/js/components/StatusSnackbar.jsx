import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function StatusSnackbar(props) {
    const { status, handleClose } = props;

    return (
        <Snackbar
            open={status.open}
            autoHideDuration={10000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={status.type}>
                {status.message}
            </Alert>
        </Snackbar>
    );
}

export default StatusSnackbar;
