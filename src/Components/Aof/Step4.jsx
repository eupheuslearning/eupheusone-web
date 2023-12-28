import React, { useLayoutEffect } from "react";
import BasicTextFields from "../Material/TextField";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fab,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, Delete, ExpandMore } from "@mui/icons-material";
import RowRadioButtonsGroup from "../Material/RowRadioButtonGroup";
import { useState } from "react";
import instance from "../../Instance";
import Cookies from "js-cookie";
import BasicButton from "../Material/Button";
import SearchDropDown from "../SearchDropDown";
import { ShowError } from "../../util/showError";

const Step4 = ({ setSteps, formik, setLoading }) => {
  const [authPerson, setAuthPerson] = useState(1);
  // const [publisherAuthForm, setPublisherAuthForm] = useState([]);
  const [publisherData, setPublisherData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  // const [todCondition, setTodCondition] = useState("");
  const [step4, setStep4] = useState({
    tod: { applicable: false, type: false },
    special: { applicable: false, type: "" },
  });
  const [special_obj, setSpecialObj] = useState({
    type: "special",
    eligibile: "yes",
    dis_type: "",
    category: "",
    fk_category_id: "",
    percentages: "",
    percentages_type: "",
  });
  // const [specialSpecific, setSpecialSpecific] = useState([]);
  const [todOption, setTodOption] = useState("");
  const [publisher, setPublisher] = useState([]);
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState([]);
  const [allSchool, setAllSchool] = useState([]);
  const [schoolData, setSchoolData] = useState([]);

  const handleAofForm = (value, type) => {
    switch (type) {
      case "Credit Limit *":
        formik.values.creditLimit = value;
        break;
      case "Remarks":
        formik.values.remarks = value;
        break;
      case "Enter Percentage (special)":
        formik.values.special = [{ ...special_obj, percentages: value }];
        break;
      case "publisher":
        let tempArr = [...publisherData];
        let exist = false;
        for (let i = 0; i < publisherData.length; i++) {
          const element = publisherData[i];
          if (element.fk_category_id === value.id) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          let tempObj = {
            type: "special",
            eligibile: "yes",
            dis_type: "specific",
            category: "publisher",
            percentages: "",
            percentages_type: "",
            fk_category_id: value.id,
            bp_name: value.bp_name,
          };
          tempArr.push(tempObj);
          console.log(tempArr);
          formik.values.special.push(tempObj);
          setPublisherData(tempArr);
        }

        break;
      case "series_aof":
        let tempArr2 = [...seriesData];
        let exist2 = false;
        for (let i = 0; i < seriesData.length; i++) {
          const element = seriesData[i];
          if (element.fk_category_id === value.id) {
            exist2 = true;
            break;
          }
        }

        if (!exist2) {
          let tempObj2 = {
            type: "special",
            eligibile: "yes",
            dis_type: "specific",
            category: "series",
            percentages: "",
            percentages_type: "",
            fk_category_id: value.id,
            series: value.series,
          };
          tempArr2.push(tempObj2);
          console.log(tempArr2);
          formik.values.special.push(tempObj2);
          setSeriesData(tempArr2);
        }

        break;
      case "series_aof_item":
        getTitleBySeries(value.id);
        break;
      case "title_aof":
        let tempArr3 = [...itemsData];
        let exist3 = false;
        for (let i = 0; i < itemsData.length; i++) {
          const element = itemsData[i];
          if (element.fk_category_id === value.id) {
            exist3 = true;
            break;
          }
        }

        if (!exist3) {
          let tempObj3 = {
            type: "special",
            eligibile: "yes",
            dis_type: "specific",
            category: "items",
            percentages: "",
            percentages_type: "",
            fk_category_id: value.id,
            series: value.item_name,
          };
          tempArr3.push(tempObj3);
          console.log(tempArr3);
          formik.values.special.push(tempObj3);
          setItemsData(tempArr3);
        }

        break;
      case "schools_aof":
        console.log(value);
        let tempArr4 = [...schoolData];
        let exist4 = false;
        for (let i = 0; i < schoolData.length; i++) {
          const element = schoolData[i];
          if (element.fk_category_id === value.id) {
            exist4 = true;
            break;
          }
        }

        if (!exist4) {
          let tempObj4 = {
            type: "special",
            eligibile: "yes",
            dis_type: "specific",
            category: "series",
            percentages: "",
            percentages_type: "",
            fk_category_id: value.id,
            school_name: value.school_name,
          };
          tempArr4.push(tempObj4);
          console.log(tempArr4);
          formik.values.special.push(tempObj4);
          setSchoolData(tempArr4);
        }

        break;
      default:
        break;
    }
  };

  const handleAuthForm = () => {
    let content = [];
    for (let i = 0; i < authPerson; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <TextField
            label={`Name`}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            onChange={(e) => handlePublisherAuthForm("Name", e.target.value, i)}
            variant={"standard"}
            multiline={false}
          />
          <TextField
            label={"Designation"}
            inputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
            onChange={(e) =>
              handlePublisherAuthForm("Designation", e.target.value, i)
            }
            variant={"standard"}
            multiline={false}
          />
          <div className="mt-6 flex ">
            <h1 className="text-gray-100 font-normal">Signature: </h1>
            <input
              label="Signature"
              type="file"
              name="file_upload"
              accept="image/*"
              onChange={(e) => onSignFileChange(e, i)}
            />
          </div>
        </li>
      );
    }
    return content;
  };
  const getTitleBySeries = async (id) => {
    setLoading(true);
    const titles = await instance({
      url: `items/getSeriesItem/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    setTitle(titles.data.message);
    setLoading(false);
  };

  const onSignFileChange = async (e, index) => {
    let formdata = new FormData();
    let file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      ShowError("Please Select an image file");
      return;
    }
    formdata.append("img", file);
    formdata.append("test", "test");
    setLoading(true);
    const res = await instance({
      url: `imagetoS3/add_image_s3`,
      method: "POST",
      data: formdata,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setLoading(false);

    if (res.status === 200) {
      let link = res.data;
      let tempArr = [...formik.values.authorizedPersons];
      let exist = false;
      for (let i = 0; i < tempArr.length; i++) {
        const element = tempArr[i];
        if (element.idx === index) {
          exist = true;
          break;
        }
      }
      if (!exist) {
        let obj = {};
        obj.idx = index;
        obj.signature = link;
        tempArr.push(obj);
      } else {
        for (let obj of tempArr) {
          if (obj.idx === index) {
            obj.signature = link;
          }
        }
      }
      formik.values.authorizedPersons = tempArr;
    } else {
      ShowError("Cannot upload image");
    }
  };

  const handlePublisherAuthForm = (field, value, index) => {
    let tempArr = [...formik.values.authorizedPersons];
    let exist = false;
    for (let i = 0; i < tempArr.length; i++) {
      const element = tempArr[i];
      if (element.idx === index) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      let obj = {};
      obj.idx = index;
      if (field === "Name") obj.name = value;
      if (field === "Designation") obj.designation = value;
      if (field === "Signature") obj.signature = value;
      tempArr.push(obj);
    } else {
      for (let obj of tempArr) {
        if (obj.idx === index) {
          if (field === "Name") obj.name = value;
          if (field === "Designation") obj.designation = value;
          if (field === "Signature") obj.signature = value;
        }
      }
    }
    formik.values.authorizedPersons = tempArr;
  };

  const handleDelete = (id, type) => {
    switch (type) {
      case "publisher":
        formik.values.special = formik.values.special.filter(
          (item) => item.fk_category_id !== id
        );
        setPublisherData(formik.values.special);

        break;

      case "series":
        formik.values.special = formik.values.special.filter(
          (item) => item.fk_category_id !== id
        );
        setSeriesData(formik.values.special);
        break;

      case "items":
        formik.values.special = formik.values.special.filter(
          (item) => item.fk_category_id !== id
        );
        setItemsData(formik.values.special);
        break;
      case "schools":
        formik.values.special = formik.values.special.filter(
          (item) => item.fk_category_id !== id
        );
        setSchoolData(formik.values.special);
        break;
    }
  };

  const handleRadioButtons = (type, value, defaultValue) => {
    switch (type) {
      case "tod applicable":
        formik.values.TodApplicable = value;
        break;

      case "special applicable":
        if (value === "yes") {
          setSpecialObj({ ...special_obj, eligibile: "yes" });
          setStep4({ ...step4, special: { applicable: true, type: "" } });
        } else {
          setSpecialObj({ ...special_obj, eligibile: "no" });
          setStep4({ ...step4, special: { applicable: false, type: "" } });
        }
        break;

      case "special type":
        setPublisherData([]);
        setSeriesData([]);
        setItemsData([]);
        setSchoolData([]);
        if (value === "overall") {
          setSpecialObj({ ...special_obj, dis_type: "overall" });
        } else {
          setSpecialObj({ ...special_obj, dis_type: "specific" });
        }
        formik.values.special = [];
        setStep4({ ...step4, special: { applicable: true, type: value } });
        break;

      case "tod":
        if (value === "yes") setTodOption("gross");
        else setTodOption("net");
        break;

      case "cash":
        formik.values.cash = value;
        break;

      case "tod_special":
        if (value === "yes") {
          special_obj.percentages_type = "gross";
        }
        if (value === "no") {
          special_obj.percentages_type = "net";
        }
        setSpecialObj(special_obj);
        // setSpecialSpecific([{ ...special_obj }]);

        break;

      case "publisher":
        let val = value;
        let id = defaultValue;

        console.log(val, id);

        let dataArr = [...publisherData];
        let tempArr = [];
        for (let obj of dataArr) {
          if (id === obj.fk_category_id) {
            obj.percentages_type = val;
          }
          tempArr.push(obj);
        }

        console.log(tempArr);
        setPublisherData(tempArr);

        break;

      case "series":
        let val1 = value;
        let id1 = defaultValue;

        let dataArr1 = [...seriesData];
        let tempArr1 = [];
        for (let obj of dataArr1) {
          if (id1 === obj.fk_category_id) {
            obj.percentages_type = val1;
          }
          tempArr1.push(obj);
        }

        setSeriesData([]);
        setSeriesData(tempArr1);
        break;

      case "items":
        let val2 = value;
        let id2 = defaultValue;

        let dataArr2 = [...itemsData];
        let tempArr2 = [];
        for (let obj of dataArr2) {
          if (id2 === obj.fk_category_id) {
            obj.percentages_type = val2;
          }
          tempArr2.push(obj);
        }

        setItemsData([]);
        setItemsData(tempArr2);
        break;

      default:
        break;
    }
  };
  const handleTablePercent = (val, id) => {
    formik.values.special.map((item) => {
      if (item.fk_category_id === id) {
        item.percentages = val;
      }
    });
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
    const getSchools = async () => {
      const state = await instance({
        url: "school/get/allschools",
        method: "GET",
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
      // console.log(state.data.message);
      setAllSchool(state.data.message);
    };

    getPublishers();
    getSries();
    getSchools();
  }, []);

  return (
    <div className="flex flex-col gap-4  md:w-[90%] sm:w-[70%] w-[95%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem] justify-center items-start">
      <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
        <BasicTextFields
          lable={"Credit Limit *"}
          handleOrderProcessingForm={handleAofForm}
          type={"number"}
          variant={"standard"}
          multiline={false}
        />
      </div>

      <div className="w-full flex flex-col my-2 gap-2">
        <h1 className="font-semibold text-gray-100">
          Details of persons authorized on behalf of the Distributor to receive
          the Goods or pick up of Goods from Eupheus’s warehouse:
        </h1>
        <div onClick={() => setAuthPerson(authPerson + 1)}>
          <Tooltip title="Add More Names">
            <Fab color={"red"} size="small" aria-label="add">
              <Add />
            </Fab>
          </Tooltip>
        </div>

        <ol className="list-decimal">{handleAuthForm()}</ol>
      </div>

      <div className="flex flex-col justify-center items-start w-full mt-6 rounded-md bg-slate-600">
        <Accordion defaultExpanded={true} className="w-full !bg-slate-500">
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
            {/* {step4.tod.applicable ? (
              <Typography>
                <RowRadioButtonsGroup
                  handleRadioButtons={handleRadioButtons}
                  name={"tod type"}
                  value={[
                    {
                      label: "Overall Business Value",
                      value: "yes",
                    },
                    // { label: "Specific", value: "no" },
                  ]}
                />
              </Typography>
            ) : null}
            {step4.tod.type ? (
              <>
                <Typography className="!flex !items-center justify-around">
                  <BasicTextFields
                    lable={"Enter Percentage (TOD)"}
                    handleOrderProcessingForm={handleAofForm}
                    type={"number"}
                    variant={"standard"}
                    multiline={false}
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
            ) : null} */}
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
                    handleOrderProcessingForm={handleAofForm}
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
                    <SearchDropDown
                      Name={"publisher"}
                      data={publisher}
                      handleOrderProcessingForm={handleAofForm}
                      label={"Select Publisher"}
                      color={"rgb(243, 244, 246)"}
                    />
                  </div>

                  {publisherData.length === 0 ? (
                    ""
                  ) : (
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
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

                          <TableCell
                            className="!w-[2rem]"
                            align="center"
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      {publisherData.map((row) => {
                        return (
                          <TableBody className="bg-slate-400">
                            <TableRow
                              key={"row.series"}
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
                                  inputProps={{ style: { color: "white" } }}
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                  type="number"
                                  onChange={(e) =>
                                    handleTablePercent(
                                      e.target.value,
                                      row.fk_category_id
                                    )
                                  }
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                              </TableCell>

                              <TableCell align="center">
                                <div>
                                  <IconButton
                                    type="submit"
                                    aria-label="search"
                                    className="!text-red-500"
                                    onClick={() => {
                                      handleDelete(
                                        row.fk_category_id,
                                        "publisher"
                                      );
                                    }}
                                  >
                                    <Delete
                                    // style={{ fill: "blue" }}
                                    />
                                  </IconButton>
                                </div>
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
                    Select Series:
                  </h1>
                  <SearchDropDown
                    Name={"series_aof"}
                    data={series}
                    handleOrderProcessingForm={handleAofForm}
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                  />
                  {seriesData.length === 0 ? (
                    ""
                  ) : (
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
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

                          <TableCell
                            className="!w-[2rem]"
                            align="center"
                          ></TableCell>
                        </TableRow>
                      </TableHead>

                      {seriesData.map((row) => {
                        return (
                          <TableBody className="bg-slate-400">
                            <TableRow
                              key={"row.series"}
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
                                  inputProps={{ style: { color: "white" } }}
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                  onChange={(e) =>
                                    handleTablePercent(
                                      e.target.value,
                                      row.fk_category_id
                                    )
                                  }
                                  type="number"
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                              </TableCell>

                              <TableCell align="center">
                                <div>
                                  <IconButton
                                    type="submit"
                                    aria-label="search"
                                    className="!text-red-500"
                                    onClick={() => {
                                      handleDelete(
                                        row.fk_category_id,
                                        "series"
                                      );
                                    }}
                                  >
                                    <Delete
                                    // style={{ fill: "blue" }}
                                    />
                                  </IconButton>
                                </div>
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
                  <SearchDropDown
                    Name={"series_aof_item"}
                    data={series}
                    handleOrderProcessingForm={handleAofForm}
                    label={"Select Series"}
                    color={"rgb(243, 244, 246)"}
                  />
                  <SearchDropDown
                    Name={"title_aof"}
                    disable={title.length > 0 ? false : true}
                    data={title}
                    handleOrderProcessingForm={handleAofForm}
                    label={"Select Title"}
                    color={"rgb(243, 244, 246)"}
                  />

                  {itemsData.length === 0 ? (
                    ""
                  ) : (
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
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

                          <TableCell
                            className="!w-[2rem]"
                            align="center"
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      {itemsData.map((row) => {
                        return (
                          <TableBody className="bg-slate-400">
                            <TableRow
                              key={row.fk_category_id}
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
                                  onChange={(e) =>
                                    handleTablePercent(
                                      e.target.value,
                                      row.fk_category_id
                                    )
                                  }
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  type="number"
                                  variant="standard"
                                  inputProps={{ style: { color: "white" } }}
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                />
                              </TableCell>

                              <TableCell align="center">
                                <div>
                                  <IconButton
                                    type="submit"
                                    aria-label="search"
                                    className="!text-red-500"
                                    onClick={() => {
                                      handleDelete(row.fk_category_id, "items");
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </div>
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
                    Select Schools:
                  </h1>
                  <SearchDropDown
                    Name={"schools_aof"}
                    data={allSchool}
                    handleOrderProcessingForm={handleAofForm}
                    label={"Select School"}
                    color={"rgb(243, 244, 246)"}
                  />
                  {schoolData.length === 0 ? (
                    ""
                  ) : (
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                      <TableHead className="bg-slate-600">
                        <TableRow>
                          <TableCell
                            className="!w-[8rem] !text-gray-100"
                            align="center"
                          >
                            Schools
                          </TableCell>
                          <TableCell
                            className="!w-[3rem] !text-gray-100"
                            align="center"
                          >
                            Percentage
                          </TableCell>

                          <TableCell
                            className="!w-[2rem]"
                            align="center"
                          ></TableCell>
                        </TableRow>
                      </TableHead>

                      {schoolData.map((row) => {
                        return (
                          <TableBody className="bg-slate-400">
                            <TableRow
                              key={"row.series"}
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
                                {row.school_name}
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  inputProps={{ style: { color: "white" } }}
                                  InputLabelProps={{
                                    style: { color: "white" },
                                  }}
                                  onChange={(e) =>
                                    handleTablePercent(
                                      e.target.value,
                                      row.fk_category_id
                                    )
                                  }
                                  id="outlined-basic"
                                  label="Enter Percentage"
                                  variant="standard"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <div>
                                  <IconButton
                                    type="submit"
                                    aria-label="search"
                                    className="!text-red-500"
                                    onClick={() => {
                                      handleDelete(
                                        row.fk_category_id,
                                        "schools"
                                      );
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </div>
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
                name={"cash"}
                value={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
        <BasicTextFields
          lable={"Remarks"}
          handleOrderProcessingForm={handleAofForm}
          variant={"standard"}
          multiline={false}
        />
      </div>

      <div
        onClick={() => {
          console.log(formik.values);
          if (!formik.values.creditLimit) {
            ShowError("Please Enter Credit Limit");
          } else {
            formik.handleSubmit();
          }
        }}
      >
        <BasicButton text={"Submit"} />
      </div>
    </div>
  );
};

export default Step4;
