import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  AlertTitle,
} from "@mui/material";
import { useState } from "react";
import DialogRegister from "../components/common/DialogRegister";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import DialogRecuperar from "../components/common/DialogRecuperarCuenta";

const Login = () => {
  /*estados para dialogo de nuevo usuario*/
  const [dialogOpen, setDialogOpen] = useState(false);

  /*estados para dialogo recuperacion de clave*/
  const [dialogRecOpen, setDialogRecOpen] = useState(false);

  const [errorLogin, setErrorLogin] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogRecOpen = () => {
    setDialogRecOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogRecClose = () => {
    setDialogRecOpen(false);
  };


  const handleLoading = (status) => {
    setLoadingOpen(status);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Ingreser un correo váñido").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await axios({
        method: "post",
        url: "http://localhost:8088/v2/api/auth",
        data: values,
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        setErrorLogin(true);
        console.log(error.config);
      });
      if (response.status === 200) {
        Router.push("/").catch(console.error);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("id", response.data.id);
      }
      console.log(response);
    },
  });

  const dialogProps = {
    open: dialogOpen,
    onClose: handleDialogClose,
    handleLoading: handleLoading,
    setAlertMessage: setAlertMessage,
    setShowSnackbar: setShowSnackbar,
  };

  const dialogRecProps = {
    ...dialogProps,
    onClose: handleDialogRecClose,
    open: dialogRecOpen,
  };

  return (
    <>
      <Head>
        <title>Plataforma Municipal</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          background: "linear-gradient(to bottom, #0d700f, #62de80)",
        }}
      >
        <Container
          sx={{
            background: "#FFF",
            padding: 5,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Sistema de Reservas
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Inicie Sessión
                  </Typography>
                </Box>

                {errorLogin && (
                  <MuiAlert severity="error">
                    <AlertTitle>Datos Incorrectos</AlertTitle>
                    Verifique sus datos y vuelva a intentarlo
                  </MuiAlert>
                )}

                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Correo Electrónico"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Ingresar
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body2">
                  ¿No tienes una cuenta?{" "}
                  <Typography
                    onClick={handleDialogOpen}
                    color="textSecondary"
                    display="inline"
                    variant="subtitle2"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#000000",
                        textDecoration: "underline #000000",
                      },
                      fontWeight: "bold",
                    }}
                  >
                    Registrate
                  </Typography>
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  ¿Se te olvidó tu contraseña?{" "}
                  <Typography
                    onClick={handleDialogRecOpen}
                    color="textSecondary"
                    display="inline"
                    variant="subtitle2"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#000000",
                        textDecoration: "underline #000000",
                      },
                      fontWeight: "bold",
                    }}
                  >
                    Click aquí
                  </Typography>
                </Typography>
              </form>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  mt: 2,
                  mx: "auto",
                  width: "750px",
                  "& img": {
                    width: "100%",
                  },
                }}
              >
                <img alt="reserva" src="/static/images/imglogin_1.png" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <DialogRegister {...dialogProps} />
      <DialogRecuperar {...dialogRecProps} />
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 9999999 }}
        open={loadingOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Login;
