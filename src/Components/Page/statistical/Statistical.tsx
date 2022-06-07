import * as React from 'react';
import {styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Statistical = () => {


    return <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
            <Item>

            </Item>
        </Grid>
        <Grid item md={4} xs={12}>
            <Item>xs=4</Item>
        </Grid>

    </Grid>;
};

export default Statistical;
