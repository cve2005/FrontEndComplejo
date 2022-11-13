import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [usuario, setUsuario] = useState({});

  const fetchUserData = async () => {
    const id = sessionStorage.getItem("id");
    const response = await axios({
      method: "get",
      url: `http://localhost:8088/v2/api/usuario/${id}`,
    });
    console.log(response.data.usuario);
    setUsuario(response.data.usuario);
    console.log("user",usuario);
  };

  useEffect(() => {
    fetchUserData();
    
  }, []);

  return (
    <>
      <Head>
        <title>Reservas Deportivas</title>
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
            Perfil
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile usuario={usuario}/>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails usuario={usuario} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
