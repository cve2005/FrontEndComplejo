import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import axios from "axios";

import { useState, useEffect } from "react";

export const AccountProfile = (props) => {


  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(props.usuario.imagen);
  }, [props.usuario.imagen]);

  const handleLoadImage = (e) => {
    console.log(e.target.files[0]);
    var reader = new FileReader();
    let baseString;
    reader.onloadend = async function () {
      baseString = reader.result;
      console.log("!!!baseimage",baseString); 

      const id = sessionStorage.getItem("id");
      const response = await axios({
        method: "post",
        url: "http://localhost:8088/v2/api/usuario/imagen",
        data: {
          id,
          imgB64:baseString
        },
      });

      console.log(response);

    };
    reader.readAsDataURL(e.target.files[0]);

    const image = URL.createObjectURL(e.target.files[0])
    setSelectedImage(image);
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}

            src={selectedImage}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {props.usuario.nombre}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="inherit" fullWidth variant="contained" component="label">
          Subir Imagen
          <input type="file" hidden onChange={handleLoadImage} />
        </Button>
      </CardActions>
    </Card>
  );
};
