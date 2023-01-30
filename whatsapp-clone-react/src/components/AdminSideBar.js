import  React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {  makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import "../css/AdminSideBar.css"
const AdminSideBar = () => {

    const useStyles = makeStyles({
        list: {
            width: 250,
            position:"absolute",
            left:"0px"
        },
        fullList: {
            width: "auto"
        },
        paper: {
            background: "blue"
        }
    });

    const drawerWidth = 240;

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );
    const classes = useStyles();
    return (
            <>
                <Box sx={{ display: 'flex'}}>
                    <CssBaseline />
                    <Drawer
                        classes={{ paper: classes.paper }}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                                backgroundColor: "#1e293b",
                                color: "white"
                            },
                        }}
                        variant="permanent"
                        anchor="left"

                    >
                        <Toolbar/>
                        <Divider />
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon style={{color: "white"}}>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Drawer>
                    <Main open>
                    </Main>
                </Box>
            </>)
    }
export default AdminSideBar;