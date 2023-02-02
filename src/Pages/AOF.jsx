import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import SearchDropDown from "../Components/SearchDropDown";
import BasicTextFields from "../Components/Material/TextField";
import DatePicker from "../Components/Material/Date";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, ExpandMore } from "@mui/icons-material";
import RowRadioButtonsGroup from "../Components/Material/RowRadioButtonGroup";
import instance from "../Instance";
import Cookies from "js-cookie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const AOF = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const [publisher, setPublisher] = useState([]);
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState(1);
  const [cheque, setCheque] = useState(1);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });
  const [step4, setStep4] = useState({
    tod: { applicable: false, type: false },
    special: { applicable: false, type: "" },
  });
  const [publisherData, setPublisherData] = useState([]);
  const [pubData, setPubData] = useState([])
  const sidebarRef = useRef();

  const handleRadioButtons = (type, value) => {
    switch (type) {
      case "tod applicable":
        if (value === "yes") {
          setStep4({ ...step4, tod: { applicable: true, type: false } });
        } else {
          setStep4({ ...step4, tod: { applicable: false, type: false } });
        }
        break;
      case "tod type":
        if (value === "yes") {
          setStep4({ ...step4, tod: { applicable: true, type: true } });
        } else {
          setStep4({ ...step4, tod: { applicable: true, type: false } });
        }

        break;
      case "special applicable":
        if (value === "yes") {
          setStep4({ ...step4, special: { applicable: true, type: "" } });
        } else {
          setStep4({ ...step4, special: { applicable: false, type: "" } });
        }
        break;
      case "special type":
        setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      default:
        break;
    }
  };

  const show = null;

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
    if (steps.step4) {
      return 3;
    }
  };

  const handleForm = () => {
    let content = [];
    for (let i = 0; i < suppliers; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <BasicTextFields
            lable={"Name"}
            variant={"standard"}
            multiline={false}
          />
          <BasicTextFields
            lable={"Annual Business"}
            variant={"standard"}
            multiline={false}
          />
        </li>
      );
    }
    return content;
  };

  const getTitleBySeries = async (id) => {
    const titles = await instance({
      url: `items/getSeriesItem/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setTitle(titles.data.message);
  };

  const handleCheques = () => {
    let content = [];
    for (let i = 0; i < cheque; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <BasicTextFields
            lable={"Cheque No"}
            variant={"standard"}
            multiline={false}
          />
          <BasicTextFields
            lable={"Bank"}
            variant={"standard"}
            multiline={false}
          />
          <BasicTextFields
            lable={"Branch/IFSC"}
            variant={"standard"}
            multiline={false}
          />
          <div className="mt-6">
            <BasicButton text={"Upload"} />
          </div>
        </li>
      );
    }
    return content;
  };

  const handleOrderProcessingForm = (value, type) => {
    switch (type) {
      case "series_aof":
        setLoading(true);
        getTitleBySeries(value.id);
        setLoading(false);
        break;
      case "publisher":
        let tempArr = [...publisherData];
        for (let ele of tempArr) {
          if (ele === value) return;
        }
        tempArr.push(value);
        // console.log(tempArr)
        setPublisherData(tempArr);
        console.log(publisherData)
        break;

      default:
        break;
    }
  };

  useLayoutEffect(() => {
    const getPublishers = async () => {
      const allPublishers = await instance({
        url: "publishers/getallpublishers",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      });
      setPublisher(allPublishers.data.message);
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
    getPublishers();
    getSries();
  }, []);

  const navInfo = {
    title: "AOF",
    details: ["Home", "/AOF"],
  };

  //   if (status === "Start Day") {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "https://nodecrmv2.herokuapp.com/api/user/start_day",
  //       {
  //         category: "start",
  //         coordinates: [[currentLocation.lng, currentLocation.lat]],
  //       },
  //       {
  //         headers: {
  //           authorization: Cookies.get("accessToken"),
  //         },
  //       }
  //     );
  //     console.log(res);
  //     setStatus("End Day");
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //     const running = await axios.post(
  //       "https://nodecrmv2.herokuapp.com/api/user/start_day",
  //       {
  //         category: "running",
  //         coordinates: Co_ordinates,
  //       },
  //       {
  //         headers: {
  //           authorization: Cookies.get("accessToken"),
  //         },
  //       }
  //     );

  //     console.log(running);

  //     const res = await axios.post(
  //       "https://nodecrmv2.herokuapp.com/api/user/start_day",
  //       {
  //         category: "end",
  //         coordinates: [[currentLocation.lng, currentLocation.lat]],
  //       },
  //       {
  //         headers: {
  //           authorization: Cookies.get("accessToken"),
  //         },
  //       }
  //     );

  //     console.log(res);
  //     setStatus("Start Day");
  //     localStorage.clear();
  //     setLoading(false);
  //   }
  // };

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
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

  const handlePublisher = () => {
    setPubData([{id: "123"}, {id: "234"}, {id: "345"}])
  }

  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        {loading ? <Loader /> : null}

        <Sidebar
          highLight={"aof"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"aof"}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Navbar
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
            <h1 className="text-gray-100 md:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Account Opening Form
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={["", "", "", ""]}
              />
              {/* step 1 */}
              {steps.step1 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-5 sm:grid-cols-3 grid-rows-[15] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <BasicTextFields
                      lable={"Name Of Party/School *"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <SearchDropDown
                      Name={"aof_status"}
                      data={[
                        { title: "Sole Proprietary" },
                        { title: "Partnership" },
                        { title: "LLP" },
                        { title: "Pvt.Ltd" },
                        { title: "PublicLtd" },
                        { title: "Trust" },
                      ]}
                      label={"Select Status *"}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      lable={"Address *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"State *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"City *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Pin Code *"}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Mobile *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Phone *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"E-Mail *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Firm/ Company/Trust Registration Number *"}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>
                    <DatePicker label={"Dated"} />
                    <BasicTextFields
                      lable={"PAN NO *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"GST NO *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"GST Year of establishment of business"}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                  </div>
                  <div
                    className="mt-3"
                    onClick={() => {
                      setSteps({ step1: false, step2: true, step3: false });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 2 */}
              {steps.step2 ? (
                <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                  <div className="grid sm:grid-rows-3 sm:grid-cols-3 grid-rows-[7] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Name of Proprietor/Partner/Director/Trustee *"}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>

                    <BasicTextFields
                      lable={"PAN NO *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Address *"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Pin Code *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />

                    <BasicTextFields
                      lable={"Phone *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"Mobile *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                    <BasicTextFields
                      lable={"E-Mail *"}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>
                  <div className="w-full flex flex-col my-2 gap-2">
                    <h1 className="font-semibold text-gray-100">
                      Name of other Publishers/Suppliers from whom the party has
                      credit facilities:
                    </h1>
                    <div onClick={() => setSuppliers(suppliers + 1)}>
                      {/* <BasicButton text={"Add More"} /> */}
                      <Tooltip title="Add More Names">
                        <Fab color={"red"} size="small" aria-label="add">
                          <Add />
                        </Fab>
                      </Tooltip>
                    </div>

                    <ol className="list-decimal">{handleForm()}</ol>
                  </div>
                  <div
                    onClick={() => {
                      setSteps({ step1: false, step2: false, step3: true });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
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
                    <div className="sm:col-span-2">
                      <BasicTextFields
                        lable={"Name and address of the party’s main bankers *"}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>

                    <BasicTextFields
                      lable={"Account Number *"}
                      variant={"standard"}
                      type={"number"}
                      multiline={false}
                    />
                    <SearchDropDown
                      Name={"aof_acc"}
                      data={[{ title: "SB" }, { title: "CA" }, { title: "CC" }]}
                      label={"Type of A/c "}
                      color={"rgb(243, 244, 246)"}
                    />
                    <BasicTextFields
                      lable={"IFSC *"}
                      type={"number"}
                      variant={"standard"}
                      multiline={false}
                    />
                  </div>
                  <div className="w-full flex flex-col my-2 gap-2">
                    <h1 className="font-semibold text-gray-100">
                      Detail of Cheques * :
                    </h1>
                    <div onClick={() => setCheque(cheque + 1)}>
                      {/* <BasicButton text={"Add More"} /> */}
                      <Tooltip title="Add More Cheque">
                        <Fab color={"red"} size="small" aria-label="add">
                          <Add />
                        </Fab>
                      </Tooltip>
                    </div>
                    <ol className="list-decimal">{handleCheques()}</ol>
                  </div>
                  <div
                    onClick={() => {
                      setSteps({
                        step1: false,
                        step2: false,
                        step3: false,
                        step4: true,
                      });
                      window.scroll({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="mt-3"
                  >
                    <BasicButton text={"Next"} />
                  </div>
                </div>
              ) : null}
              {/* step 4 */}
              {steps.step4 ? (
                <div className="flex flex-col gap-4  md:w-[90%] sm:w-[70%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem] justify-center items-start">
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
                        {step4.tod.applicable ? (
                          <Typography>
                            <RowRadioButtonsGroup
                              handleRadioButtons={handleRadioButtons}
                              name={"tod type"}
                              value={[
                                {
                                  label: "Overall Business Value",
                                  value: "yes",
                                },
                                { label: "Specific", value: "no" },
                              ]}
                            />
                          </Typography>
                        ) : null}
                        {step4.tod.type ? (
                          <>
                            <Typography className="!flex !items-center justify-around">
                              <TextField
                                InputLabelProps={{
                                  style: { color: "white" },
                                }}
                                inputProps={{
                                  style: { color: "white" },
                                }}
                                type={"number"}
                                id="outlined-basic"
                                label="Enter Percentage"
                                variant="standard"
                              />
                              <RowRadioButtonsGroup
                                handleRadioButtons={handleRadioButtons}
                                name={"tod"}
                                value={[
                                  {
                                    label: "Gross",
                                    value: "yes",
                                  },
                                  { label: "Net", value: "no" },
                                ]}
                              />
                            </Typography>
                          </>
                        ) : null}
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
                              <TextField
                                InputLabelProps={{
                                  style: { color: "white" },
                                }}
                                inputProps={{
                                  style: { color: "white" },
                                }}
                                type={"number"}
                                id="outlined-basic"
                                label="Enter Percentage"
                                variant="standard"
                              />
                              <RowRadioButtonsGroup
                                handleRadioButtons={handleRadioButtons}
                                name={"tod"}
                                value={[
                                  {
                                    label: "Gross",
                                    value: "yes",
                                  },
                                  { label: "Net", value: "no" },
                                ]}
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
                                <SearchDropDown
                                  Name={"publisher"}
                                  data={publisher}
                                  handleOrderProcessingForm={
                                    handleOrderProcessingForm
                                  }
                                  label={"Select Publisher"}
                                  color={"rgb(243, 244, 246)"}
                                />
                                <div className="!flex justify-end" onClick={handlePublisher}>
                                  <BasicButton text={"Add"} />
                                </div>
                              </div>

                              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead className="bg-slate-600">
                      <TableRow>
                        <TableCell className="!w-[13rem]" align="center">
                          Publisher
                        </TableCell>
                        <TableCell className="!w-[8rem]" align="center">
                          Percentage
                        </TableCell>
                        <TableCell className="!w-[10rem]" align="center">
                         
                        </TableCell>
                       
                      </TableRow>
                    </TableHead>
                    {pubData.map((row) => {
                    <TableBody className="bg-slate-400">
                            <TableRow
                              key={"row.series"}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                            
                          
                              <TableCell align="center">
                                {row.bp_name}
                              </TableCell>
                              <TableCell align="center">
                              <TextField
                                  // InputLabelProps={{
                                  //   style: { color: "white" },
                                  // }}
                                  // inputProps={{
                                  //   style: { color: "white" },
                                  // }}
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                              </TableCell>
                              <TableCell align="center">
                              <RowRadioButtonsGroup
                                  handleRadioButtons={handleRadioButtons}
                                  name={"special"}
                                  value={[
                                    {
                                      label: "Gross",
                                      value: "yes",
                                    },
                                    { label: "Net", value: "no" },
                                  ]}
                                />
                              </TableCell>
                            </TableRow>   
                    </TableBody>
                  })}
                  </Table>


                            </Typography>
                            <div className="w-full flex justify-center">
                              <hr className="text-gray-100 w-[80%] my-4" />
                            </div>
                            <Typography className="flex flex-col gap-2">
                              <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                                Select Series:
                              </h1>
                              <SearchDropDown
                                Name={"series_aof"}
                                data={series}
                                handleOrderProcessingForm={
                                  handleOrderProcessingForm
                                }
                                label={"Select Series"}
                                color={"rgb(243, 244, 246)"}
                              />
                              <div className="flex justify-around items-center">
                                <TextField
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                  inputProps={{
                                    style: { color: "white" },
                                  }}
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                                <RowRadioButtonsGroup
                                  handleRadioButtons={handleRadioButtons}
                                  name={"tod"}
                                  value={[
                                    {
                                      label: "Gross",
                                      value: "yes",
                                    },
                                    { label: "Net", value: "no" },
                                  ]}
                                />
                              </div>
                            </Typography>
                            <div className="w-full flex justify-center">
                              <hr className="text-gray-100 w-[80%] my-4" />
                            </div>
                            <Typography className="flex flex-col gap-2">
                              <h1 className="sm:text-base font-semibold text-sm text-gray-100">
                                Select Title:
                              </h1>
                              <SearchDropDown
                                Name={"title_aof"}
                                disable={title.length > 0 ? false : true}
                                data={title}
                                // handleOrderProcessingForm={handleOrderProcessingForm}
                                label={"Select Title"}
                                color={"rgb(243, 244, 246)"}
                              />
                              <div className="flex justify-around items-center">
                                <TextField
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                  inputProps={{
                                    style: { color: "white" },
                                  }}
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                                <RowRadioButtonsGroup
                                  handleRadioButtons={handleRadioButtons}
                                  name={"tod"}
                                  value={[
                                    {
                                      label: "Gross",
                                      value: "yes",
                                    },
                                    { label: "Net", value: "no" },
                                  ]}
                                />
                              </div>
                            </Typography>
                          </>
                        ) : null}
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
                            // heading={"Applicable"}
                            name={"tod"}
                            value={[
                              { label: "Yes", value: "yes" },
                              { label: "No", value: "no" },
                            ]}
                          />
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div>
                    <BasicButton text={"Submit"} />
                  </div>

                  {/* {showTod ? (
                      <div className="mt-3">
                        <BasicButton text={"Submit"} />
                      </div>
                    ) : null} */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AOF;
