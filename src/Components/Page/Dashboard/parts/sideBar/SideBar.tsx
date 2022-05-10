import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {CSSObject, styled, Theme, useTheme} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import {Link, useLocation} from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

interface SideBarPropsInterface {
    open: boolean;
    handleDrawerClose: Function;
}

const SideBar = ({open, handleDrawerClose}: SideBarPropsInterface) => {
    const theme = useTheme();

    const location = useLocation().pathname.slice(11);

    const MenuList = [
        {name: "statistical", icon: <DashboardIcon/>},
        {name: "users", icon: <PeopleAltIcon/>},
        {
            name: "roles",
            icon: <HowToRegIcon/>,
        },
        {name: "products", icon: <QrCode2Icon/>},
        {name: "order", icon: <LocalGroceryStoreIcon/>},
    ];

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={() => handleDrawerClose()}>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon/>
                    ) : (
                        <ChevronLeftIcon/>
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                {MenuList.map((item, idx) => (
                    <ListItemButton
                        component={Link}
                        to={`/dashboard/${item.name}`}
                        key={idx}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            textTransform: "uppercase",
                        }}
                        disabled={location === item.name}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;
