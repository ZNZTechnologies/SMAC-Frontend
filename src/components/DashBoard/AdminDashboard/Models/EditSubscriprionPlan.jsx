import React, { useEffect, useState } from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Typography, Dialog, IconButton } from "@mui/material";
import TextInput from "../../../globalComponents/global_inputs/TextInput";
// import useFetch from "../../../../features/hooks/useFetch";
import ButtonComp from "../../../globalComponents/ButtonComp";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ImageComp from "../../../globalComponents/ImageComp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useImagePreview } from "../../../../features/hooks/useImagePreview";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../../../../features/hooks/useFetch";
import { useSelector } from "react-redux";

const EditSubscriptionPlan = ({ isOpen, onClose }) => {
  let { subscritptionToEdit } = useSelector((state) => state.subscription);
  //   let sorted = subscritptionToEdit.plans.sort((a, b) =>
  //     a.title.localeCompare(b.title)
  //   );
  //   console.log({ ...subscritptionToEdit, plans: sorted }, "sorted");
  console.log(subscritptionToEdit);

  const [pricingIcon, setPricingIcon] = useState(null);
  const [imageError, setImageError] = useState("");
  const [additionalBenefits, setAdditionalBenefits] = useState([]);
  const pricingIconRef = React.useRef(null);
  const addPricingIconPreview = useImagePreview(pricingIcon);
  const { loading, postData, putData } = useFetch();
  let monthly = null;
  //   subscritptionToEdit = subscritptionToEdit.plans.sort(
  //     (a, b) => a.price - b.price
  //   );
  let yearly = null;
  const getSeperatedPlans = () => {
    let plansData = subscritptionToEdit?.plans;
    for (let i = 0; i < plansData?.length; i++) {
      if (plansData[i].title === "Yearly") {
        yearly = plansData[i];
      } else if (plansData[i].title === "Monthly") {
        monthly = plansData[i];
      }
    }
  };
  const initialValues = {
    // Define your form initial values here
  };
  const itemBoxStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  const plan = {
    icon: "https://example.com/images/basic-plan.png",
    name: "Basic Plan",
    price: "$10/month",
    benefits: [
      "Access to basic features",
      "Email support",
      "100 GB storage",
      "1 user license",
    ],
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Plan name is required"),
    monthlyPrice: Yup.string().required("Please enter monthly price"),
    // icon: Yup.mixed().test(
    //   "fileFormat",
    //   "Only WEBP and SVG files are allowed",
    //   (value) => {
    //     if (categoryPicPreview === null) {
    //       //console.log(value, "from upload post file valuve");
    //       !value || ["image/webp", "image/svg"].includes(value.type);
    //     } else {
    //       return true;
    //     }
    //   }
    // ),
  });
  const closeModel = () => {
    handleCategoryIconDelete();
    onClose();
  };

  const addingBenefit = () => {
    setAdditionalBenefits([...additionalBenefits, { id: "", title: "" }]); // Add a new empty input field
  };
  const handleBenefitChange = (value, index) => {
    console.log("onchange", value);
    const updatedBenefits = [...additionalBenefits];
    updatedBenefits[index] = value;
    setAdditionalBenefits(updatedBenefits); // Update the specific benefit
  };

  function extractBenefits(obj) {
    const benefitsArray = [];
    for (const key in obj) {
      console.log(obj[key]);
      if (key.startsWith("benefit") || key.startsWith("benefits")) {
        benefitsArray.push(obj[key]);
      }
    }
    return benefitsArray;
  }
  const onSubmit = (values, { resetForm }) => {
    const benefits = extractBenefits(values);
    let payload = {
      name: values.name,
      icon: pricingIcon,
      plans: [
        {
          title: "Monthly",
          price: values.monthlyPrice,
          coursesLimit: values.monthlyCourseLimit,
          productsLimit: values.monthlyProductsLimit,
          servicesLimit: values.monthlyServicesLimit,
        },
        {
          title: "Yearly",
          price: values.yearlyPrice,
          coursesLimit: values.yearlyCourseLimit,
          productsLimit: values.yearlyProductsLimit,
          servicesLimit: values.yearlyServicesLimit,
        },
      ],
      benefits,
    };
    //   putData(
    //     "/api/admin/subscription/create",
    //     payload,
    //     undefined,
    //     (res) => {
    //       if (res) {
    //         console.log("response", res);
    //         //   anyChanges((prev) => !prev);
    //         closeModel();
    //       }
    //     },
    //     addPricingIconPreview ? true : false
    //   );
    console.log(payload);
    //   closeModel();
    // Reset the form if needed
  };
  const handleCategoryIconChange = (e) => {
    let selectedImage = e.target.files[0];
    if (selectedImage) {
      // //console.log("post pic is selected");
      setPricingIcon(selectedImage);
      setImageError("");
    }
  };
  const handleCategoryIconDelete = (e) => {
    if (addPricingIconPreview) {
      // let newFilteredArray = [];
      // newFilteredArray = pricingIcon.filter((item) => item.name !== e.name);
      // setPricingIcon(newFilteredArray);
      setPricingIcon(null);
    }
  };
  useEffect(() => {
    getSeperatedPlans();
  }, [subscritptionToEdit]);
  return (
    <Dialog
      open={isOpen}
      onClose={closeModel}
      PaperProps={{
        sx: {
          borderRadius: "clamp(0.5rem, 1.79vw - 0.648rem, 1.5rem)",
          padding: "clamp(0.5rem, 1.79vw - 0.648rem, 1.5rem)",
          //   overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          border: " 0.66px solid #A9A9A9",
          background: " #FAF7F7",
          padding:
            "clamp(1.25rem, 0.435vw + 0.978rem, 1.5rem) clamp(1.25rem, 0.435vw + 0.978rem, 1.5rem) ",
          borderRadius: "clamp(0.25rem, 1.342vw - 0.611rem, 1rem)",
          width: "clamp(18.75rem, 55.928vw - 17.114rem, 50rem)",
          maxWidth: "381px",
          position: "relative",
        }}
      >
        <Formik
          initialValues={{
            name: subscritptionToEdit?.name,
            monthlyPrice: subscritptionToEdit?.plans[0]?.price,
            yearlyPrice: subscritptionToEdit?.plans[1]?.price,
            monthlyCourseLimit: subscritptionToEdit?.plans[0]?.coursesLimit,
            monthlyProductsLimit: subscritptionToEdit?.plans[0]?.productsLimit,
            monthlyServicesLimit: subscritptionToEdit?.plans[0]?.servicesLimit,
            yearlyCourseLimit: subscritptionToEdit?.plans[1]?.coursesLimit,
            yearlyProductsLimit: subscritptionToEdit?.plans[1]?.productsLimit,
            yearlyServicesLimit: subscritptionToEdit?.plans[1]?.servicesLimit,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          // style={{ height: "100%" }}
        >
          {({ setFieldValue }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Box>
                <Typography variant="bold20">Upload Plan Icon</Typography>

                <Box
                  sx={{
                    mt: "12px",
                    border: "1px dashed  #BABABA",
                    borderRadius: "0.75rem",
                    width: "161px",
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#F5F5F5",
                    position: "relative",
                  }}
                >
                  {(addPricingIconPreview || subscritptionToEdit.icon) && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <ImageComp
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "15px",
                            objectFit: "contain",
                          }}
                          src={
                            !addPricingIconPreview && subscritptionToEdit.icon
                              ? subscritptionToEdit.icon
                              : addPricingIconPreview
                          }
                        />
                      </Box>
                      {!addPricingIconPreview &&
                      subscritptionToEdit.icon ? null : (
                        <IconButton
                          onClick={(e) => handleCategoryIconDelete(e)}
                          sx={{
                            position: "absolute",
                            top: -12,
                            right: "20px",
                            background: "white",
                            width: "24px",
                            height: "24px",
                            border: "1px solid #D3D3D3",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <CloseIcon
                            sx={{
                              color: "black",
                              height: "22px",
                              width: "22px",
                            }}
                          />
                        </IconButton>
                      )}
                    </>
                  )}
                  <label
                    htmlFor="postImg-upload"
                    style={{
                      width: "100%",
                    }}
                  >
                    <input
                      ref={pricingIconRef}
                      type="file"
                      name="icon"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="postImg-upload"
                      onChange={(e) => {
                        handleCategoryIconChange(e);
                        setFieldValue("pricingIcon", e.target.files[0]);
                      }}
                    />{" "}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <CloudUploadOutlinedIcon
                        sx={{
                          color: "#868686",
                          width: "18px",
                          height: "18px",
                        }}
                      />
                      <Typography
                        variant="uploadForm"
                        component={"div"}
                        sx={{ textAlign: "center", fontSize: "9px" }}
                      >
                        Add Your Image
                      </Typography>
                    </Box>
                  </label>
                </Box>
                {imageError && (
                  <Box
                    sx={{
                      mt: "12px",
                      background: "#D94A4430",
                      width: "100%",
                      padding: "8px",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WarningAmberIcon
                      sx={{
                        color: "red",
                        fontSize: "22px",
                        padding: "0px 8px 0px 0px",
                      }}
                    />
                    <Typography
                      sx={{ color: "red", fontSize: "12px", padding: "0px" }}
                    >
                      {imageError}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Plan Name</Typography>
                <Field
                  component={TextInput}
                  placeholder={plan?.name}
                  type="text"
                  name="name"
                  label="name"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Monthly Price</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Monthly Price"}
                  type="number"
                  name="monthlyPrice"
                  label="monthlyPrice"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Yearly Price</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Yearly Price"}
                  type="number"
                  name="yearlyPrice"
                  label="yearlyPrice"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Monthly Courses Limit</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Monthly Courses Limit"}
                  type="number"
                  name="monthlyCourseLimit"
                  label="monthlyCourseLimit"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Yearly Courses Limit</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Yearly Courses Limit"}
                  type="number"
                  name="yearlyCourseLimit"
                  label="yearlyCourseLimit"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Monthly Products Limit</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Monthly Products Limit"}
                  type="number"
                  name="monthlyProductsLimit"
                  label="monthlyProductsLimit"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Yearly Products Limit</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Yearly Products Limit"}
                  type="number"
                  name="yearlyProductsLimit"
                  label="yearlyProductsLimit"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Monthly Services Limit</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Monthly Services Limit"}
                  type="number"
                  name="monthlyServicesLimit"
                  label="monthlyServicesLimit"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Yearly Services Limit</Typography>
                <Field
                  component={TextInput}
                  placeholder={"Enter Yearly Services Limit"}
                  type="number"
                  name="yearlyServicesLimit"
                  label="yearlyServicesLimit"
                />
              </Box>
              <Box sx={itemBoxStyles}>
                <Typography variant="bold20">Plan Benefits</Typography>
                <Box sx={{ ...itemBoxStyles, gap: "6px" }}>
                  {subscritptionToEdit?.benefits.map((benefit, index) => {
                    return (
                      <Field
                        component={TextInput}
                        placeholder={benefit.title}
                        type="text"
                        name={`benefit_${index}`}
                        label="name"
                        defaultValue={benefit.title}
                        key={index}
                      />
                    );
                  })}{" "}
                  {additionalBenefits.map((benefit, index) => (
                    <Field
                      component={TextInput}
                      placeholder="Enter additional benefit"
                      type="text"
                      name={`benefits_${index}`}
                      key={`additional_${index}`}
                      value={benefit.title}
                      onChange={(e) =>
                        handleBenefitChange(e.target.value, index)
                      }
                    />
                  ))}
                  <ButtonComp
                    label={"Add Additional Benefit"}
                    click={addingBenefit}
                    customStyles={{
                      background: "#F5F5F5",
                      color: "#000",
                      border: "0.66px solid #BABABA",
                    }}
                  />
                  <ButtonComp
                    label={"save"}
                    type={"submit"}
                    disabled={loading}
                  />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default EditSubscriptionPlan;
