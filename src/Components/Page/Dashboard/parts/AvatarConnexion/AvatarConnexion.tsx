import {Avatar, Box, Chip, Divider, IconButton, Menu, MenuItem, Tooltip, Typography,} from "@mui/material";
import {MouseEvent, useState} from "react";
import DoneIcon from "@mui/icons-material/Done";
import User from "../../../../../@types/user";
import {Link, useNavigate} from "react-router-dom";

interface AvatarConnexionInterfaceProps {
    user: User;
}

const AvatarConnexion = (props: AvatarConnexionInterfaceProps) => {

    const {user} = props

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const navigate = useNavigate();


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="Remy Sharp" src={user.avatar}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: "45px"}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem sx={{m: "0 10px"}} onClick={handleCloseUserMenu}>
                    {user.role.map((el, idx) => {
                        return (
                            <Chip
                                variant="outlined"
                                color="success"
                                label={el}
                                size="small"
                                deleteIcon={<DoneIcon/>}
                                key={idx}
                                sx={{m: 1}}
                            />
                        );
                    })}
                </MenuItem>
                <Divider/>
                <MenuItem component={Link} to={"/dashboard/profile"} sx={{m: "0 10px"}} onClick={handleCloseUserMenu}>
                    <Typography textAlign="left">Profile</Typography>
                </MenuItem>
                <Divider/>
                <MenuItem
                    sx={{m: "0 10px"}}
                    onClick={() => {
                        handleCloseUserMenu();
                        localStorage.removeItem("accessToken");
                        navigate("/login")
                    }}
                >
                    <Typography textAlign="left">LogOut</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AvatarConnexion;
