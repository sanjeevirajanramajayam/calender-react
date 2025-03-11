import { Typography } from '@mui/material';
import { format, getDay, startOfToday } from 'date-fns';
import React from 'react';

function DateBlock({ day, index, func, selectedDay }) {
    const today = startOfToday();
    var adjustedStart = 0
    if (index == 0) {
        const startOfWeek = getDay(day);
        adjustedStart = startOfWeek === 0 ? 7 : startOfWeek;
    }
    return (
        <div className='flex items-center justify-center hover:bg-gray-200 hover:rounded-full hover:m-2' style={{ gridColumnStart: adjustedStart }} onClick={() => func()}>
            {format(day, "yyyy MM dd") === format(today, "yyyy MM dd") ? <Typography sx={{ fontSize: 18, color: 'red' }}>{format(day, 'dd')}</Typography> : <Typography sx={{ fontSize: 18 }}>{format(day, 'dd')}</Typography>}
        </div>
    );
}

export default DateBlock;
