import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, Toolbar } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/system";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Snackbars from "../Components/Material/SnackBar";
import CircularStatic from "../Components/Material/ProgressBar";

const ViewCustomerLedger = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("printpdf");
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState("");
  const [type, setType] = useState("");
  const sidebarRef = useRef();
  const [customer, setCustomer] = useState([]);
  const [bpCode, setBpCode] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const navigate = useNavigate();
  const snackbarRef = useRef();
  const [users, setUsers] = useState([]);
  const [progLoading, setProgLoading] = useState(false);
  const [prog, setProg] = useState(0);

  let Admin = Cookies.get("type") === "admin";
  let userId = "";
  const navInfo = {
    title: "Doc Print",
    details: ["Home", " / Doc Print", "/ Ledger"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };
  const getUsers = async () => {
    const res = await instance({
      url: "user/getAllusers",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setUsers(res.data.message);
  };

  useEffect(() => {
    getCustomers();
    if (Admin) {
      getUsers();
    }
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

  const getCustomers = async () => {
    const type = Cookies.get("type");
    let url = "sales_data/get_all_bps";
    if (type === "SM") {
      url = "sales_data/get_all_sm_bps";
    } else if (type === "admin") {
      url = `user/admin/get/customers/${userId}`;
    }
    const res = await instance({
      url,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setCustomer(res.data.message);
  };

  const handlePDF = async () => {
    if (!startDate || !endDate || !bpCode) alert("All fields are needed");
    let strtMonth = startDate.$M + 1;
    if (strtMonth < 10) strtMonth = `0${strtMonth}`;
    let strtDay = startDate.$D;
    if (strtDay < 10) strtDay = `0${strtDay}`;
    let strtYr = startDate.$y;
    let strtDte = `${strtYr}-${strtMonth}-${strtDay}`;

    let endMonth = endDate.$M + 1;
    if (endMonth < 10) endMonth = `0${endMonth}`;
    let endDay = endDate.$D;
    if (endDay < 10) endDay = `0${endDay}`;
    let endYr = endDate.$y;
    let endDte = `${endYr}-${endMonth}-${endDay}`;

    console.log("startDate= ", strtDte);
    console.log("endDate= ", endDte);
    console.log("bpCode= ", bpCode);

    let postdata = {
      bpcode: bpCode,
      todate: endDte,
      fromdate: strtDte,
    };
    setProgLoading(true);
    const i = setInterval(() => {
      if (prog < 99) {
        setProg((prev) => {
          if (prev < 99) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      }
    }, 1000);
    const res = await instance({
      url: `doc_print/ledger/getpdf`,
      method: "post",
      data: postdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    clearInterval(i);
    setProg(100);
    let downloadUrl = res.data.message;
    if (res.data.message === "No Data found") {
      setErrMessage("No Data found");
      snackbarRef.current.openSnackbar();
    } else if (res.data.status === "success") {
      setTimeout(async () => {
        // window.open(downloadUrl, "_blank");
        const response = await fetch(downloadUrl);
        const pdfData = await response.arrayBuffer();
        const blob = new Blob([pdfData], { type: "application/pdf" });
        const objectUrl = URL.createObjectURL(blob);
        window.open(objectUrl, "_blank");
      }, 1500);
    }
    setTimeout(() => {
      setProgLoading(false);
      setProg(0);
    }, 1000);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        setStateId(value.id);

        break;
      case "select_state_training":
        setStateId(value.id);

        break;
      case "invoice_pdf_data":
        console.log(value);
        setBpCode(value.bp_code);

        break;
      case "select_type":
        setType(value.types);
        break;
      case "get_all_user":
        userId = value.id;
        getCustomers();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex bg-[#111322]">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progLoading}
      >
        <CircularStatic progress={prog} />
      </Backdrop>
      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          highLight={highLight}
          // show={show}
        />
      </div>

      <div
        className={`flex flex-col w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[60vw]"
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
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="py-10 grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 mt-6 gap-6 rounded-md bg-slate-600">
              {Admin ? (
                <div className="flex flex-col gap-2 w-full md:w-[30vw]">
                  <SearchDropDown
                    label={"Select User"}
                    handleOrderProcessingForm={handleOrderProcessingForm}
                    color={"rgb(243, 244, 246)"}
                    data={users}
                    Name="get_all_user"
                  />
                </div>
              ) : null}
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <SearchDropDown
                  label={"Select Customer"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={customer}
                  Name="invoice_pdf_data"
                />
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[15vw]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Select Start Date"
                      inputFormat="MM/DD/YYYY"
                      value={startDate}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-[15vw]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Select End Date"
                      inputFormat="MM/DD/YYYY"
                      value={endDate}
                      onChange={handleEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>

              <div className="sm:w-auto w-[50vw]" onClick={handlePDF}>
                <BasicButton text={"View"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerLedger;
