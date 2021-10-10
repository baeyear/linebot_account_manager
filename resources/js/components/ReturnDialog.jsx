import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";

const Header = (props) => {
    const { openDialog } = props;

    return (
        <Dialog
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="simple-dialog-title">
                ページにアクセスできません
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ページが存在しないか、アクセスが許可されていません。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button href="/home" color="primary">
                    ホームに戻る
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Header;
