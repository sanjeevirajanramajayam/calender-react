import { Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import React from 'react'

function EditDialog({editopen, seteditOpen}) {

    return (
        <Dialog
            open={editopen}
            onClose={seteditOpen(false)}
        >
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create an event, Please provide the necessary details below.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Event Name"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeEvent}
                    name="event_name"
                />

                <TextField
                    autoFocus
                    margin="dense"
                    type="time"
                    label="Start Time"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChangeEvent}
                    name="start_time"
                />

                <TextField
                    autoFocus
                    margin="dense"
                    type="time"
                    label="End Time"
                    fullWidth
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    onChange={handleChangeEvent}
                    name="end_time"
                />


            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={createEvent}>Create</Button>
            </DialogActions>
        </Dialog>)
}

export default EditDialog