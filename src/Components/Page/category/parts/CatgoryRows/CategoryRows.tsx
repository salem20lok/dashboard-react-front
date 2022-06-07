import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Category from "../../../../../@types/Category";
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteCategory from "../deleteCategory/DeleteCategory";
import UpdateCategory from "../updateCatgeory/UpdateCategory";

interface CategoryRowsProps {
    category: Category
    handleRefresh: Function
}

const CategoryRows = (props: CategoryRowsProps) => {
    const {category, handleRefresh} = props
    return <TableRow
        key={category._id}
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
        <TableCell component="th" scope="row">
            {category.name}
        </TableCell>
        <TableCell align="center">{category._id}</TableCell>
        <TableCell align="center">
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <DeleteCategory handleRefresh={handleRefresh} category={category}/>
                <UpdateCategory handleRefresh={handleRefresh} category={category}/>
            </ButtonGroup>
        </TableCell>
    </TableRow>
}

export default CategoryRows