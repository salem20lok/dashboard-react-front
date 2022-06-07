import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import {useEffect} from "react";
import {fetchesOrder} from "../../../store/OrderSlice/action";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowTable from "./parts/RowTable/RowTable";
import OrderType from "../../../@types/OrderType";
import {Box, Button} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from "axios";


const Order = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchesOrder({skip: 0, limit: 6}))
    }, [])

    const orders = useSelector((state: RootState) => {
        return state.orders
    })

    const handleExport = async () => {
        const {data} = await axios.get("http://localhost:3000/order/export", {responseType: "blob"});
        const blob = new Blob([data], {type: "text/csv"})
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a')
        link.href = url;
        link.download = 'orders.csv';
        link.click();
    }

    return <Box>
        <Box sx={{m: 2, display: "flex", justifyContent: "flex-end"}}>
            <Button endIcon={<FileUploadIcon/>} onClick={handleExport} variant="outlined">Export</Button>
        </Box>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>FullName</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.orders.map((row: OrderType) => (
                        <RowTable key={row._id} orderPayload={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>

};

export default Order;
