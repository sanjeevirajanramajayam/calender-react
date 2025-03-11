import { CalendarMonth, CalendarViewDayOutlined, CalendarViewDayRounded } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, Box, Avatar, Badge } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';

import React from 'react'

function Navbar() {
    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarMonth />
                    <Typography sx={{ fontSize: 20, marginInline: 1 }}>Calender</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Badge badgeContent={2} color='error'>
                        <MailIcon />
                    </Badge>
                    <Avatar>A</Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar