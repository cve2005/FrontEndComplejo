import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import axios from "axios";

const DialogRegister = (props) => {
  const { onClose, handleLoading, open, setShowSnackbar, setAlertMessage } = props;

  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick") {
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      tipoDocumento: "",
      numdocumento: "",
      nombres: "",
      apepat: "",
      apemat: "",
      correo: "",
      celular: "",
      clave: "",
    },
    validationSchema: Yup.object({
      tipoDocumento: Yup.string().max(5).required("Tipo de documento requerido"),
      numdocumento: Yup.string().max(255).required("Número de documento"),
      nombres: Yup.string().max(255).required("Nombre requerido"),
      apepat: Yup.string().max(255).required("Apellido paterno requerido"),
      apemat: Yup.string().max(255).required("Apellido materno requerido"),
      correo: Yup.string()
        .email("Debe ser un correo válido :)")
        .max(255)
        .required("Correo es requerido"),
      celular: Yup.string().max(255).required("Númwero de celular requerido"),
      clave: Yup.string().max(255).required("Contraseña requerida"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values));
      //Router.push("/").catch(console.error);
      handleLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:8088/v2/api/usuario",
        data: values,
      });
      handleLoading(false);
      resetForm();
      onClose();
      setAlertMessage("Usuario Registrado");
      setShowSnackbar(true);
      console.log("AXIOS RESPONSE->", response.data);
    },
  });

  return (
    <>
      <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="md">
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 2 }}>
                <Typography color="textPrimary" variant="h4">
                  Crear Cuenta
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    name="tipoDocumento"
                    select
                    fullWidth
                    margin="dense"
                    label="Tipo de documento"
                    value={formik.values.tipoDocumento}
                    onChange={formik.handleChange}
                    error={formik.touched.tipoDocumento && Boolean(formik.errors.tipoDocumento)}
                    helperText={formik.touched.tipoDocumento && formik.errors.tipoDocumento}
                  >
                    <MenuItem value={""}>Seleccione un tipo de documento</MenuItem>
                    <MenuItem value="CE">Carnet Extranjería</MenuItem>
                    <MenuItem value="DNI">DNI</MenuItem>
                    <MenuItem value="PS">Pasaporte</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.numdocumento && formik.errors.numdocumento)}
                    fullWidth
                    helperText={formik.touched.numdocumento && formik.errors.numdocumento}
                    label="Número de documento"
                    margin="dense"
                    name="numdocumento"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.numdocumento}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.nombres && formik.errors.nombres)}
                    fullWidth
                    helperText={formik.touched.nombres && formik.errors.nombres}
                    label="Nombres"
                    margin="dense"
                    name="nombres"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.nombres}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.apepat && formik.errors.apepat)}
                    fullWidth
                    helperText={formik.touched.apepat && formik.errors.apepat}
                    label="Apellido paterno"
                    margin="dense"
                    name="apepat"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.apepat}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.apemat && formik.errors.apemat)}
                    fullWidth
                    helperText={formik.touched.apemat && formik.errors.apemat}
                    label="Apellido materno"
                    margin="dense"
                    name="apemat"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.apemat}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.correo && formik.errors.correo)}
                    fullWidth
                    helperText={formik.touched.correo && formik.errors.correo}
                    label="Correo"
                    margin="dense"
                    name="correo"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.correo}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.celular && formik.errors.celular)}
                    fullWidth
                    helperText={formik.touched.celular && formik.errors.celular}
                    label="Celular"
                    margin="dense"
                    name="celular"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    value={formik.values.celular}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={Boolean(formik.touched.clave && formik.errors.clave)}
                    fullWidth
                    helperText={formik.touched.clave && formik.errors.clave}
                    label="Clave"
                    margin="dense"
                    name="clave"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.clave}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                }}
              ></Box>

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  //disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Registrar
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};

export default DialogRegister;
