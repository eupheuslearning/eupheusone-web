import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useFormik } from "formik";

import Cookies from "js-cookie";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import SearchDropDown from "../Components/SearchDropDown";
import BasicTextFields from "../Components/Material/TextField";
import { Backdrop, CircularProgress } from "@mui/material";
import instance from "../Instance";
// import ControlledSearchDropDown from "../Components/Material/ControlledSearchDropDown";
import Snackbars from "../Components/Material/SnackBar";
import validateEmail from "../util/validateEmail";

const AddSchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState(null);
  const [category, setCategory] = useState(null);
  const [values, setValues] = useState({ stateId: "" });
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [represen, setRepresen] = useState([]);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const sidebarRef = useRef();
  const snackbarRef = useRef();

  const show = null;

  const formik = useFormik({
    initialValues: {
      userId: "",
      school_name: "",
      aff_code: "",
      board: "",
      category: "",
      name: "",
      email: "",
      phone: "",
      web: "",
      designation: "",
      state: "",
      city: "",
      address: "",
      pin_code: "",
    },

    validate: () => {
      const errors = {};
      if (userType === "sales_coordinator") {
        if (!formik.values.userId) {
          errors.userId = "Required";
        }
      }
      if (!formik.values.school_name) {
        errors.school_name = "Required";
      }

      if (!formik.values.board) {
        errors.school_name = "Required";
      }
      if (!formik.values.category) {
        errors.school_name = "Required";
      }

      if (!formik.values.state) {
        errors.school_name = "Required";
      }
      if (!formik.values.city) {
        errors.school_name = "Required";
      }
      if (!formik.values.address) {
        errors.school_name = "Required";
      }
      if (!formik.values.pin_code) {
        errors.school_name = "Required";
      }
      console.log(errors);
      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      let data = {
        school_name: formik.values.school_name,
        // aff_code: formik.values.aff_code,
        board: formik.values.board,
        category: formik.values.category,
        status: false,
        pName: formik.values.name,
        pEmail: formik.values.email,
        pPhone: formik.values.phone,
        // web: formik.values.web,
        designation: formik.values.designation,
        state: formik.values.state,
        city: formik.values.city,
        pin: formik.values.pin_code,
        address: formik.values.address,
      };
      if (formik.values.userId) {
        data["userId"] = formik.values.userId;
      }
      if (formik.values.aff_code) {
        data["aff_code"] = formik.values.aff_code;
      }
      if (formik.values.web) {
        data["web"] = formik.values.web;
      }
      console.log(data);
      let url = "";
      if (userType === "sales_coordinator") {
        url = "school/admin/create";
      } else {
        url = "school/create";
      }
      const res = await instance({
        url,
        method: "POST",
        data: data,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => {
        setLoading(false);
      });
      // console.log(res.data)
      if (res.data.status === "success") {
        setSnackbarErrStatus(false);
        setErrMessage(res.data.message);
        snackbarRef.current.openSnackbar();
        setTimeout(() => {
          window.scroll({
            top: 0,
            // behavior: "smooth",
          });
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }, 1500);
      }

      setLoading(false);
    },
  });

  const calActiceStep = () => {
    if (steps.step1) {
      return 0;
    }
    if (steps.step2) {
      return 1;
    }
    if (steps.step3) {
      return 2;
    }
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      // step 1
      case "select_represent":
        formik.values.userId = value?.fk_user?.id;
      case "board_name_addschool":
        formik.values.board = value.id;
        break;
      case "category_addschool":
        formik.values.category = value.id;
        break;
      case "Enter School Name *":
        formik.values.school_name = value;
        break;
      case "Enter Affiliate Code":
        formik.values.aff_code = value;
        break;
      // step 2
      case "Enter Name *":
        formik.values.name = value;
        break;
      case "Enter Email *":
        formik.values.email = value;
        break;
      case "Enter Phone *":
        formik.values.phone = value;
        break;
      case "Enter Website":
        formik.values.web = value;
        break;
      case "Enter Designation *":
        formik.values.designation = value;
        break;
      // step 3
      case "select_state":
        // console.log(value);
        formik.values.state = value.fk_state_id;
        setValues({ stateId: value.fk_state_id });
        getCityByState(value.fk_state_id);
        break;
      case "state_manageSchool":
        console.log(value);
        formik.values.state = value?.id;
        setValues({ stateId: value?.id });
        getCityByState(value?.id);
        break;
      case "select_city":
        formik.values.city = value.id;
        break;
      case "Enter Address *":
        formik.values.address = value;
        break;
      case "Enter Pin Code *":
        formik.values.pin_code = value;
        break;
      default:
        break;
    }
    // console.log(formik.values)
  };
  const userType = Cookies.get("type");

  useLayoutEffect(() => {
    const getBoards = async () => {
      const boards = await instance({
        url: "school/board/get/findAll",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setBoards(boards.data.message);
    };
    const getCategory = async () => {
      const category = await instance({
        url: "school/category/get/findAll",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setCategory(category.data.message);
    };

    let stateUrl;

    if (userType === "sales_coordinator") {
      stateUrl = "location/state/get/allStates";
    } else {
      stateUrl = "location/state/get/states";
    }
    const getState = async () => {
      const state = await instance({
        url: stateUrl,
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      // console.log(state.data);
      setState(state.data.message);
    };

    const getAllUser = async () => {
      const allUsers = await instance({
        url: "user/getAllUsersManageSchool",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setRepresen(allUsers.data.message);
    };
    getBoards();
    getCategory();
    getState();
    if (userType === "sales_coordinator") {
      getAllUser();
    }
  }, []);

  const navInfo = {
    title: "Add New School",
    details: ["Home", "/New School"],
  };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  const getCityByState = async (id) => {
    setLoading(true);
    const city = await instance({
      url: `location/city/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setCity(city.data.message);
    setLoading(false);
  };

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Add New School
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                // steps={["Basic Details", "Contact Details", "Address Details"]}
                steps={["", "", ""]}
              />
              {/* step 1 */}
              {steps.step1 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-2 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    {userType === "sales_coordinator" ? (
                      <SearchDropDown
                        label={"Select User *"}
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        color={"rgb(243, 244, 246)"}
                        data={represen}
                        Name="select_represent"
                      />
                    ) : null}
                    <BasicTextFields
                      lable={"Enter School Name *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Affiliate Code"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />

                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      Name={"board_name_addschool"}
                      Initialvalue={formik.values.board}
                      label={"Select Board *"}
                      data={boards}
                      color={"rgb(243, 244, 246)"}
                    />
                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      Name={"category_addschool"}
                      Initialvalue={formik.values.category}
                      data={category}
                      label={"Select Category *"}
                      color={"rgb(243, 244, 246)"}
                    />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => {
                      if (
                        (userType === "sales_coordinator"
                          ? formik.values.userId
                          : true) &&
                        formik.values.school_name &&
                        formik.values.board &&
                        formik.values.category &&
                        (formik.values.aff_code
                          ? formik.values.aff_code.length >= 2 &&
                            formik.values.aff_code.length <= 10
                          : true)
                      ) {
                        setSteps({ step1: false, step2: true, step3: false });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        let error = "Please Fill All The Fields";
                        if (
                          formik.values.aff_code &&
                          !(
                            formik.values.aff_code.length >= 2 &&
                            formik.values.aff_code.length <= 10
                          )
                        ) {
                          error =
                            "Affiliate Code must be between 2 to 10 characters";
                        }
                        setSnackbarErrStatus(true);
                        setErrMessage(error);
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 2 */}
              {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-5 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <BasicTextFields
                      lable={"Enter Name *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Email *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Phone *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"Enter Website"}
                      variant={"standard"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Designation *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>

                  <div
                    onClick={() => {
                      if (
                        formik.values.name &&
                        formik.values.phone &&
                        formik.values.phone.length === 10 &&
                        validateEmail(formik.values.email) &&
                        formik.values.designation
                      ) {
                        setSteps({ step1: false, step2: false, step3: true });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      } else {
                        let error = "Please Fill All The Fields With * mark";
                        if (!validateEmail(formik.values.email)) {
                          error = "Please Enter Valid Email";
                        }
                        if (formik.values.phone.length !== 10) {
                          error = "Please Enter Valid Phone Number";
                        }

                        setSnackbarErrStatus(true);
                        setErrMessage(error);
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 3 */}
              {steps.step3 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    {userType === "sales_coordinator" ? (
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        label={"Select State *"}
                        data={state}
                        Name={"state_manageSchool"}
                        color={"rgb(243, 244, 246)"}
                      />
                    ) : (
                      <SearchDropDown
                        handleOrderProcessingForm={handleOrderProcessingForm}
                        label={"Select State *"}
                        data={state}
                        Name={"select_state"}
                        color={"rgb(243, 244, 246)"}
                      />
                    )}
                    <SearchDropDown
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      label={"Select City *"}
                      Name={"select_city"}
                      data={city}
                      disable={!values.stateId}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      lable={"Enter Address *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Enter Pin Code *"}
                      handleOrderProcessingForm={handleOrderProcessingForm}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                  </div>

                  <div
                    className="mt-3"
                    onClick={() => {
                      if (
                        formik.values.state &&
                        formik.values.city &&
                        formik.values.address &&
                        formik.values.pin_code &&
                        formik.values.pin_code.length === 6
                      ) {
                        formik.handleSubmit();
                      } else {
                        let error = "Please Fill All The Fields";
                        if (formik.values.pin_code.length !== 6) {
                          error = "Please Enter Valid Pin Code";
                        }
                        setSnackbarErrStatus(true);
                        setErrMessage(error);
                        snackbarRef.current.openSnackbar();
                      }
                    }}
                  >
                    <BasicButton text={"Add School"} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSchool;
