import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Login";

import useAuth from "../hooks/useAuth";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  const auth = useAuth();
  let navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Movie App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2} sx={{ margin: "auto" }}>
            {
              <>
                <Typography fontSize={18}>
                  Welcome {auth.user.username} !{" "}
                </Typography>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                  onClick={() => {
                    auth.logout(() => navigate("/"));
                  }}
                >
                  <IconButton size="small" sx={{ color: "white" }}>
                    <LogoutIcon />
                    Sign out
                  </IconButton>
                </Box>
              </>
            }
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
