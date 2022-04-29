import {Button, InputAdornment, TextField} from "@mui/material";
import {styled} from '@mui/material/styles';
import User from "../../../../../@types/user";


const Input = styled('input')({
    display: 'none',
});

interface UploadImageProps {
    uploadImage: Function
    user: User
}

const UploadImage = (props: UploadImageProps) => {


    const {uploadImage, user} = props

    return (<TextField fullWidth
                       sx={{ml: 1}}
                       value={user.avatar}
                       disabled
                       variant="outlined"
                       label="Add Something"
                       InputProps={
                           {
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <label htmlFor="contained-button-file">
                                           <Input onChange={(e) => {
                                               uploadImage(e.target.files);
                                           }} accept="image/*"
                                                  id="contained-button-file" multiple type="file"/>
                                           <Button variant="contained" component="span">
                                               Upload
                                           </Button>
                                       </label>
                                   </InputAdornment>
                               )
                           }
                       }
    />)

}

export default UploadImage