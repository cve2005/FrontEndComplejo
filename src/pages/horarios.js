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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';

const Page = () => {
  const [ubicacion, setUbicacion] = useState(10);
    
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));


  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Gestión de Horarios</title>
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
            Gestión de Horarios
          </Typography>

          <Grid sx={{ textAlign: "center" }} container spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <FormControl style={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">Seleccionar Disciplina</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ width: "500" }}
                  value={ubicacion}
                  label="Seleccione Disciplina"
                >
                  <MenuItem value={10}>Football</MenuItem>
                  <MenuItem value={20}>Volley</MenuItem>
                  <MenuItem value={30}>Basket</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <TimePicker
                label="Hora de Inicio"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
             
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
            <TimePicker
                label="Hora de Fin"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
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
