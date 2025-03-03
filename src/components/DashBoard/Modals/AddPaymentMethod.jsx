import { Box, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import theme from "../../../theme";
// import { Field, Formik, Form } from "formik";
// import * as Yup from "yup";
// import TextInput from "../../globalComponents/global_inputs/TextInput";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ButtonComp from "../../../components/globalComponents/ButtonComp";
import Cards from "react-credit-cards-2";
import {
  JazzCashIcon,
  VisaAndMasterCardIcon,
} from "../../globalComponents/constants.js";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import useFetch from "../../../features/hooks/useFetch.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CardPayment from "./CardPayment.jsx";
import WalletPayment from "./WalletPayment.jsx";
const AddPaymentMethod = ({
  isAddDetailsOpen,
  setIsAddDetailsOpen,
  url,
  item,
}) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    //console.log(newValue, "new value");
  };
  return (
    <>
      <Dialog
        sx={{
          // maxWidth: "828px",
          minWidth: "350x",
          margin: "0 auto",
          borderRadius: "12px",
        }}
        open={isAddDetailsOpen}
        onClose={() => setIsAddDetailsOpen(!isAddDetailsOpen)}
      >
        <Box
          sx={{ width: "100%", padding: "24px 12px", background: "#F9F9F9" }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                width: "100%",
                "@media (max-width:650px)": {
                  overflowX: "scroll",
                  "::-webkit-scrollbar": {
                    height: "5px",
                    background:
                      "transparent" /* Optional: Set the scrollbar background color to match the container */,
                  },
                },
              }}
            >
              <TabList onChange={handleChange} centered>
                <Tab icon={<VisaAndMasterCardIcon />} value="1" />
                <Tab icon={<JazzCashIcon />} value="2" />
              </TabList>
            </Box>
            <Box sx={{ width: "100%", maxWidth: "828px" }}>
              {value === "1" && (
                <TabPanel value="1">
                  <CardPayment
                    url={url}
                    item={item}
                    setIsAddDetailsOpen={setIsAddDetailsOpen}
                  />
                </TabPanel>
              )}
              {value === "2" && (
                <TabPanel value="2">
                  <WalletPayment
                    url={url}
                    item={item}
                    setIsAddDetailsOpen={setIsAddDetailsOpen}
                  />
                </TabPanel>
              )}
            </Box>
          </TabContext>
        </Box>
      </Dialog>
    </>
  );
};

export default AddPaymentMethod;
