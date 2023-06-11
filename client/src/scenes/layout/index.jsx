import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import SideBar from "components/SideBar";

function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <SideBar
        drawerWidth="250px"
        isNonMobile={isNonMobile}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      >
      </SideBar>
      <Box>
        <Navbar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
