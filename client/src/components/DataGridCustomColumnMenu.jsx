import React from "react";
import {
  GridColumnMenu,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  console.log(props)
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuSortItem: null,
      }}
    />
  );
};

export default CustomColumnMenu;
