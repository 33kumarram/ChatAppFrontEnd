import React, { useState } from "react";
import {
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../Redux/actionCreators'

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { userLogIn } = bindActionCreators(actionCreators, dispatch)
    const LogOut = () => {
        userLogIn({})
    }

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                open={openDrawer}
                style={{ color: '#000' }}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItemButton onClick={() => navigate('/home')}>
                        <ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/about')}>
                        <ListItemIcon>
                            <ListItemText>About Us</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/contact')}>
                        <ListItemIcon>
                            <ListItemText>Contact Us</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                    <ListItemButton onClick={() => LogOut()}>
                        <ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton
                sx={{ color: "#000" }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon color="#000" />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp;