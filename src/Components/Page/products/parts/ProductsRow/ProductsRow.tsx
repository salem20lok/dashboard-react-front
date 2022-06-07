import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ProductsType from "../../../../../@types/ProductsType";
import {Avatar, ButtonGroup} from "@mui/material";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import Category from "../../../../../@types/Category";


interface ProductsRowPropsInterface {
    product: ProductsType;
    HandleReset: Function;
    categories: Category[]
}

const ProductsRow = (props: ProductsRowPropsInterface) => {
    const {product, HandleReset, categories} = props
    return <TableRow
        key={product._id}
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
        <TableCell component="th" scope="row">

            <Avatar
                alt={product.title}
                src={product.images}
                sx={{width: 50, height: 50}}
            />
        </TableCell>
        <TableCell align="right">{product.title}</TableCell>
        <TableCell align="right">{product.category}</TableCell>
        <TableCell align="right">{product.price}</TableCell>
        <TableCell align="right">{product.stock}</TableCell>
        <TableCell align="right">

            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <DeleteProduct HandleReset={HandleReset} product={product}/>
                <UpdateProduct categories={categories} HandleReset={HandleReset} product={product}/>
            </ButtonGroup>

        </TableCell>
    </TableRow>
}

export default ProductsRow