import { Badge, Typography } from '@mui/material';
import { format, getDay, startOfToday } from 'date-fns';
import React from 'react';
import { twMerge } from 'tw-merge';

function DateBlock({ day, index, func, selectedDay, noofevents }) {

    const today = startOfToday();
    var adjustedStart = 0

    if (index == 0) {
        const startOfWeek = getDay(day);
        adjustedStart = startOfWeek === 0 ? 7 : startOfWeek;
    }

    var styles = 'flex items-center justify-center hover:bg-gray-200 hover:rounded-full m-2 relative';
    if (format(day, "yyyy MM dd") === format(selectedDay, "yyyy MM dd")) {
        styles = 'flex items-center justify-center bg-black text-white m-2 rounded-full'
        if (format(day, "yyyy MM dd") === format(today, "yyyy MM dd")) {
            styles = 'flex items-center justify-center bg-red-600 text-white m-2 rounded-full'
        }
    }

    return (
        <div className={styles} style={{ gridColumnStart: adjustedStart }} onClick={() => func()}>
            {noofevents != 0 ? <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold shadow-lg">
                <p>{noofevents}</p>
            </div> : <></>}
            <Typography sx={{ fontSize: 18 }} >{format(day, 'dd')}</Typography>
        </div>
    );
}

export default DateBlock;
