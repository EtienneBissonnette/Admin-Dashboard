import React from "react";
import { Box } from "@mui/material";
import BreakdownChart from "components/BreakdownChart";
import Header from "components/Header";

const Breakdown = () => {
  return (
    <Box margin="1.5rem 2.5rem">
      <Header
        title="BREAKDOWN"
        subtitle="Breakdown of sales by category"
      ></Header>
      <Box marginTop="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;
