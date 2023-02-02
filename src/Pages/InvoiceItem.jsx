import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link, useParams } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

const InvoiceItem = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [items, setItems] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [address, setAddress] = useState({});

  const navInfo = {
    title: "Invoice Item",
    details: ["Home", " / Invoice Item"],
  };

  const Tablecolumns = [
    // { field: "SlNo", headerName: "Sl No", width: 100 },
    {
      field: "itemcode",
      headerName: "Invoice No",
      width: 200,
    },
    {
      field: "itemdescription",
      headerName: "Item Name",
      width: 500,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "price",
      headerName: "Unit Price",
      width: 150,
    },
    // {
    //   field: "TotalPrice",
    //   headerName: "Total Price",
    //   width: 130,
    // },
  ];

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    getInvoiceDetails();
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

  // const getSchool = async (stateId, cityId) => {
  //   setLoading(true);
  //   const res = await instance({
  //     url: `school/${stateId}/${cityId}`,
  //     method: "GET",
  //     headers: {
  //       Authorization: `${Cookies.get("accessToken")}`,
  //     },
  //   });
  //   console.log(res.data.message);
  //   const rows = res.data.message.map((item, index) => {
  //     return {
  //       id: item.id,
  //       SchoolName: item.school_name,
  //       State: item.school_addresses[0].fk_state.state,
  //       Address: item.school_addresses[0].address,
  //     };
  //   });
  //   setSchoolRow(rows);
  //   setLoading(false);
  // };

  const getSchoolByState = async (id) => {
    setLoading(true);

    const res = await instance({
      url: `school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    // setSchoolRow(rows);
    setLoading(false);
  };

  const handleOrderProcessingForm = async (value, type) => {
    switch (type) {
      case "select_state":
        // getCity(value.fk_state_id);
        getSchoolByState(value.fk_state_id);
        setStateAndCity({ ...stateAndCity, state: value.fk_state_id });
        break;
      case "select_city":
        setStateAndCity({ ...stateAndCity, city: value.id });
        break;
      default:
        break;
    }
  };

  let { invoiceid } = useParams();

  const getInvoiceDetails = async () => {
    setLoading(true);
    const res = await instance({
      url: `eup_invoice/geteupinvoices/${invoiceid}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message[0].eup_invoice_addresses[0]);
    setItems(res.data.message[0].eup_invoice_items);
    setAddress(res.data.message[0].eup_invoice_addresses[0]);
    // console.log(invoiceid);
    // setCity(res.data.message);
    // console.log(address)
    setLoading(false);
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
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[0vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="flex flex-col gap-4 items-start w-full px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
              <h1 className="text-gray-100 md:text-xl text-base font-semibold">
                Shipping Details
              </h1>
              <div className="!text-gray-600 !sm:text-base !text-sm grid sm:grid-cols-1 grid-cols-1 sm:gap-8 gap-6 w-full">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid xs={2} sm={6} md={6}>
                      <TextField
                        className="!w-full"
                        label="Bill From"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={" "}
                        value={address.BillFromName}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                    <Grid xs={2} sm={6} md={6}>
                      <TextField
                        className="!w-full"
                        label="Bill To"
                        variant="standard"
                        type={"text"}
                        disabled={false}
                        defaultValue={" "}
                        value={address.BillToName}
                        InputLabelProps={{ style: { color: "white" } }}
                        inputProps={{ readOnly: true }}
                      />
                    </Grid>
                  </Grid>

                  <div className="mt-4">
                    <Grid container spacing={2}>
                      <Grid xs={12}>
                        <TextField
                          className="!w-full "
                          // id="outlined-multiline-static"
                          // multiline
                          label="Dispatch From"
                          variant="standard"
                          type={"text"}
                          disabled={false}
                          defaultValue={" "}
                          value={address.DispatchFromAddress1}
                          InputLabelProps={{ style: { color: "white" } }}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid xs={12}>
                        <TextField
                          className="!w-full"
                          // multiline
                          label="Ships To"
                          variant="standard"
                          type={"text"}
                          disabled={false}
                          defaultValue={" "}
                          value={address.ShipToAddress1}
                          InputLabelProps={{ style: { color: "white" } }}
                          inputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </div>
            </div>

            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead className="bg-slate-500">
                <TableRow>
                  <TableCell className="!w-[13rem]" align="center">
                    Invoice No
                  </TableCell>
                  <TableCell className="!w-[28rem]" align="center">
                    Item Name
                  </TableCell>
                  <TableCell className="!w-[8rem]" align="center">
                    Quantity
                  </TableCell>
                  <TableCell className="!w-[8rem]" align="center">
                    Unit Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-slate-200">
                {items.map((row) => (
                  <TableRow
                    key={row.series}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    <TableCell align="center">{row.itemcode}</TableCell>
                    <TableCell align="center">{row.itemdescription}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
