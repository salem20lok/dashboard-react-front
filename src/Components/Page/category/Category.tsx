import {Box} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {RootState, useAppDispatch} from "../../../store";
import {fetchCategory} from "../../../store/CategorySilce/action";
import {useSelector} from "react-redux";
import CategoryRows from "./parts/CatgoryRows/CategoryRows";
import AddCategory from "./parts/AddCategory/AddCategory";
import Pagination from "@mui/material/Pagination";

const Category = () => {

    const dispatch = useAppDispatch()

    const [refresh, setRefresh] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1)

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        dispatch(fetchCategory({skip: (page - 1) * 6}))
    }, [refresh, page])

    const category = useSelector((state: RootState) => {
        return state.category
    })

    return <Box>
        <Box sx={{m: 1, display: "flex", justifyContent: "flex-end"}}>
            <AddCategory handleRefresh={handleRefresh}/>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {category.category.map((el) => (
                        <CategoryRows handleRefresh={handleRefresh} key={el._id} category={el}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{m: 2, display: "flex", justifyContent: "center"}}>
            <Pagination
                defaultPage={1}
                page={page}
                onChange={(e, page) => setPage(page)}
                count={Math.ceil(category.count / 6)}
                variant="outlined" shape="rounded"
            />
        </Box>
    </Box>
}

export default Category