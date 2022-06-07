import {Box} from "@mui/material";
import OrderType from "../../../../../@types/OrderType";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Fragment, useState} from "react";

interface RowTableProps {
    orderPayload: OrderType
}

const RowTable = (props: RowTableProps) => {

    const {orderPayload} = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {orderPayload.user.firstName} {orderPayload.user.lastName}
                </TableCell>
                <TableCell align="right">{orderPayload.user.email}</TableCell>
                <TableCell align="right">{orderPayload.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Title</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderPayload.orderItems.map((orderEl) => (
                                        <TableRow key={orderEl._id}>
                                            <TableCell component="th" scope="row">
                                                {orderEl.title}
                                            </TableCell>
                                            <TableCell align="right">{orderEl.price}</TableCell>
                                            <TableCell align="right">{orderEl.qte}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(orderEl.price * orderEl.qte * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default RowTable