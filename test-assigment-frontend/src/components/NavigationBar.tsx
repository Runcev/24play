import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material";
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                    <LocalConvenienceStoreIcon/>
                </IconButton>
                <Typography variant="h6" component="div">
                    24play
                </Typography>
                <Stack component="div" direction="row">
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar