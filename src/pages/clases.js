import Head from "next/head";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl
} from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { width } from "@mui/system";

const Page = () => {
  const [ubicacion, setUbicacion] = useState(10);

  return (
    <>
      <Head>
        <title>Gestión de Clases</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Gestión de Clases
          </Typography>

          <Grid sx={{ textAlign: "center" }} container spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <TextField label="Nombre" name="nombre" variant="filled" value="" style={{ minWidth: 300 }}/>
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <TextField label="Cupos" name="cupos" variant="filled" value="" style={{ minWidth: 300 }} />
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <FormControl style={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">Ubicación</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ width: "500" }}
                  value={ubicacion}
                  label="Ubicación"
                >
                  <MenuItem value={10}>Complejo01</MenuItem>
                  <MenuItem value={20}>Complejo02</MenuItem>
                  <MenuItem value={30}>Complejo03</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4} md={6} sm={6} />
            <Grid item lg={2} md={6} xs={12}>
              <Button variant="contained">Registrar</Button>
            </Grid>
            <Grid item lg={2} md={6} xs={12}>
              <Button variant="contained">Limpiar</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
