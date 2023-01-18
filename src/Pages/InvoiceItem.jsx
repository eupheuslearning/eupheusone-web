import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
// import { Add } from '@mui/icons-material'
import { Link, useParams  } from "react-router-dom";
import DataTable from "../Components/DataTable";
// import { rows, ManageSchoolRows } from '../DummyData'
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../Components/Material/Button";
import { Backdrop, CircularProgress } from "@mui/material";

const InvoiceItem = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("invoice");
  const [loading, setLoading] = useState(false);
  const [stateAndCity, setStateAndCity] = useState({ state: "", city: "" });
  const sidebarRef = useRef();
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({ disable: true });
  const [schoolRow, setSchoolRow] = useState([]);

  const navInfo = {
    title: "Invoice Item",
    details: ["Home", " / Invoice Item"],
  };

  const Tablecolumns = [
    { field: "SlNo", headerName: "Sl No", width: 100 },
    {
      field: "InvoiceNo",
      headerName: "Invoice No",
      width: 200,
    },
    {
      field: "ItemName",
      headerName: "Item Name",
      width: 300,
    },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "UnitPrice",
      headerName: "Unit Price",
      width: 150,
    },
      {
        field: "TotalPrice",
        headerName: "Total Price",
        width: 130,
      },
  ];

  let { userId } = useParams();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    getInvoiceDetails()
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

  const getSchool = async (stateId, cityId) => {
    setLoading(true);
    const res = await instance({
      url: `school/${stateId}/${cityId}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    console.log(res.data.message);
    const rows = res.data.message.map((item, index) => {
      return {
        id: item.id,
        SchoolName: item.school_name,
        State: item.school_addresses[0].fk_state.state,
        Address: item.school_addresses[0].address,
      };
    });
    setSchoolRow(rows);
    setLoading(false);
  };

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
    setSchoolRow(rows);
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

  const getInvoiceDetails = async () => {
    // setLoading(true);
    // const res = await instance({
    //   url: `eup_invoice/geteupinvoices//${121}`,
    //   method: "GET",
    //   headers: {
    //     Authorization: `${Cookies.get("accessToken")}`,
    //   },
    // });
    // console.log(res.data.message)
    console.log(userId)
    // setCity(res.data.message);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const getStates = async () => {
      const res = await instance({
        url: "location/state/get/states",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });

      setStates(res.data.message);
    };

    const getSchoolData = async () => {
      const res = await instance({
        url: "school/b4c27059-8c42-4d35-8fe7-8dedffbfe641/294de4f3-0977-4482-b0de-2cfeaa827ba4",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      console.log(res.data.message);
      const rows = res.data.message.map((item, index) => {
        return {
          id: item.id,
          SchoolName: item.school_name,
          State: item.school_addresses[0].fk_state.state,
          Address: item.school_addresses[0].address,
        };
      });
      setSchoolRow(rows);
    };
    getStates();

    getSchoolData();
  }, []);

  let tempData = [
    {
      id: 135,
      ItemName: "FirstName",
      SlNo: "1",
      InvoiceNo: "123",
      Quantity: "4",
      UnitPrice: "350",
      TotalPrice: "40000"
    },
    {
      id: 246,
      ItemName: "SecondName",
      SlNo: "8",
      InvoiceNo: "234",
      Quantity: "3",
      UnitPrice: "320",
      TotalPrice: "50000"
    },
    {
      id: 357,
      ItemName: "ThirdName",
      SlNo: "7",
      InvoiceNo: "345",
      Quantity: "14",
      UnitPrice: "1250",
      TotalPrice: "60000"
    },
    {
      id: 468,
      ItemName: "FourthName",
      SlNo: "6",
      InvoiceNo: "456",
      Quantity: "23",
      UnitPrice: "950",
      TotalPrice: "70000"
    },
    {
      id: 579,
      ItemName: "FifthName",
      SlNo: "5",
      InvoiceNo: "567",
      Quantity: "41",
      UnitPrice: "800",
      TotalPrice: "80000"
    },
    {
      id: 680,
      ItemName: "SixthName",
      SlNo: "4",
      InvoiceNo: "678",
      Quantity: "9",
      UnitPrice: "650",
      TotalPrice: "90000"
    },
    {
      id: 791,
      ItemName: "SeventhName",
      SlNo: "3",
      InvoiceNo: "789",
      Quantity: "6",
      UnitPrice: "100",
      TotalPrice: "20000"
    },
    {
      id: 802,
      ItemName: "EighthName",
      SlNo: "2",
      InvoiceNo: "890",
      Quantity: "18",
      UnitPrice: "300",
      TotalPrice: "10000"
    },
  ];



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
            {/* <div className="grid grid-cols-2 grid-rows-2 md:flex md:justify-around md:items-center px-6 mb-8 py-3 mt-6 gap-6 rounded-md bg-slate-600">
              <div className="flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">State</label>

                <SearchDropDown
                  label={"Select State"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  data={states}
                  Name="select_state"
                />
              </div>
              <div className=" flex flex-col gap-2 w-full md:w-[20vw]">
                <label className="text-gray-100">City</label>

                <SearchDropDown
                  label={"Select City"}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  color={"rgb(243, 244, 246)"}
                  disable={city.disable}
                  data={city}
                  Name="select_city"
                />
              </div> */}
            {/* <button className="w-full md:w-[20vw] col-span-2 md:ml-10 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10 bg-slate-500 transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md">
                Search School
              </button> */}
            {/* <div
                className="sm:w-auto w-[50vw]"
                onClick={() => {
                  if (stateAndCity.state && stateAndCity.city) {
                    getSchool(stateAndCity.state, stateAndCity.city);
                  }
                }}
              >
                <BasicButton text={"Search School"} />
              </div>
            </div>
            <div className="w-full flex gap-3 justify-end">
              <Link to="/addschool">
                <BasicButton text={"Create New School"} />
              </Link>
              <Link to="/tagging">
                <BasicButton text={"Tag Existing School"} />
              </Link>
            </div> */}

            <DataTable
              rows={tempData}
              checkbox={false}
              Tablecolumns={Tablecolumns}
              tableName="InvoiceItem"
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
