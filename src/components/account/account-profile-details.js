import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export const AccountProfileDetails = (props) => {
  const {usuario} = props;

  useEffect(()=>{
    formik.setFieldValue("numdocumento",usuario.numeroDocumento);
    formik.setFieldValue("tipoDocumento","usuario.tipoDocumento");
  },[]);

  const formik = useFormik({
    initialValues: {
      numdocumento:"",
      tipoDocumento:""
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Debe ser un correo válido :)")
        .max(255)
        .required("Correo es requerido"),
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
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardHeader title="Datos de la cuenta" />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo de Documento"
                margin="dense"
                name="tipoDocumento"
                value={formik.values.tipoDocumento}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Número de documento"
                margin="dense"
                name="numdocumento"
                disabled
                value={formik.values.numdocumento}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nombres"
                margin="dense"
                name="nombres"
                disabled
                value={usuario.nombres}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellido Paterno"
                margin="dense"
                name="apepat"
                disabled
                value={usuario.apepat}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellido Materno"
                margin="dense"
                name="apemat"
                disabled
                value={usuario.apemat}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Correo"
                margin="dense"
                name="correo"
                disabled
                value={usuario.correo}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Celular"
                margin="dense"
                name="celular"
                value={usuario.celular}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                margin="dense"
                name="clave"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={usuario.clave}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Actualizar
          </Button>
        </Box>
      </Card>
    </form>
  );
};
