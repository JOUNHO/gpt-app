import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import SearchTemplate from "./SearchTemplate";


  


function Header(props) {
    const { setIsChatOpen } = props;

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            
          </Typography>
            <SearchTemplate setIsChatOpen={setIsChatOpen}/>          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;