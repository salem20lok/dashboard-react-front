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
import Pagination from "@mui/material/Pagination";
import Category from "../../../@types/Category";
import axios from "axios";


const Products = () => {

    const dispatch = useAppDispatch()

    const [rest, setRest] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1)
    const [category, setCategory] = useState<Category[]>([])

    const HandleReset = () => {
        setRest(!rest)
    }

    useEffect(() => {
        dispatch(fetchProducts({skip: (page - 1) * 6, limit: 6}))

        axios.get("http://localhost:3000/category/all").then(({data}) => {
            setCategory(data)
        }).catch((e) => {
            console.log(e)
        })

    }, [rest, page])

    const products = useSelector((state: RootState) => {
        return state.products
    })

    const count = Math.ceil(products.count / 6);


    return <Box>
        <AddProducts categories={category} HandleReset={HandleReset}/>
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
                        <ProductsRow categories={category} HandleReset={HandleReset} key={product._id}
                                     product={product}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{m: 2, display: "flex", justifyContent: "center"}}>
            <Pagination
                page={page}
                defaultPage={1}
                onChange={(e, page) => {
                    setPage(page)
                }}
                count={count} variant="outlined" shape="rounded"/>
        </Box>
    </Box>
};

export default Products;
