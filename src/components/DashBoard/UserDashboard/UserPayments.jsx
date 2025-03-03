import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";

import AddPaymentMethod from "../Modals/AddPaymentMethod";
import Layout from "./../../globalComponents/Layout/Layout";
import theme from "../../../theme";

const UserPayments = () => {
  const [isPaymentModelOpen, setIsPaymentModelOpen] = useState(false);
  const handleOpenPaymentModel = () => {
    setIsPaymentModelOpen(!isPaymentModelOpen);
  };
  return (
    <>
      <Layout styles={{ padding: "0", width: "100%" }}>
        <AddPaymentMethod
          isPaymentModelOpen={isPaymentModelOpen}
          onClose={handleOpenPaymentModel}
        />
        <Box
          sx={{
            // maxWidth: "1252px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "15px",
            height: "auto",
            width: "100%",
            // background: "lightgreen",
            [theme.breakpoints.down("md")]: {
              padding: "0px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "40px 20px 24px 20px",
            }}
          >
            <Typography variant="userDashboardHeading">Payments</Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "40px",
              [theme.breakpoints.down("md")]: {
                padding: "16px",
              },
            }}
            component={"div"}
          >
            <Button
              sx={{
                border: "2px dashed #D9D9D9",
                borderRadius: "6px",
                width: "300px",
              }}
              onClick={handleOpenPaymentModel}
            >
              + Add Payment Method
            </Button>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default UserPayments;
