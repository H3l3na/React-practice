import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Button from '@material-ui/core/Button';

export default function ErrorMessage({ open, handleClose }) {


    return (
        <Dialog onClose={handleClose} open={open}>
            <p>Error adding data</p>
            <Button onClick={handleClose} color="primary" autoFocus>
                Close
            </Button>
        </Dialog>
    );
}