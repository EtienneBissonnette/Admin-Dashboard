import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import SideBar from "components/SideBar";
import { useGetUserQuery } from "state/api";
import { useSelector, useDispatch } from "react-redux";

function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);

  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <SideBar
        user={data || {}}
        drawerWidth="250px"
        isNonMobile={isNonMobile}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      ></SideBar>
      <Box flexGrow={1}>
        <Navbar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          user={data || {}}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
