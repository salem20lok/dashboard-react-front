import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import User from "../../../@types/user";
import {Avatar, Box, ButtonGroup, Chip, Skeleton, Stack} from "@mui/material";
import UserDelete from "./parts/user-delete/UserDelete";
import UserUpdate from "./parts/user-update/UserUpdate";
import Pagination from '@mui/material/Pagination';
import AddUser from "./parts/addUser/AddUser";
import {fetchUsers} from "../../../store/UserSilce/action";


const Users = () => {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [count, setCount] = useState<number>(0)
    const [pagination, setPagination] = useState<number>(1)

    useEffect(() => {
        dispatch(fetchUsers({skip: (pagination - 1) * 6}));
    }, [pagination]);

    const refresh = () => {
        dispatch(fetchUsers({skip: (pagination - 1) * 6}));
    };

    const usersStore = useSelector((state: RootState) => {
        return state.users;
    });

    useEffect(() => {
        setCount(() => {
            return Math.ceil(usersStore.count / 6)
        });
        setUsers(usersStore.users);
        setLoading(usersStore.loading);
    }, [usersStore]);


    return (
        <Box>
            {loading ? (
                <Stack spacing={1}>
                    <Skeleton variant="text"/>
                    <Skeleton variant="circular" width={40} height={40}/>
                    <Skeleton variant="rectangular" width={210} height={118}/>
                </Stack>
            ) : (
                <Box>
                    <AddUser refresh={refresh}/>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell align="center">full Name</TableCell>
                                    <TableCell align="center">E-mail</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center"/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((el: User, idx) => {
                                    return (
                                        <TableRow
                                            key={el._id}
                                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {
                                                    <Avatar
                                                        alt={el.firstName + el.lastName}
                                                        src={el.avatar}
                                                    />
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                {el.firstName + " " + el.lastName}
                                            </TableCell>
                                            <TableCell align="right">{el.email}</TableCell>
                                            <TableCell align="right">
                                                {el.role.map((e, n) => {
                                                    return <Chip key={n} label={e}/>;
                                                })}
                                            </TableCell>
                                            <TableCell align="right">
                                                <ButtonGroup disableElevation variant="contained">
                                                    <UserDelete refresh={refresh} user={el}/>
                                                    <UserUpdate refresh={refresh} user={el}/>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack spacing={2}>
                        <Pagination
                            page={pagination}
                            variant="outlined" shape="rounded"
                            onChange={(event, page) => setPagination(page)}
                            sx={{marginTop: "20px", display: "flex", justifyContent: "center"}} count={count}/>
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default Users;
