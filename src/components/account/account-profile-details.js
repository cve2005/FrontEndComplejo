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
  const { usuario } = props;

  const [showChangePass, setShowChangePass] = useState(false);

  useEffect(() => {
    console.log("!!USUARIO", props);
    formik.setFieldValue("numdocumento", usuario.numeroDocumento);
    formik.setFieldValue("tipoDocumento", usuario.tipoDocumento);
    formik.setFieldValue("celular", usuario.celular);
    formik.setFieldValue("nombre", usuario.nombre);
    formik.setFieldValue("apePaterno", usuario.apePaterno);
    formik.setFieldValue("apeMaterno", usuario.apeMaterno);
    formik.setFieldValue("correo", usuario.correo);
  }, [usuario]);

  const formik = useFormik({
    initialValues: {
      numdocumento: "",
      tipoDocumento: "",
      celular: "",
      nombre: "",
      apePaterno: "",
      apeMaterno: "",
      correo: "",
      clave: "",
      reclave:""
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Debe ser un correo válido :)")
        .max(255)
        .required("Correo es requerido"),
      clave: Yup.string().max(255).required("Contraseña requerida"),
      reclave: Yup.string()
      .oneOf([Yup.ref('clave'), null], 'La contraseña no coincide')
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(JSON.stringify(values));
      //Router.push("/").catch(console.error);
      //handleLoading(true);
      const id = sessionStorage.getItem("id");
      const response = await axios({
        method: "post",
        url: "http://localhost:8088/v2/api/usuario/act",
        data: {
          ...values,
          codigo:id
        },
      });
     // handleLoading(false);
      //resetForm();
      //onClose();
      //setAlertMessage("Usuario Registrado");
      //setShowSnackbar(true);
      console.log("AXIOS RESPONSE->", response.data);
    },
  });

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit} {...props}>
      <Card>
        <CardHeader title="Datos de la cuenta" sx={{ py: 0.5 }} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tipo de Documento"
                margin="dense"
                name="tipoDocumento"
                disabled
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
                value={formik.values.nombre}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellido Paterno"
                margin="dense"
                name="apepat"
                disabled
                value={formik.values.apePaterno}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellido Materno"
                margin="dense"
                name="apemat"
                disabled
                value={formik.values.apeMaterno}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Correo"
                margin="dense"
                name="correo"
                value={formik.values.correo}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Celular"
                margin="dense"
                name="celular"
                value={formik.values.celular}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                my: 1.65,
              }}
            >
              <Button variant="outlined" onClick={() => setShowChangePass(true)}>
                Cambiar Contraseña
              </Button>
            </Grid>

            <Grid item md={6} xs={12}>
              {showChangePass && <TextField
               error={Boolean(formik.touched.clave && formik.errors.clave)}
               helperText={formik.touched.clave && formik.errors.clave}
                fullWidth
                label="Nueva contraseña"
                margin="dense"
                name="clave"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.clave}
              />}
            </Grid>
            <Grid item md={6} xs={12}>
            {showChangePass && <TextField
            error={Boolean(formik.touched.reclave && formik.errors.reclave)}
            helperText={formik.touched.reclave && formik.errors.reclave}
                fullWidth
                label="Repetir contraseña"
                margin="dense"
                name="reclave"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.reclave}
              />}
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
          <Button color="primary" variant="contained"  disabled={formik.isSubmitting}  type="submit">
            Guardar Cambios
          </Button>
        </Box>
      </Card>
    </form>
  );
};
