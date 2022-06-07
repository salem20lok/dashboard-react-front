import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import AvatarConnexion from "./parts/AvatarConnexion/AvatarConnexion";
import SearchDash from "./parts/SearchDash/SearchDash";
import SideBar from "./parts/sideBar/SideBar";
import Statistical from "../statistical/Statistical";
import Users from "../user/Users";
import Roles from "../roles/Roles";
import Products from "../products/Products";
import Order from "../order/Order";
import Profile from "../profile/Profile";
import {useSelector} from "react-redux";
import {addProfile} from "../../../store/ProfileSlice/ProfileSlice";
import {RootState, useAppDispatch} from "../../../store";
import Category from "../category/Category";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Dashboard = () => {
    /*---------------------------------MUI-------------------------------------*/

    const [open, setOpen] = useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    /*---------------------------------MUI-------------------------------------*/

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios
            .get("http://localhost:3000/user/identification", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then(({data}) => {
                dispatch(addProfile({profile: data}))
            })
            .catch((e) => {
                navigate("/login");
            });
    }, []);

    const user = useSelector((state: RootState) => {
        return state.profile.profile;
    })


    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>

            <AppBar position="fixed" open={open}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: "none"}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <SearchDash/>

                    <AvatarConnexion user={user}/>
                </Toolbar>
            </AppBar>

            <SideBar open={open} handleDrawerClose={handleDrawerClose}/>

            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <main>
                    <Routes>
                        <Route path={"/"} element={<Statistical/>}/>
                        <Route path={"/dashboard/statistical"} element={<Statistical/>}/>
                        <Route path={"/dashboard/users"} element={<Users/>}/>
                        <Route path={"/dashboard/roles"} element={<Roles/>}/>
                        <Route path={"/dashboard/products"} element={<Products/>}/>
                        <Route path={"/dashboard/order"} element={<Order/>}/>
                        <Route path={"/dashboard/profile"} element={<Profile/>}/>
                        <Route path="/dashboard/category" element={<Category/>}/>
                    </Routes>
                </main>
            </Box>
        </Box>
    );
};

export default Dashboard;
