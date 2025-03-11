import { Button, List, ListItem, Typography, ListItemText } from "@mui/material";
import { useState } from "react";
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, parse, startOfMonth, startOfToday, sub } from 'date-fns';
import DateBlock from "./components/DateBlock";
import './App.css'
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Navbar from "./components/Navbar";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import database from "./Content";

function App() {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date());
  const MonthDays = eachDayOfInterval({ start: firstDayCurrentMonth, end: endOfMonth(firstDayCurrentMonth) });
  const DAYSOFTHEWEEK = ["M", "T", "W", "T", "F", "S", "S"];
  const [selectedDay, setSelectedDay] = useState(today);

  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState('');

  const handleChangeEvent = (e) => {
    setEvent(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createEvent = () => {
    const array = [...(database[selectedDay] || []), event]
    database[selectedDay] = array;
    console.log(database)
    setOpen(false);
  };

  function NextMonth() {
    var firstDayLastMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayLastMonth, 'MMMM yyyy'))
  }

  function PrevMonth() {
    var firstDayLastMonth = sub(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayLastMonth, 'MMMM yyyy'))
  }

  return (
    <>
      <Navbar />
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create an event, Please provide the necessary details below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Event"
            fullWidth
            variant="standard"
            onChange={handleChangeEvent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createEvent}>Create</Button>
        </DialogActions>
      </Dialog>

      <div className="p-6 flex ">
        <div className="flex-1">
          <div>
            <div className="flex">
              <ChevronLeft onClick={() => PrevMonth()} />
              <ChevronRight onClick={() => NextMonth()} />
              <Typography sx={{ fontWeight: 'bold' }}>{format(firstDayCurrentMonth, "MMMM yyyy")}</Typography>
            </div>
            <div className="calender-main mt-2">
              {DAYSOFTHEWEEK.map((day) => (
                <div className='flex items-center justify-center border-b-2 border-b-gray-300 ' >
                  <Typography sx={{ color: 'GrayText', fontWeight: 'light' }}> {day}</Typography>
                </div>
              ))}

              {MonthDays.map((day, index) => (
                <DateBlock key={day} day={day} index={index} func={() => setSelectedDay(day)} selectedDay={selectedDay}/>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <Typography sx={{ fontSize: 24 }}>Today's Tasks</Typography>
              <Typography>{format(selectedDay, "dd MMMM yyyy")}</Typography>
            </div>
            <Button variant="contained" onClick={handleClickOpen}>Create Event</Button>
          </div>
          <List>
          <ListItem><ListItemText primary="Events" /></ListItem>
            {database[selectedDay]?.map((element, index) => <ListItem><ListItemText primary={element} /></ListItem>)}
          </List>
        </div>
      </div>

    </>
  )
}

export default App
