import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        AGRISHOP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const VendorHome = () => {
  const vendor = useSelector((state) => state.vendor.currentVendor);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" noWrap sx={{ color: "teal", flexGrow: 1 }}>
            AGRISHOP Vendors
          </Typography>
          {vendor ? (
            <Link
              variant="button"
              href="/vendor/dashboard/profile"
              sx={{ color: "teal", textDecoration: "none", my: 1, mx: 1.5 }}
            >
              Hello, {vendor?.firstName}
            </Link>
          ) : (
            <Link
              variant="button"
              href="/vendor/login"
              sx={{ color: "teal", textDecoration: "none", my: 1, mx: 1.5 }}
            >
              LOGIN
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Become an AgriShop Vendor
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Grow your business by selling your products on AgriShop
        </Typography>
        <Typography
          variant="h5"
          align="center"
          component="p"
          sx={{ mt: 5, color: "teal" }}
        >
          <Link
            variant="h5"
            href="vendor/register"
            sx={{ color: "teal", textDecoration: "none", my: 1, mx: 1.5 }}
          >
            Get started now
          </Link>
        </Typography>
      </Container>

      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </React.Fragment>
  );
};

export default VendorHome;
