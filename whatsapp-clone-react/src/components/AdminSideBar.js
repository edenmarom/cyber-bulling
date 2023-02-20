import  React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import "../css/AdminSideBar.css"
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';

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

    function onMenagementClick(){
        window.location.href="/scenariomanagement"
    }

    function onReactionClick(){
        window.location.href="/scenarioReactions"
    }

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
                        <ListItem key={"Scenarios Management"} disablePadding onClick={()=>onMenagementClick()}>
                            <ListItemButton>
                                <ListItemIcon style={{color: "white"}}>
                                    <ArticleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Scenarios Management"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"Scenarios Results"} disablePadding onClick={()=>onReactionClick()}>
                            <ListItemButton>
                                <ListItemIcon style={{color: "white"}}>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Scenarios Results"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                <Main open>
                </Main>
            </Box>
        </>)
}
export default AdminSideBar;