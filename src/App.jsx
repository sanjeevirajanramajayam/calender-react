import { Button, List, ListItem, Typography, ListItemText, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ChevronLeft, ChevronRight, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { add, eachDayOfInterval, endOfMonth, format, parse, startOfToday, sub } from "date-fns";
import DateBlock from "./components/DateBlock";
import Navbar from "./components/Navbar";
import axios from "axios";
import './App.css';


function App() {
  const DAYSOFTHEWEEK = ["M", "T", "W", "T", "F", "S", "S"];
  const today = startOfToday();
  const [database, setDatabase] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, seteditOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'));
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const get_events = async () => {
      // const response = await axios.get('http://localhost:8001/events/view')
      // setDatabase(response.data)
    }
    get_events()
  }, [])

  const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date());
  const MonthDays = eachDayOfInterval({ start: firstDayCurrentMonth, end: endOfMonth(firstDayCurrentMonth) });

  const handleChangeEvent = (e) => {
    setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createEvent = () => {
    const data = { event_name: event.event_name, start_time: event.start_time, end_time: event.end_time, day: format(selectedDay, 'yyyy-MM-dd') }
    // axios.post("http://localhost:8001/events/add", data).catch((error) => {
    //   console.error("Error adding events:", error.message);
    // });
    setDatabase((prevDatabase) => [...prevDatabase, {
      event_name: event.event_name,
      start_time: event.start_time,
      end_time: event.end_time,
      day: format(selectedDay, 'yyyy-MM-dd')
    }]);
    setOpen(false);
  };

  const editEvent = (event, index) => {
    setEvent(event);
    console.log(index);
    setEditIndex(index);
    seteditOpen(true);
  };

  const handleEditEvent = () => {
    if (editIndex !== null) {
      let event_name = '';
      let day = '';
      var db = database;
      const filteredArray = db.filter((element, index) => (format(new Date(element.day), "yyyy MMMM dd") === format(selectedDay, "yyyy MMMM dd")))
      const filteredEntry = filteredArray[editIndex];
      const updatedDB = db.map((element, index) => {
        if (element.event_name == filteredEntry.event_name && element.day == filteredEntry.day && element.start_time == filteredEntry.start_time && element.end_time == filteredEntry.end_time) {
          event_name = element.event_name;
          day = element.day;
          return event
        }
        else {
          return element
        }
      })
      const data = { event: event, event_name: event_name, day: day }
      // axios.post("http://localhost:8001/events/update", data).catch((error) => {
      //   console.error("Error updating events:", error.message);
      // });
      setDatabase(updatedDB);
      seteditOpen(false);
    }

  };

  const deleteEvent = (selectedDay, element) => {
    var db = database;
    console.log(element);
    db = db.filter((e, index) => e !== element)
    const data = { event_name: element.event_name, day: element.day }
    // axios.post("http://localhost:8001/events/delete", data).catch((error) => {
    //   console.error("Error updating events:", error.message);
    // });
    setDatabase(db);
  };

  function NextMonth() {
    var firstDayLastMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayLastMonth, 'MMMM yyyy'))
  }

  function PrevMonth() {
    var firstDayLastMonth = sub(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayLastMonth, 'MMMM yyyy'))
  }

  function getEvents(selectedDay) {
    const filteredArray = database.filter((element, index) => (format(new Date(element.day), "yyyy MMMM dd") === format(selectedDay, "yyyy MMMM dd")));
    return filteredArray.length
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
      </Dialog>

      <Dialog
        open={editopen}
        onClose={() => seteditOpen(false)}
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit an event, Please provide the necessary details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            value={event.event_name || ""}
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
            value={event.start_time || ""}
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
            value={event.end_time || ""}
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleChangeEvent}
            name="end_time"
          />


        </DialogContent>
        <DialogActions>
          <Button onClick={() => seteditOpen(false)}>Cancel</Button>
          <Button onClick={() => handleEditEvent()}>Edit</Button>
        </DialogActions>
      </Dialog>



      <div className="p-6 flex ">

        <div className="flex-1">

          <div className="flex justify-center">
            <Typography sx={{ fontWeight: 'bold', fontSize: 24 }}>{format(firstDayCurrentMonth, "MMMM yyyy")}</Typography>
          </div>

          <div className="flex justify-center">
            <ChevronLeft onClick={() => PrevMonth()} />
            <ChevronRight onClick={() => NextMonth()} />
          </div>

          <div className="calender-main mt-2 justify-center">

            {DAYSOFTHEWEEK.map((day) => (
              <div className='flex items-center justify-center border-b-2 border-b-gray-300 ' >
                <Typography sx={{ color: 'GrayText', fontWeight: 'light' }}> {day}</Typography>
              </div>
            ))}

            {MonthDays.map((day, index) => (
              <DateBlock key={day} day={day} index={index} func={() => setSelectedDay(day)} selectedDay={selectedDay} noofevents={getEvents(day)} />
            ))}
          </div>

        </div>

        <div className="flex-1">

          <div className="flex justify-between">

            <div>
              <Typography sx={{ fontSize: 24 }}>Schedule for {format(selectedDay, 'dd MMMM yyyy')}</Typography>
              <Typography>{format(selectedDay, "dd MMMM yyyy")}</Typography>
            </div>

            <Button variant="contained" onClick={handleClickOpen}>Create Event</Button>
          </div>

          <Typography sx={{ mt: 4, fontSize: 24 }}>Events</Typography>
          <List dense={true}>
            {database.filter((element, index) => format(new Date(element.day), "yyyy MMMM dd") === format(selectedDay, "yyyy MMMM dd")).map((element, index) =>
              <ListItem secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => editEvent(element, index)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => { deleteEvent(selectedDay, element) }}>
                    <Delete />
                  </IconButton>
                </>
              }>
                <ListItemText primary={element.event_name} />
                <ListItemText primary={`${element.start_time} - ${element.end_time}`} />
              </ListItem>)}
          </List>
        </div>
      </div >
    </>
  )
}

export default App