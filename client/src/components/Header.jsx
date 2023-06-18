import React from "react";
import { Box, useTheme, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ marginBottom: "5px" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary[300]}
        sx={{ marginBottom: "5px" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
