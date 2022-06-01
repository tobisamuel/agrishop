import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Navbar from "../Components/Navbar";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../redux/apiCalls";
import { resetCart } from "../redux/cartRedux";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../api/index";
import { usePaystackPayment } from "react-paystack";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        AgriShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Shipping address", "Review your order"];

const theme = createTheme();

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch(); // used to dispatch redux actions
  const navigate = useNavigate();

  const { _id, firstName, lastName, email } = user;
  let { products, total } = cart;
  const [address, setAddress] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const reviewAddy = address.address;
  const [ref, setRef] = useState(null);
  const [data, setData] = useState(null);

  // filter id and quantity from cart products and send to order object
  const filteredProducts = products.map((product) => {
    const id = product._id;
    const name = product.name;
    const price = product.price;
    const quantity = product.quantity;
    return { id, name, price, quantity };
  });

  // handle address change
  const handleChange = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // create order object to be sent
  const order = { _id, filteredProducts, total, ...address };
  console.log(order);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address-line"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {products.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={product.name}
                    secondary={product.description}
                  />
                  <Typography variant="body2">
                    &#8358;{product.price * product.quantity}
                  </Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Shipping" />
                <Typography variant="body2">Free</Typography>
              </ListItem>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  &#8358;{total}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Shipping
                </Typography>
                <Typography gutterBottom>
                  {firstName} {lastName}
                </Typography>
                <Typography gutterBottom>{reviewAddy}</Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: cart.total * 100,
    publicKey: "pk_test_17ac1b0dce817884103d7ee65124009a6d22d1d2",
  };

  const onSuccess = (ref) => {
    // Implementation for whatever you want to do with reference and after success call.
    const reference = ref?.reference;
    setRef(reference);
    console.log(reference);
  };

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await userRequest.post("payment/verify", {
          ref: ref,
        });
        const { data } = res.data;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    ref && verifyPayment();
  }, [ref]);

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  const handleNext = () => {
    if (activeStep === 1) {
      initializePayment(onSuccess, onClose);
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  if (data) {
    addOrder(order, dispatch);
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    ".MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
                      color: "teal",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  {data
                    ? `Your reference number is ${data.reference}. We have emailed
                  your order confirmation, and will send you an update when your
                  order has shipped`
                    : "Order deets"}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    dispatch(resetCart());
                    navigate("/");
                  }}
                  sx={{ mt: 3 }}
                >
                  Back to home
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;
