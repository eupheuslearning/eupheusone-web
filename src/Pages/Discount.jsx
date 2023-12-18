import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Link, useLocation } from "react-router-dom";
import SearchDropDown from "../Components/SearchDropDown";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import instance from "../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Backdrop,
  Checkbox,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  StyledEngineProvider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import Step4 from "../Components/Aof/Step4";
import { Delete, ExpandMore } from "@mui/icons-material";
import RowRadioButtonsGroup from "../Components/Material/RowRadioButtonGroup";
import { useFormik } from "formik";
import BasicButton from "../Components/Material/Button";
import BasicTextFields from "../Components/Material/TextField";
import { ShowError, ShowSuccess } from "../util/showError";

const Discount = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("discount");
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef();
  const [step4, setStep4] = useState({
    tod: { applicable: false, type: false },
    special: { applicable: false, type: "" },
  });
  const [elt, setElt] = useState(false);
  const [nonElt, setNonElt] = useState(false);
  const [cashPer, setCashPer] = useState(false);
  const [publisherData, setPublisherData] = useState([]);
  const [allSchool, setAllSchool] = useState([]);
  const [bps, setBps] = useState([]);
  const [series, setSeries] = useState([]);
  const [tableSeries, setTableSeries] = useState([]);
  const [titles, setTitles] = useState([]);
  const [tableTitles, setTableTitles] = useState([]);
  const snackbarRef = useRef();

  const navInfo = {
    title: "Discount",
    details: ["Finance", " / Discount"],
  };

  const formik = useFormik({
    initialValues: {
      schoolInfo: null,
      customerInfo: null,
      TodApplicable: "no",
      cash: "no",
      cashPercentage: "5",
      //   defaultCash: "5",
      financialYear: "30ed31d6-88d6-48e9-821e-b2232f37d4fb",
      specialDiscountOnOverallBusiness: null,
      publishers: [],
      seriesData: [],
      titlesData: [],
      eltPercentage: null,
      nonEltPercentage: null,
    },
    validate: (values) => {
      let errors = {};
      if (values.schoolInfo === null) {
        errors.schoolInfo = "Select School";
      }
      if (values.customerInfo === null) {
        errors.customerInfo = "Select BP";
      }
      if (
        values.TodApplicable === "no" &&
        values.cash === "no" &&
        step4.special.applicable === false
      ) {
        errors.TodApplicable = "Select atleast one option";
      }

      if (values.cash === "yes" && !values.cashPercentage) {
        errors.cashPercentage = "Enter Cash Percentage";
      }
      if (
        step4.special.type === "overall" &&
        !values.specialDiscountOnOverallBusiness
      ) {
        errors.specialDiscountOnOverallBusiness = "Enter Special Discount";
      }
      if (elt && !values.eltPercentage) {
        errors.eltPercentage = "Enter ELT Percentage";
      }
      if (nonElt && !values.nonEltPercentage) {
        errors.nonEltPercentage = "Enter NON-ELT Percentage";
      }

      if (
        formik.values.publishers.length > 0 ||
        formik.values.seriesData.length > 0 ||
        formik.values.titlesData.length > 0
      ) {
        let error = false;
        if (values.publishers.length > 0) {
          for (let i = 0; i < formik.values.publishers.length; i++) {
            const item = formik.values.publishers[i];
            if (
              item.percentages === null ||
              item.percentages === "" ||
              item.percentages === 0
            ) {
              error = true;
              break;
            }
          }
        }
        if (values.seriesData.length > 0) {
          for (let i = 0; i < formik.values.seriesData.length; i++) {
            const item = formik.values.seriesData[i];
            if (
              item.percentages === null ||
              item.percentages === "" ||
              item.percentages === 0
            ) {
              error = true;
              break;
            }
          }
        }
        if (values.titlesData.length > 0) {
          for (let i = 0; i < formik.values.titlesData.length; i++) {
            const item = formik.values.titlesData[i];
            if (
              item.percentages === null ||
              item.percentages === "" ||
              item.percentages === 0
            ) {
              error = true;
              break;
            }
          }
        }
        if (error) {
          errors.specificDiscount = "Enter Specific Discount";
        }
      }

      if (Object.values(errors).length > 0) {
        ShowError(Object.values(errors)[0]);
      }

      return errors;
    },
    onSubmit: async (values) => {
      console.log(values);
      let data = {
        schoolCode: values.schoolInfo.school_code,
        bpCode: values.customerInfo.bp_code,
        fyId: values.financialYear,
        items: [],
      };

      if (values.TodApplicable === "yes") {
        data.items.push({
          discountType: "TOD",
        });
      }
      if (values.cash === "yes") {
        data.items.push({
          discountType: "CASH",
          percent: Number(values.cashPercentage),
          discountOn: "gross",
        });
      }
      if (values.eltPercentage) {
        data.items.push({
          discountType: "SPECIAL",
          discountSubType: "ELT", //Optional in case of TOD and CASH
          percent: Number(values.eltPercentage), //Optional in case of TOD
          discountOn: "gross", //Optional
        });
      }
      if (values.nonEltPercentage) {
        data.items.push({
          discountType: "SPECIAL",
          discountSubType: "NON-ELT", //Optional in case of TOD and CASH
          percent: Number(values.nonEltPercentage), //Optional in case of TOD
          discountOn: "gross", //Optional
        });
      }
      if (values.publishers.length > 0) {
        values.publishers.map((item) => {
          data.items.push({
            discountType: "SPECIAL",
            discountSubType: "Publisher",
            publisherName: item.bp_name,
            percent: Number(item.percentages),
            discountOn: "gross",
          });
        });
      }
      if (values.seriesData.length > 0) {
        values.seriesData.map((item) => {
          data.items.push({
            discountType: "SPECIAL",
            discountSubType: "Series",
            seriesId: item.id,
            percent: Number(item.percentages),
            discountOn: "gross",
          });
        });
      }
      if (values.titlesData.length > 0) {
        values.titlesData.map((item) => {
          data.items.push({
            discountType: "SPECIAL",
            discountSubType: "Item",
            itemCode: item.item_code,
            percent: Number(item.percentages),
            discountOn: "gross",
          });
        });
      }
      if (values.specialDiscountOnOverallBusiness) {
        data.items.push({
          discountType: "SPECIAL",
          discountSubType: "Overall",
          percent: Number(values.specialDiscountOnOverallBusiness),
          discountOn: "gross",
        });
      }
      setLoading(true);
      const res = await instance({
        url: "sales_data/aof/create/discount",
        method: "POST",
        data: data,
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }).catch((err) => {
        ShowError("Something went wrong, Please try again");
      });
      setLoading(false);

      if (res.data.status === "success") {
        ShowSuccess(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    },
  });

  const data = [
    { id: 1, bp_name: "Eupheus" },
    { id: 2, bp_name: "Allied" },
    { id: 3, bp_name: "Classklap" },
    { id: 4, bp_name: "Learning Links" },
  ];

  const handleRadioButtons = (type, value, defaultValue) => {
    console.log(type, value, defaultValue);
    switch (type) {
      case "tod applicable":
        formik.values.TodApplicable = value;
        break;

      case "special applicable":
        setStep4({
          ...step4,
          special: { applicable: value === "yes" ? true : false, type: "" },
        });

        break;
      case "elt":
        formik.values.eltPercentage = "";
        setElt(value);

        break;
      case "nonElt":
        formik.values.nonEltPercentage = "";
        setNonElt(value);

        break;
      case "special type":
        clearData();
        setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "cash":
        value === "yes" ? setCashPer(true) : setCashPer(false);
        formik.values.cashPercentage = "5";
        formik.values.cash = value;

        break;

      default:
        break;
    }
  };

  const discountForm = (value, field) => {
    switch (field) {
      case "Enter Percentage (special)":
        formik.values.specialDiscountOnOverallBusiness = value;
        break;
      case "publisher":
        if (value.length !== formik.values.publishers.length) {
          // modify publishers
          if (value.length > formik.values.publishers.length) {
            // add publishers

            value.map((item) => {
              let exist = false;
              formik.values.publishers.map((pub) => {
                if (pub.bp_name === item.bp_name) {
                  exist = true;
                }
              });
              if (exist === false) {
                formik.values.publishers.push({
                  bp_name: item.bp_name,
                  percentages: 0,
                });
              }
            });
          } else if (value.length < formik.values.publishers.length) {
            // remove publishers
            formik.values.publishers.map((pub, index) => {
              let exist = false;
              value.map((item) => {
                if (item.bp_name === pub.bp_name) {
                  exist = true;
                }
              });
              if (exist === false) {
                formik.values.publishers.splice(index, 1);
              }
            });
          }
        }

        setPublisherData(value);

        break;
      case "series_discount":
        if (value.length !== formik.values.seriesData.length) {
          // modify publishers
          if (value.length > formik.values.seriesData.length) {
            // add publishers

            value.map((item) => {
              let exist = false;
              formik.values.seriesData.map((series) => {
                if (series.id === item.id) {
                  exist = true;
                }
              });
              if (exist === false) {
                formik.values.seriesData.push({
                  ...item,
                  percentages: 0,
                });
              }
            });
          } else if (value.length < formik.values.seriesData.length) {
            // remove publishers
            formik.values.seriesData.map((series, index) => {
              let exist = false;
              value.map((item) => {
                if (item.id === series.id) {
                  exist = true;
                }
              });
              if (exist === false) {
                formik.values.seriesData.splice(index, 1);
              }
            });
          }
        }
        setTableSeries(value);
        break;
      case "titles_discount":
        if (value.length !== formik.values.titlesData.length) {
          if (value.length > formik.values.titlesData.length) {
            // add titles

            value.map((item) => {
              let exist = false;
              formik.values.titlesData.map((title) => {
                if (title.id === item.id) {
                  exist = true;
                }
              });
              if (exist === false) {
                formik.values.titlesData.push({
                  ...item,
                  percentages: 0,
                });
              }
            });
          } else if (value.length < formik.values.titlesData.length) {
            // remove titles
            formik.values.titlesData.map((title, index) => {
              let exist = false;
              value.map((item) => {
                if (item.id === title.id) {
                  exist = true;
                }
              });
              if (exist === false) {
                formik.values.titlesData.splice(index, 1);
              }
            });
          }
        }
        setTableTitles(value);
      default:
        break;
    }
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const handleTablePercent = (val, id, name) => {
    switch (name) {
      case "publishers":
        formik.values.publishers.map((item) => {
          if (item.bp_name === id) {
            item.percentages = val;
          }
        });
        break;
      case "series":
        formik.values.seriesData.map((item) => {
          if (item.id === id) {
            item.percentages = val;
          }
        });
        break;
      case "titles":
        formik.values.titlesData.map((item) => {
          if (item.id === id) {
            item.percentages = val;
          }
        });
        break;

      default:
        break;
    }
  };

  const getTitles = async () => {
    const titles = await instance({
      url: `items/getAllItems`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setTitles(titles.data.message);
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

  useLayoutEffect(() => {
    const getSchools = async () => {
      const state = await instance({
        url: "school/get/allschools",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setAllSchool(state.data.message.slice(1, 100));
    };
    const getAllBp = async () => {
      const bps = await instance({
        url: "user/admin/get/customers",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      setBps(bps.data.message);
    };
    const getSries = async () => {
      const allSeries = await instance({
        url: "series/get/all",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });

      setSeries(allSeries.data.message);
    };
    getSchools();
    getAllBp();
    getSries();
    getTitles();
  }, []);

  const clearData = () => {
    setPublisherData([]);
    setTableSeries([]);
    setTableTitles([]);
    formik.values.publishers = [];
    formik.values.seriesData = [];
    formik.values.titlesData = [];
    formik.values.eltPercentage = null;
    formik.values.nonEltPercentage = null;
    formik.values.specialDiscountOnOverallBusiness = null;
    setElt(false);
    setNonElt(false);
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
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" sm:px-8 px-2 py-3 bg-[#141728]">
            <div className="w-full flex flex-col gap-4 justify-center items-start bg-slate-600 py-4 px-4">
              <SearchDropDown
                Name={"schools_aof"}
                data={allSchool}
                handleOrderProcessingForm={(value, type) => {
                  formik.values.schoolInfo = value;
                }}
                label={"Select School"}
                color={"rgb(243, 244, 246)"}
              />
              <SearchDropDown
                Name={"customer_name"}
                data={bps}
                handleOrderProcessingForm={(value, type) => {
                  formik.values.customerInfo = value;
                }}
                label={"Select Customer"}
                color={"rgb(243, 244, 246)"}
              />
              <div className="flex flex-col justify-center items-start w-full mt-6 rounded-md bg-slate-600">
                <Accordion
                  defaultExpanded={true}
                  className="w-full !bg-slate-500"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore className="!text-gray-100" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="!text-gray-100 !font-semibold">
                      TOD
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <RowRadioButtonsGroup
                        handleRadioButtons={handleRadioButtons}
                        heading={"Applicable"}
                        name={"tod applicable"}
                        value={[
                          { label: "Yes", value: "yes" },
                          { label: "No", value: "no" },
                        ]}
                      />
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="w-full !bg-slate-500">
                  <AccordionSummary
                    expandIcon={<ExpandMore className="!text-gray-100" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="!text-gray-100 !font-semibold">
                      Cash
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <RowRadioButtonsGroup
                        handleRadioButtons={handleRadioButtons}
                        name={"cash"}
                        value={[
                          { label: "Yes", value: "yes" },
                          { label: "No", value: "no" },
                        ]}
                      />
                      {cashPer ? (
                        <BasicTextFields
                          lable={"Enter Percentage"}
                          type={"number"}
                          defaultValue={5}
                          handleOrderProcessingForm={(value, name) => {
                            formik.values.cashPercentage = value;
                          }}
                        />
                      ) : null}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="w-full !bg-slate-500">
                  <AccordionSummary
                    expandIcon={<ExpandMore className="!text-gray-100" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className="!text-gray-100 !font-semibold">
                      Special
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className="flex flex-col gap-4">
                    <Typography>
                      <RowRadioButtonsGroup
                        handleRadioButtons={handleRadioButtons}
                        heading={"Applicable"}
                        name={"special applicable"}
                        value={[
                          { label: "Yes", value: "yes" },
                          { label: "No", value: "no" },
                        ]}
                      />
                    </Typography>
                    {step4.special.applicable ? (
                      <Typography>
                        <RowRadioButtonsGroup
                          handleRadioButtons={handleRadioButtons}
                          name={"special type"}
                          value={[
                            {
                              label: "Overall Business Value",
                              value: "overall",
                            },
                            { label: "Specific", value: "specific" },
                          ]}
                        />
                      </Typography>
                    ) : null}
                    {step4.special.type === "overall" ? (
                      <>
                        <Typography className="!flex !items-center justify-around">
                          <BasicTextFields
                            lable={"Enter Percentage (special)"}
                            handleOrderProcessingForm={discountForm}
                            type={"number"}
                            variant={"standard"}
                            multiline={false}
                          />
                        </Typography>
                      </>
                    ) : null}
                    {step4.special.type === "specific" ? (
                      <>
                        <Typography className="flex flex-col gap-2">
                          <h1 className="sm:text-base text-sm font-semibold text-gray-100">
                            Select Publisher:
                          </h1>
                          <div className="!flex">
                            <MultiSelectDropDown
                              color={"rgb(243, 244, 246)"}
                              name={"publisher"}
                              data={data}
                              handleForm={discountForm}
                            />
                          </div>

                          {publisherData.length > 0 ? (
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="customized table"
                            >
                              <TableHead className="bg-slate-600">
                                <TableRow>
                                  <TableCell
                                    className="!w-[8rem] !text-gray-100"
                                    align="center"
                                  >
                                    Publisher
                                  </TableCell>
                                  <TableCell
                                    className="!w-[3rem] !text-gray-100"
                                    align="center"
                                  >
                                    Percentage
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              {publisherData.map((row) => {
                                return (
                                  <TableBody
                                    className="bg-slate-400"
                                    key={row.bp_name}
                                  >
                                    <TableRow
                                      key={row.bp_name}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        align="center"
                                        className="!text-gray-100"
                                      >
                                        {row.bp_name}
                                      </TableCell>

                                      <TableCell align="center">
                                        <TextField
                                          inputProps={{
                                            style: { color: "white" },
                                          }}
                                          InputLabelProps={{
                                            style: { color: "white" },
                                          }}
                                          type="number"
                                          onChange={(e) =>
                                            handleTablePercent(
                                              e.target.value,
                                              row.bp_name,
                                              "publishers"
                                            )
                                          }
                                          id="outlined-basic"
                                          label="Enter Percentage"
                                          variant="standard"
                                        />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                );
                              })}
                            </Table>
                          ) : null}
                        </Typography>
                        <div className="w-full flex justify-center">
                          <hr className="text-gray-100 w-[80%] my-4" />
                        </div>
                        <Typography className="flex flex-col gap-2 !my-4">
                          <h1 className="sm:text-base text-sm font-semibold text-gray-100">
                            ELT (gross):
                          </h1>
                          <RowRadioButtonsGroup
                            handleRadioButtons={handleRadioButtons}
                            name={"elt"}
                            value={[
                              {
                                label: "Yes",
                                value: true,
                              },
                              { label: "No", value: false },
                            ]}
                          />
                          {elt ? (
                            <BasicTextFields
                              lable={"Enter Percentage"}
                              type={"number"}
                              handleOrderProcessingForm={(value, name) => {
                                formik.values.eltPercentage = value;
                              }}
                            />
                          ) : null}
                        </Typography>
                        <div className="w-full flex justify-center">
                          <hr className="text-gray-100 w-[80%] my-4" />
                        </div>
                        <Typography className="flex flex-col gap-2 !my-4">
                          <h1 className="sm:text-base text-sm font-semibold text-gray-100">
                            Non-ELT (gross):
                          </h1>
                          <RowRadioButtonsGroup
                            handleRadioButtons={handleRadioButtons}
                            name={"nonElt"}
                            value={[
                              {
                                label: "Yes",
                                value: true,
                              },
                              { label: "No", value: false },
                            ]}
                          />
                          {nonElt ? (
                            <BasicTextFields
                              lable={"Enter Percentage"}
                              type={"number"}
                              handleOrderProcessingForm={(value, name) => {
                                formik.values.nonEltPercentage = value;
                              }}
                            />
                          ) : null}
                        </Typography>
                        <div className="w-full flex justify-center">
                          <hr className="text-gray-100 w-[80%] my-4" />
                        </div>
                        <Typography className="flex flex-col gap-2">
                          <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                            Select Series:
                          </h1>

                          <MultiSelectDropDown
                            color={"rgb(243, 244, 246)"}
                            data={series}
                            name={"series_discount"}
                            handleForm={discountForm}
                          />

                          {tableSeries.length === 0 ? null : (
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="customized table"
                            >
                              <TableHead className="bg-slate-600">
                                <TableRow>
                                  <TableCell
                                    className="!w-[8rem] !text-gray-100"
                                    align="center"
                                  >
                                    Series
                                  </TableCell>
                                  <TableCell
                                    className="!w-[3rem] !text-gray-100"
                                    align="center"
                                  >
                                    Percentage
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              {tableSeries.map((row) => {
                                return (
                                  <TableBody
                                    className="bg-slate-400"
                                    key={row.id}
                                  >
                                    <TableRow
                                      key={row.id}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        align="center"
                                        className="!text-gray-100"
                                      >
                                        {row.series}
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          inputProps={{
                                            style: { color: "white" },
                                          }}
                                          InputLabelProps={{
                                            style: { color: "white" },
                                          }}
                                          onChange={(e) =>
                                            handleTablePercent(
                                              e.target.value,
                                              row.id,
                                              "series"
                                            )
                                          }
                                          type="number"
                                          id="outlined-basic"
                                          label="Enter Percentage"
                                          variant="standard"
                                        />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                );
                              })}
                            </Table>
                          )}
                        </Typography>

                        <div className="w-full flex justify-center">
                          <hr className="text-gray-100 w-[80%] my-4" />
                        </div>
                        <Typography className="flex flex-col gap-2">
                          <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                            Select Item:
                          </h1>

                          <MultiSelectDropDown
                            color={"rgb(243, 244, 246)"}
                            data={titles}
                            name={"titles_discount"}
                            handleForm={discountForm}
                          />

                          {tableTitles.length === 0 ? null : (
                            <Table
                              sx={{ minWidth: 650 }}
                              aria-label="customized table"
                            >
                              <TableHead className="bg-slate-600">
                                <TableRow>
                                  <TableCell
                                    className="!w-[8rem] !text-gray-100"
                                    align="center"
                                  >
                                    Title
                                  </TableCell>
                                  <TableCell
                                    className="!w-[3rem] !text-gray-100"
                                    align="center"
                                  >
                                    Percentage
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              {tableTitles.map((row) => {
                                return (
                                  <TableBody
                                    className="bg-slate-400"
                                    key={row.id}
                                  >
                                    <TableRow
                                      key={row.id}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        align="center"
                                        className="!text-gray-100"
                                      >
                                        {row.item_name}
                                      </TableCell>
                                      <TableCell align="center">
                                        <TextField
                                          onChange={(e) =>
                                            handleTablePercent(
                                              e.target.value,
                                              row.id,
                                              "titles"
                                            )
                                          }
                                          id="outlined-basic"
                                          label="Enter Percentage"
                                          type="number"
                                          variant="standard"
                                          inputProps={{
                                            style: { color: "white" },
                                          }}
                                          InputLabelProps={{
                                            style: { color: "white" },
                                          }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                );
                              })}
                            </Table>
                          )}
                        </Typography>
                      </>
                    ) : null}
                  </AccordionDetails>
                </Accordion>
              </div>
              <div onClick={formik.handleSubmit}>
                <BasicButton text={"Submit"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MultiSelectDropDown = ({ color, data, name, handleForm }) => {
  const [value, setValue] = useState([]);
  const getOptionLabel = (option) => {
    switch (name) {
      case "publisher":
        return option.bp_name;
        break;
      case "series_discount":
        return option.series;
        break;
      case "titles_discount":
        return `${option.item_code} - ${option.item_name}`;
        break;

      default:
        break;
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <Stack spacing={1} sx={{ width: 200 }} className="w-full">
        <Autocomplete
          multiple
          color={color}
          id="fixed-tags-demo"
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            const uniqueObjects = new Set([
              ...newValue.map((object) => {
                switch (name) {
                  case "publisher":
                    return getOptionLabel(object);
                    break;

                  default:
                    return object;
                    break;
                }
              }),
            ]);
            console.log(uniqueObjects);
            let uniqueArr = Array.from(uniqueObjects).map((item) => {
              switch (name) {
                case "publisher":
                  return {
                    bp_name: item,
                  };
                  break;
                // case "series_discount":
                //   return item;
                //   break;

                default:
                  return item;
                  break;
              }
            });

            setValue(uniqueArr);
            handleForm(uniqueArr, name);
          }}
          options={data}
          getOptionLabel={getOptionLabel}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={getOptionLabel(option)}
                color="primary"
                {...getTagProps({ index })}
              />
            ))
          }
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              InputLabelProps={{ style: { color: color } }}
            />
          )}
        />
      </Stack>
    </StyledEngineProvider>
  );
};

export default Discount;
