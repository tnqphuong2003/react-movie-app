import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import useAuth from "../hooks/useAuth";

function MainHeader() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        height: 80,
        bgcolor: "#171d22",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex", color: "#e4d804" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 28,
              color: "#e4d804",
              textDecoration: "none",
            }}
          >
            Movie App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              flexGrow: 1,

              display: { xs: "none", md: "flex" },
            }}
            spacing={4}
          >
            <Button
              onClick={() => navigate(`/movies/top_rated`)}
              sx={{
                my: 2,
                color: "#e4d804",
                fontWeight: "bold",
                display: "block",
              }}
            >
              Top rated
            </Button>
            <Button
              onClick={() => navigate(`/movies/now_playing`)}
              sx={{
                my: 2,
                color: "#e4d804",
                fontWeight: "bold",
                display: "block",
              }}
            >
              Now Playing
            </Button>
            <Button
              onClick={() => navigate(`/movies/popular`)}
              sx={{
                my: 2,
                color: "#e4d804",
                fontWeight: "bold",
                display: "block",
              }}
            >
              Popular
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2} sx={{ margin: "auto" }}>
              {
                <>
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                    }}
                    onClick={() => {
                      auth.logout(() => navigate("/"));
                    }}
                  >
                    <Button
                      sx={{
                        width: 120,
                        fontWeight: "bold",
                        color: "#000",
                        bgcolor: "#e4d804",
                        borderRadius: "20px",
                        "&:hover": {
                          bgcolor: "black",
                          color: "#E4D804",
                          border: "2px solid #E4D804",
                        },
                      }}
                    >
                      Sign out
                    </Button>
                  </Box>
                </>
              }
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MainHeader;
