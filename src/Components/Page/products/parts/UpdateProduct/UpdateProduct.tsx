import {
    Avatar,
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import ProductsType from "../../../../../@types/ProductsType";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {FormEvent, useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import {styled} from "@mui/material/styles";
import axios from "axios";
import Category from "../../../../../@types/Category";

const Input = styled('input')({
    display: 'none',
});

interface UpdateProductProps {
    product: ProductsType;
    HandleReset: Function;
    categories: Category[]
}

const UpdateProduct = (props: UpdateProductProps) => {

    const {product, HandleReset, categories} = props

    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }


    const [images, setImages] = useState<string>(product.images);
    const [title, setTitle] = useState<string>(product.title);
    const [description, setDescription] = useState<string>(product.description);
    const [category, setCategory] = useState<string>(product.category);
    const [stock, setStock] = useState<number>(product.stock);
    const [price, setPrice] = useState<number>(product.price);

    const uploadImage = async (file: FileList | null) => {
        if (file === null) return;
        const formData = new FormData();
        formData.append("image", file[0]);
        await axios.post("http://localhost:3000/uploads", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then(({data}) => {
            setImages(data.url)
        }).catch((e) => {
            console.log(e.response.data.message)
        })
    }

    const handleUpdate = () => {

        axios.put("http://localhost:3000/product/" + product._id, {
            images: images,
            title: title,
            price: price,
            description: description,
            stock: stock,
            category: category
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
        }).then(({data}) => {
            HandleReset();
        }).catch((e) => {
            console.log(e.response.data.message)
        })

    }

    const handleCancel = () => {
        setImages(product.images)
    }


    return <Box>
        <Button onClick={handleClickOpen} sx={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0"}}
                startIcon={<SystemUpdateAltIcon/>}>Update</Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>

                <form autoComplete="off" onSubmit={(e) => {
                    handleSubmit(e)
                }} noValidate>
                    <Stack sx={{mt: 1}} direction="row" spacing={2}>

                        <Avatar sx={{width: 56, height: 56}} alt="Product" src={images}/>

                        <TextField fullWidth
                                   margin="normal"
                                   disabled
                                   variant="outlined"
                                   label="Add Something"
                                   value={images}
                                   InputProps={
                                       {
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <label htmlFor="contained-button-file">
                                                       <Input accept="image/*"
                                                              id="contained-button-file" multiple type="file"
                                                              onChange={(e) => {
                                                                  uploadImage(e.target.files)
                                                              }}
                                                       />
                                                       <Button variant="contained" component="span">
                                                           Upload
                                                       </Button>
                                                   </label>
                                               </InputAdornment>
                                           )
                                       }
                                   }
                        />
                    </Stack>
                    <TextField margin="normal" fullWidth required label="Title"
                               variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <TextField margin="normal" fullWidth required label="Description"
                               variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <FormControl fullWidth margin="normal" size="medium">
                        <InputLabel id="demo-select-small">Category</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                categories.map((el) => {
                                    return (<MenuItem key={el._id} value={el.name}>
                                        {el.name}
                                    </MenuItem>)
                                })
                            }
                        </Select>
                    </FormControl>

                    <TextField margin="normal" fullWidth required label="Stock"
                               variant="outlined" value={stock}
                               onChange={(e) => setStock(Number.parseInt(e.target.value))}/>


                    <TextField margin="normal" fullWidth required label="Price"
                               variant="outlined" value={price}
                               onChange={(e) => setPrice(parseInt(e.target.value))}/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleClose()
                    handleCancel()
                }}>Cancel</Button>
                <Button onClick={() => {
                    handleUpdate()
                    handleClose()
                }}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </Box>
}

export default UpdateProduct
