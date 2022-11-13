import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const CustomerListToolbar = (props) => {
  const [value, setValue] = useState(dayjs());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -2,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Reservas Deportivas
        </Typography>
        <Box sx={{ m: 1 }}></Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: "100%", display:'flex' }} >
              <DesktopDatePicker
                label="Fecha de Reserva"
                inputFormat="MM/dd/yyyy"
                value={value}
                
                onChange={handleChange}
                renderInput={(params) => <TextField sx={{ marginRight: "50px" }} {...params} />}
              />
              <Button color="primary" variant="contained" >
                Reservar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
