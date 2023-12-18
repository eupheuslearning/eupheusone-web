import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Material/Loader";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import CustomizedSteppers from "../Components/Material/Stepper";
import instance from "../Instance";
import Cookies from "js-cookie";
import Snackbars from "../Components/Material/SnackBar";
import { useFormik } from "formik";
import Step1 from "../Components/Aof/Step1";
import Step2 from "../Components/Aof/Step2";
import Step3 from "../Components/Aof/Step3";
import Step4 from "../Components/Aof/Step4";

const AOFcreate = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  // step 1
  const [partyType, setPartyType] = useState("School");
  //
  const [publisher, setPublisher] = useState([]);
  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [remarkss, setRemarkss] = useState("");
  const [steps, setSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: true,
  });
  const [step4, setStep4] = useState({
    tod: { applicable: false, type: false },
    special: { applicable: false, type: "" },
  });
  const [publisherData, setPublisherData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [specialSpecific, setSpecialSpecific] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [allSchool, setAllSchool] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [date, setDate] = useState("");
  const [nameOfSchool, setNameOfSchool] = useState("");
  const [idOfSchool, setIdOfSchool] = useState("");

  const [pinCode, setPinCode] = useState(null);
  const [stateSelect, setStateSelect] = useState("");
  const [citySelect, setCitySelect] = useState("");

  const [aofStatus, setAofStatus] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [firmRegNo, setFirmRegNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [gstYear, setGstYear] = useState("");
  const [proprietorName, setProprietorName] = useState("");
  const [panNoP, setPanNoP] = useState("");
  const [addressP, setAddressP] = useState("");
  const [pinCodeP, setPinCodeP] = useState("");
  const [phoneP, setPhoneP] = useState("");
  const [mobileP, setMobileP] = useState("");
  const [emailP, setEmailP] = useState("");
  const [partyBankerName, setPartyBankerName] = useState("");
  const [accNoP, setAccNoP] = useState("");
  const [ifscP, setIfscP] = useState("");
  const [aofAcc, setAofAcc] = useState("");
  const [todOption, setTodOption] = useState("");
  const [todCondition, setTodCondition] = useState("");
  const [todPercent, setTodPercent] = useState("");
  const [cashOption, setCashOption] = useState("");
  const [totalNoStudent, setTotalNoStudent] = useState("");
  const [classesUpto, setClassesUpto] = useState("");
  const [publisherForm, setPublisherForm] = useState([]);
  const [chequeForm, setChequeForm] = useState([]);
  const [publisherAuthForm, setPublisherAuthForm] = useState([]);

  const [special_obj, setSpecialObj] = useState({
    type: "special",
    eligibile: "yes",
    dis_type: "",
    category: "",
    fk_category_id: "",
    percentages: "",
    percentages_type: "",
  });
  const [creditLimit, setcrditLimit] = useState("");
  const [creditLimitType, setcrditLimitType] = useState("");
  const [selectType, setSelectType] = useState("");
  const [panLink, setPanLink] = useState("");
  const [gstLink, setGstLink] = useState("");
  const [adhrLink, setAdhrLink] = useState("");
  const [desig, setDesignation] = useState("");
  const sidebarRef = useRef();
  const snackbarRef = useRef();

  const postFormData = async () => {
    let pubArr = [...publisherForm];
    for (let obj of pubArr) {
      delete obj.idx;
    }

    let chekArr = [...chequeForm];
    for (let obj of chekArr) {
      delete obj.idx;
    }

    let authArr = [...publisherAuthForm];
    for (let obj of authArr) {
      delete obj.idx;
    }

    let tempPublisherArr = [...publisherData];
    for (let items of tempPublisherArr) {
      delete items.bp_name;
    }
    let tempSeriesArr = [...seriesData];
    for (let items of tempSeriesArr) {
      delete items.series;
    }
    let tempItemsArr = [...itemsData];
    for (let items of tempItemsArr) {
      delete items.series;
    }

    let specialData = [
      ...tempPublisherArr,
      ...tempSeriesArr,
      ...tempItemsArr,
      ...specialSpecific,
    ];
    let postData;
    if (pubArr.length === 0) {
      postData = {
        name: nameOfSchool,
        status_type: aofStatus,
        aof_type: selectType,
        party_type: formik.values.partyType,
        fk_school_id: idOfSchool,
        fk_state_id: stateSelect,
        fk_city_id: citySelect,
        zip_code: pinCode,
        address: schoolAddress,
        phone: phone,
        mobile: mobile,
        email: schoolEmail,
        firm_reg: firmRegNo,
        date: date,
        pan: panNo,
        gst: gstNo,
        business_est: gstYear,
        t_name: proprietorName,
        t_pan: panNoP,
        t_zip_code: pinCodeP,
        t_address: addressP,
        t_phone: phoneP,
        t_mobile: mobileP,
        t_email: emailP,
        credit_limit: creditLimit,
        credit_type: creditLimitType,
        remarks: remarkss,
        students_number: totalNoStudent,
        classes: classesUpto,
        designation: desig,
        pan_url: panLink,
        gst_url: gstLink,
        adhar: aadharNo,
        adhar_url: adhrLink,

        ab_name: partyBankerName,
        ab_account_no: accNoP,
        ab_acc_type: aofAcc,
        ab_ifsc: ifscP,
        cheque: chekArr,

        good_picks: authArr,
        cash: [
          {
            type: "cash",
            eligibile: cashOption,
          },
        ],
        tod: [
          {
            type: "tod",
            eligibile: todCondition,
            percentages: todPercent,
            percentages_type: todOption,
          },
        ],
        special: specialData,
      };
    } else if (classesUpto.length === 0) {
      postData = {
        name: nameOfSchool,
        status_type: aofStatus,
        aof_type: selectType,
        party_type: formik.values.partyType,
        fk_school_id: idOfSchool,
        fk_state_id: stateSelect,
        fk_city_id: citySelect,
        zip_code: pinCode,
        address: schoolAddress,
        phone: phone,
        mobile: mobile,
        email: schoolEmail,
        firm_reg: firmRegNo,
        date: date,
        pan: panNo,
        gst: gstNo,
        business_est: gstYear,
        t_name: proprietorName,
        t_pan: panNoP,
        t_zip_code: pinCodeP,
        t_address: addressP,
        t_phone: phoneP,
        t_mobile: mobileP,
        t_email: emailP,
        credit_limit: creditLimit,
        credit_type: creditLimitType,
        remarks: remarkss,
        students_number: totalNoStudent,
        // classes: classesUpto,
        designation: desig,
        pan_url: panLink,
        gst_url: gstLink,
        adhar: aadharNo,
        adhar_url: adhrLink,
        cp: pubArr,

        ab_name: partyBankerName,
        ab_account_no: accNoP,
        ab_acc_type: aofAcc,
        ab_ifsc: ifscP,
        cheque: chekArr,

        good_picks: authArr,
        cash: [
          {
            type: "cash",
            eligibile: cashOption,
          },
        ],
        tod: [
          {
            type: "tod",
            eligibile: todCondition,
            percentages: todPercent,
            percentages_type: todOption,
          },
        ],
        special: specialData,
      };
    } else if (pubArr.length === 0 && classesUpto.length === 0) {
      postData = {
        name: nameOfSchool,
        status_type: aofStatus,
        aof_type: selectType,
        party_type: formik.values.partyType,
        fk_school_id: idOfSchool,
        fk_state_id: stateSelect,
        fk_city_id: citySelect,
        zip_code: pinCode,
        address: schoolAddress,
        phone: phone,
        mobile: mobile,
        email: schoolEmail,
        firm_reg: firmRegNo,
        date: date,
        pan: panNo,
        gst: gstNo,
        business_est: gstYear,
        t_name: proprietorName,
        t_pan: panNoP,
        t_zip_code: pinCodeP,
        t_address: addressP,
        t_phone: phoneP,
        t_mobile: mobileP,
        t_email: emailP,
        credit_limit: creditLimit,
        credit_type: creditLimitType,
        remarks: remarkss,
        students_number: totalNoStudent,
        // classes: classesUpto,
        designation: desig,
        pan_url: panLink,
        gst_url: gstLink,
        adhar: aadharNo,
        adhar_url: adhrLink,

        ab_name: partyBankerName,
        ab_account_no: accNoP,
        ab_acc_type: aofAcc,
        ab_ifsc: ifscP,
        cheque: chekArr,

        good_picks: authArr,
        cash: [
          {
            type: "cash",
            eligibile: cashOption,
          },
        ],
        tod: [
          {
            type: "tod",
            eligibile: todCondition,
            percentages: todPercent,
            percentages_type: todOption,
          },
        ],
        special: specialData,
      };
    } else {
      postData = {
        name: nameOfSchool,
        status_type: aofStatus,
        aof_type: selectType,
        party_type: formik.values.partyType,
        fk_school_id: idOfSchool,
        fk_state_id: stateSelect,
        fk_city_id: citySelect,
        zip_code: pinCode,
        address: schoolAddress,
        phone: phone,
        mobile: mobile,
        email: schoolEmail,
        firm_reg: firmRegNo,
        date: date,
        pan: panNo,
        gst: gstNo,
        business_est: gstYear,
        t_name: proprietorName,
        t_pan: panNoP,
        t_zip_code: pinCodeP,
        t_address: addressP,
        t_phone: phoneP,
        t_mobile: mobileP,
        t_email: emailP,
        credit_limit: creditLimit,
        credit_type: creditLimitType,
        remarks: remarkss,
        students_number: totalNoStudent,
        classes: classesUpto,
        designation: desig,
        pan_url: panLink,
        gst_url: gstLink,
        adhar: aadharNo,
        adhar_url: adhrLink,
        cp: pubArr,

        ab_name: partyBankerName,
        ab_account_no: accNoP,
        ab_acc_type: aofAcc,
        ab_ifsc: ifscP,
        cheque: chekArr,

        good_picks: authArr,
        cash: [
          {
            type: "cash",
            eligibile: cashOption,
          },
        ],
        tod: [
          {
            type: "tod",
            eligibile: todCondition,
            percentages: todPercent,
            percentages_type: todOption,
          },
        ],
        special: specialData,
      };
    }

    console.log(postData);
    const res = await instance({
      url: `sales_data/aof/create`,
      method: "POST",
      data: postData,
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    console.log(res);
    alert(res.data.message);
    // // setCity(city.data.message);
    setTimeout(() => {
      navigate("/aof");
    }, 1000);
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

  const getState = async () => {
    const state = await instance({
      url: "location/state/stateswithcode/get",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(state.data.message);
    setState(state.data.message);
  };

  const getCity = async (id) => {
    // console.log(id);
    const city = await instance({
      url: `location/city/${id}`,
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(city.data.message);
    setCity(city.data.message);
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

  const handleOrderProcessingForm = (value, type) => {
    console.log(value, type);
    switch (type) {
      case "selec_typ":
        if (value.title === "Allied") {
          formik.values.aof_type = "100";
        } else if (value.title === "Eupheus") {
          formik.values.aof_type = "165";
        }
        break;

      case "Designation*":
        formik.values.designation = value;
        break;
      case "Aadhar No *":
        formik.values.AadharNo = value;
        break;
      case "Classes Up to":
        formik.values.classesUpto = value;
        break;
      case "party_type":
        setPartyType(value.title);
        formik.values.partyType = value.title;
        break;
      case "Enter Percentage (TOD)":
        // console.log(value)
        setTodPercent(value);
        break;
      case "Enter Percentage (special)":
        special_obj.percentages = value;

        setSpecialObj(special_obj);
        setSpecialSpecific([{ ...special_obj }]);
        break;
      case "select_schools":
        formik.values.nameOfSchool = value.school_name;
        formik.values.schoolId = value.id;
        break;
      case "Enter Party Name *":
        formik.values.nameOfSchool = value;
        break;

      case "Total no of Students *":
        formik.values.totalNoStudent = value;
        break;
      case "Remarks":
        console.log(value);
        setRemarkss(value);
        break;
      case "aof_status":
        formik.values.aof_status = value.title;
        break;
      case "title_aof":
        let tempArr2 = [...itemsData];
        // let arr1 = []
        for (let ele of tempArr2) {
          if (ele.fk_category_id === value.id) return;
        }

        let tempObj2 = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "items",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          series: value.item_name,
        };

        tempArr2.push(tempObj2);
        // console.log(tempArr2);
        setItemsData(tempArr2);

        break;

      case "Address *":
        formik.values.address = value;
        break;
      case "E-Mail *":
        formik.values.schoolEmail = value;
        break;
      // case "PAN NO":
      //   // console.log(value);
      //   setPanNo(value);
      //   break;
      case "PAN NO *":
        formik.values.panNo = value;
        break;
      case "GST NO *":
        formik.values.GstNo = value;
        break;
      case "GST Year of establishment of business":
        formik.values.gstYearOFEst = value;
        break;
      // case "Name of Proprietor/Partner/Director/Trustee *":
      //   formik.values.truesteeName = value;
      //   break;
      case "Name of Proprietor/Partner/Director/Trustee":
        setProprietorName(value);
        break;
      // case "PAN NO ":
      //   formik.values.truesteePan = value;
      //   break;
      case "items_aof":
        break;
      case "cred_lim_type":
        setcrditLimitType(value.title);
        break;
      case "Credit Limit *":
        setcrditLimit(value);
        break;
      case "Address ":
        setAddressP(value);
        break;
      case "Pin Code ":
        setPinCodeP(value);
        break;
      case "Phone ":
        setPhoneP(value);
        break;
      case "Mobile*":
        // console.log(value);
        setMobileP(value);
        break;
      case "Mobile":
        // console.log(value);
        setMobileP(value);
        break;
      case "E-Mail*":
        // console.log(value);
        setEmailP(value);
        break;

      case "Name and address of the party’s main bankers *":
        // console.log(value);
        setPartyBankerName(value);
        break;
      case "Name and address of the party’s main bankers":
        // console.log(value);
        setPartyBankerName(value);
        break;
      case "Account Number *":
        // console.log(value);
        setAccNoP(value);
        break;
      case "Account Number":
        // console.log(value);
        setAccNoP(value);
        break;
      case "IFSC *":
        // console.log(value);
        setIfscP(value);
        break;
      case "IFSC":
        // console.log(value);
        setIfscP(value);
        break;
      case "aof_acc":
        // console.log(value);
        setAofAcc(value.title);
        break;
      case "publisher":
        let tempArr = [...publisherData];
        for (let ele of tempArr) {
          if (ele.fk_category_id === value.id) return;
        }

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
        // console.log(tempArr);
        setPublisherData(tempArr);

        break;

      case "Pin Code *":
        formik.values.pinCode = value;
        break;

      case "series_aof_item":
        getTitleBySeries(value.id);
        // console.log(value)
        break;

      case "select_state_location":
        formik.values.state = value.id;
        getCity(value.id);
        break;
      case "select_city_location":
        formik.values.city = value.id;
        break;

      case "Mobile *":
        formik.values.mobile = value;
        break;

      case "Phone *":
        formik.values.phone = value;

        break;

      case "Enter Percentage":
        // console.log(value);
        break;

      case "Firm/ Company/Trust Registration Number":
        formik.values.registrationNo = value;
        break;

      case "series_aof":
        let tempArr1 = [...seriesData];
        // let arr1 = []
        for (let ele of tempArr1) {
          if (ele.fk_category_id === value.id) return;
        }

        let tempObj1 = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "series",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          series: value.series,
        };

        tempArr1.push(tempObj1);
        // console.log(tempArr1);
        setSeriesData(tempArr1);

        break;

      case "schools_aof":
        let tempArr3 = [...allSchool];
        // let arr1 = []
        for (let ele of tempArr3) {
          console.log(ele);
          console.log(value);
          if (ele.id === value.id) return;
        }

        let tempObj3 = {
          type: "special",
          eligibile: "yes",
          dis_type: "specific",
          category: "series",
          percentages: "",
          percentages_type: "",
          fk_category_id: value.id,
          series: value.series,
        };

        tempArr3.push(tempObj3);
        console.log(tempArr3);
        setSchoolData(tempArr3);

        break;

      default:
        break;
    }
  };

  const getTitleBySeries = async (id) => {
    const titles = await instance({
      url: `items/getSeriesItem/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    // console.log(titles.data.message)
    setTitle(titles.data.message);
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

  const handleSidebarCollapsed = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
  };

  useEffect(() => {
    getState();
    getSchools();
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

  const formik = useFormik({
    initialValues: {
      // step 1
      aof_type: "",
      partyType: "School",
      nameOfSchool: "",
      schoolId: "",
      designation: "",
      aof_status: "",
      address: "",
      state: "",
      city: "",
      pinCode: "",
      mobile: "",
      phone: "",
      schoolEmail: "",
      totalNoStudent: "",
      classesUpto: "",
      gstYearOFEst: "",
      registrationNo: "",
      schoolDate: "",
      panNo: "",
      panUrl: "",
      GstNo: "",
      GstUrl: "",
      AadharNo: "",
      AadharUrl: "",

      // step 2
      truesteeName: "",
      truesteePan: "",
      truesteePanUrl: "",
      truesteeAddress: "",
      truesteePin: "",
      truesteePhone: "",
      truesteeMobile: "",
      truesteeEmail: "",
      truesteeCreditPub: [],

      // step 3
      nameAndAddressOfPartyBanker: "",
      accountNumber: "",
      typeOfAC: "",
      ifsc: "",
      Cheques: [],

      // step 4
      creditLimit: "",
      authorizedPersons: [],
      TodApplicable: "",
      special: [],
      cash: "",
      remarks: "",
    },

    // validate: () => {
    //   const errors = {};

    //   return errors;
    // },
    onSubmit: async (values) => {
      console.log(values);
      let postData = {
        name: values.nameOfSchool,
        status_type: values.aof_status,
        aof_type: "165",
        party_type: values.partyType,
        fk_school_id: values.schoolId,
        fk_state_id: values.state,
        fk_city_id: values.city,
        zip_code: values.pinCode,
        address: values.address,
        phone: values.phone,
        mobile: values.mobile,
        email: values.schoolEmail,
        firm_reg: values.registrationNo,
        date: values.schoolDate,
        pan: values.panNo,
        gst: values.GstNo,
        business_est: values.gstYearOFEst,
        t_name: values.truesteeName,
        t_pan: values.truesteePan,
        t_zip_code: values.truesteePin,
        t_address: values.truesteeAddress,
        t_phone: values.truesteePhone,
        t_mobile: values.truesteeMobile,
        t_email: values.truesteeEmail,
        credit_limit: values.creditLimit,
        // credit_type: creditLimitType,
        remarks: values.remarks,
        students_number: values.totalNoStudent,
        // classes: classesUpto,
        designation: values.designation,
        pan_url: values.panUrl,
        gst_url: values.GstUrl,
        adhar: values.AadharNo,
        adhar_url: values.AadharUrl,

        ab_name: values.nameAndAddressOfPartyBanker,
        ab_account_no: values.accountNumber,
        ab_acc_type: values.typeOfAC,
        ab_ifsc: values.ifsc,
        cheque: values.Cheques,

        good_picks: values.authorizedPersons,
        cash: [
          {
            type: "cash",
            eligibile: values.cash,
          },
        ],
        tod: [
          {
            type: "tod",
            eligibile: values.TodApplicable,
            // percentages: todPercent,
            // percentages_type: todOption,
          },
        ],
        special: values.special,
      };
      if (values.classesUpto) {
        postData["classes"] = values.classesUpto;
      }
      if (values.truesteeCreditPub.length > 0) {
        postData["cp"] = values.truesteeCreditPub;
      }
      setLoading(true);
      const res = await instance({
        url: `sales_data/aof/create`,
        method: "POST",
        data: postData,
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => setLoading(false));
      setLoading(false);
      console.log(res);
    },
  });

  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Loader loading={loading} />

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
              Account Opening Form
            </h1>
            <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
              <CustomizedSteppers
                activeStep={calActiceStep()}
                steps={["", "", "", ""]}
              />
              {/* step 1 */}
              {steps.step1 ? (
                <Step1
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  allSchool={allSchool}
                  state={state}
                  city={city}
                  formik={formik}
                  partyType={partyType}
                  setSteps={setSteps}
                  setLoading={setLoading}
                />
              ) : null}
              {/* step 2 */}
              {steps.step2 ? (
                <Step2
                  setSteps={setSteps}
                  formik={formik}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  partyType={partyType}
                  setLoading={setLoading}
                />
              ) : null}
              {/* step 3 */}
              {steps.step3 ? (
                <Step3
                  setSteps={setSteps}
                  formik={formik}
                  setLoading={setLoading}
                  partyType={partyType}
                />
              ) : null}
              {/* step 4 */}
              {steps.step4 ? (
                <Step4
                  setSteps={setSteps}
                  formik={formik}
                  setLoading={setLoading}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AOFcreate;
