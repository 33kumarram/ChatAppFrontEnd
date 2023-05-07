import React, { useState } from "react";
import {
    AppBar,
    Button,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../Redux/actionCreators'
import DrawerComp from "./drawer";

export const Header = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate()
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useDispatch()
    const { userLogIn } = bindActionCreators(actionCreators, dispatch)
    const LogOut = () => {
        userLogIn({})
    }

    return (
        <React.Fragment>
            <AppBar sx={{ background: "#fff" }}>
                <Toolbar>
                    {isMatch ? (
                        <>
                            <DrawerComp />
                            <Typography sx={{ fontSize: "26px", paddingLeft: "10px", color: '#000' }}>
                                Articles
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Tabs
                                sx={{ marginLeft: "auto" }}
                                indicatorColor="secondary"
                                value={value}
                                onChange={(e, value) => setValue(value)}
                            >
                                <Tab label="Home" onClick={() => navigate('/home')} style={{ color: '#000' }} />
                                <Tab label="About Us" onClick={() => navigate('/about')} style={{ color: '#000' }} />
                                <Tab label="Contact Us" onClick={() => navigate('/contact')} style={{ color: '#000' }} />
                            </Tabs>
                            <Button sx={{ marginLeft: "auto" }} onClick={()=>LogOut()} variant='contained' color='error'>
                                LogOut
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};
