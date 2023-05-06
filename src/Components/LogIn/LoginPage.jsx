import React from 'react'
import { Box, Tab } from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import { LogIn } from '../Authentication/LogIn';
import { SignUp } from '../Authentication/SignUp';
import './LoginPage.css'

export const LoginPage = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='main_container'>
            <div className='sub_container'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Log In" value="1" />
                            <Tab label="Sign Up" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><LogIn /></TabPanel>
                    <TabPanel value="2"><SignUp /></TabPanel>
                </TabContext>
            </div>
        </div>
    )
}
