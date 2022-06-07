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
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
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

interface AddProductsProps {
    HandleReset: Function
    categories: Category[]
}


const AddProducts = (props: AddProductsProps) => {

    const {HandleReset, categories} = props;

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

    const [images, setImages] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [stock, setStock] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

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

    const handleCreateProduct = () => {
        axios.post("http://localhost:3000/product", {
            images: images,
            title: title,
            description: description,
            price: price,
            stock: stock,
            category: category
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
            }
        }).then(({data}) => {
            console.log(data)
            HandleReset()
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleReset = () => {
        setImages("")
        setCategory("")
        setPrice(0)
        setDescription("")
        setStock(0)
        setTitle("")
    }


    return <Box>
        <Box sx={{m: 1, display: "flex", justifyContent: "flex-end"}}>
            <Button onClick={handleClickOpen} startIcon={<AddBusinessIcon/>} variant="outlined">Add-Product</Button>
        </Box>

        <Dialog fullWidth open={open} onClose={handleClose}>
            <DialogTitle>Create Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new product ?
                </DialogContentText>
                <form onSubmit={(e) => {
                    handleSubmit(e)
                }} autoComplete="off" noValidate>

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
                    handleReset()
                    handleClose()
                }
                }>Cancel</Button>
                <Button onClick={() => {
                    handleCreateProduct()
                    handleClose()
                    handleReset()
                }
                }>Subscribe</Button>
            </DialogActions>
        </Dialog>

    </Box>
}

export default AddProducts