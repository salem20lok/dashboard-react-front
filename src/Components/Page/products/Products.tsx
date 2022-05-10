import {useEffect, useState} from "react";
import {RootState, useAppDispatch} from "../../../store";
import {fetchProducts} from "../../../store/ProductsSilce/action";
import {useSelector} from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductsType from "../../../@types/ProductsType";
import ProductsRow from "./parts/ProductsRow/ProductsRow";
import {Box} from "@mui/material";
import AddProducts from "./parts/addProducts/AddProducts";


const Products = () => {

    const dispatch = useAppDispatch()

    const [rest, setRest] = useState<boolean>(false);

    const HandleReset = () => {
        setRest(!rest)
    }

    useEffect(() => {
        dispatch(fetchProducts({skip: 0}))
    }, [rest])

    const products = useSelector((state: RootState) => {
        return state.products
    })


    return <Box>
        <AddProducts HandleReset={HandleReset}/>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">price</TableCell>
                        <TableCell align="right">stock</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.products.map((product: ProductsType) => (
                        <ProductsRow HandleReset={HandleReset} key={product._id} product={product}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
};

export default Products;
