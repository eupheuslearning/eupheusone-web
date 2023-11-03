import React, { useEffect, useState } from "react";
import "./Inv.css";
import eupheusLogo from "./eupheusLogo.png";
import { useParams } from "react-router-dom";
import instance from "../../Instance";

import { ToWords } from "to-words";

// var converter = require("number-to-words");
const toWords = new ToWords();

// let words = toWords.convert(120003);
// console.log(words)
// console.log("words")
const Inv = () => {
  const [billTo, setBillTo] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [shipTo, setShipTo] = useState("");
  const [shipToAddress, setshipToAddress] = useState("");
  const [billToGST, setbillToGST] = useState("");
  const [shipToGST, setshipToGST] = useState("");
  const [stateCode, setstateCode] = useState("");
  const [contactPerson, setcontactPerson] = useState("");
  const [mobile, setmobile] = useState("");
  const [invoiceNo, setinvoiceNo] = useState("");
  const [customerCode, setcustomerCode] = useState("");
  const [supplierRef, setsupplierRef] = useState("");
  const [orderNo, setorderNo] = useState("");
  const [dated, setdated] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [otherReference, setotherReference] = useState("");
  const [GRno, setGRno] = useState("");
  const [dispatchDocNo, setdispatchDocNo] = useState("");
  const [dispatchThrough, setdispatchThrough] = useState("");
  const [LRno, setLRno] = useState("");
  const [GRdate, setGRdate] = useState("");
  const [noOfBox, setnoOfBox] = useState("");
  const [motorVehicleNo, setmotorVehicleNo] = useState("");
  const [termsOfDelivery, settermsOfDelivery] = useState("");
  const [total, settotal] = useState("");
  const [taxedAmount, setTaxedAmount] = useState("");
  const [tableData, setTableData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState("");
  const [freightCharge, setFreightCharge] = useState("");
  const [curr, setCurr] = useState("");
  const [invType, setInvType] = useState("");
  const [gstNum, setGstNum] = useState("09AAJCP2139H1ZA");
  const [amntChrgbleWord, setamntChrgbleWord] = useState("");
  const [totalRup, setTotalRup] = useState("");
  const [taxAmnt, setTaxAmnt] = useState("");
  const [vatSum, setVatSum] = useState("");
  const [cinNum, setCinNum] = useState("");
  const [remarks, setRemarks] = useState("");
  useEffect(() => {
    getAllData();
  }, []);

  const { docnum, docdate } = useParams();
  const getAllData = async () => {
    // const res = await axios
    //   .post(
    //     `http://192.168.7.148:5070/api/doc_print/invoice/detail`,
    //     {
    //       category: "inv",
    //       doc_num: docnum,
    //       doc_date: docdate,
    //     },
    //     {
    //       headers: {
    //         accesskey: ``,
    //       },
    //     }
    //   )
    //   .catch((e) => {
    //     console.log(e.message);
    //   });

    // console.log(process.env.CRM_V2KEY)

    const res = await instance({
      url: `doc_print/invoice/detail`,
      method: "post",
      data: {
        category: "inv",
        doc_num: docnum,
        doc_date: docdate,
      },
      headers: {
        // Authorization: Cookies.get("accessToken"),
        // accesskey: `auth74961a98ba76d4e4`,
        accesskey: `auth0026c3956e3d0fba`,
      },
    });
    let data = res.data.message.message[0];
    console.log(data);
    setCinNum(data.cin);
    setBillTo(data.bill_to[0]);
    setBillToAddress(data.bill_to[1]);
    setShipTo(data.SHIPTOCODE);
    setshipToAddress(data.SHIP_TO);
    setbillToGST(data.Bill_to_GST_No);
    setshipToGST(data.ship_to_gst);
    setcontactPerson(data.contact_person_name);
    setmobile(data.mobile_no);
    setinvoiceNo(data.Invoice_No);
    setcustomerCode(data.CARDCODE);
    setsupplierRef(data.Ref_No);
    setorderNo(data.order_no);
    setdated(data.DOCDATE);
    setcustomerName(data.CARDNAME);
    setotherReference(data.other_ref);
    setGRno(data.U_GRNO);
    setdispatchDocNo(data.Dispatch_No);
    setdispatchThrough(data.Transporter_Name);
    setLRno(data.LRNo);
    setGRdate(data.GR_Date);
    setRemarks(data.remarrks);
    setnoOfBox(data.U_Boxes);
    setmotorVehicleNo(data.U_UNE_VEH_NO);
    settermsOfDelivery(data.delivery_term);
    settotal(data.total);
    setTaxedAmount(data.tax_amount);
    setstateCode(data.state_code);
    setFreightCharge(data.Freight_charges);
    setCurr(data.CUR);
    setInvType(data.inv_type);

    // {`${curr} ${converter.toWords(Number(total.slice(-2)))} Only`}

    let cnv = data.total.toString();
    cnv = parseFloat(cnv).toFixed(2);
    // console.log(cnv);

    let sp = cnv.split(".");
    let rup = parseInt(sp[0]);
    let pai = parseInt(sp[1]);
    // setRupee(parseInt(sp[0]));
    // setPaise(parseInt(sp[1]));

    let totalR = "";
    let paiseR = "";
    let totalT = "";
    // console.log(rup)
    // console.log(pai)
    if (rup != 0) {
      // totalR = converter.toWords(rup);
      totalR = toWords.convert(rup);
      //  console.log(totalR);
      //  console.log(typeof(rup))
    }
    if (pai != 0) {
      // paiseR = converter.toWords(pai);
      paiseR = toWords.convert(pai);
    }

    if (paiseR != "") {
      totalT = totalR + " And " + paiseR + " paise only";
    } else {
      totalT = totalR + " only";
    }
    // console.log(totalT)
    let words = totalT.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    totalT = words.join(" ");
    // console.log(totalT);

    setTotalRup(totalT);

    let cnvTax = data.tax_amount.toString();
    cnvTax = parseFloat(cnvTax).toFixed(2);
    // console.log(typeof(cnv));

    let spTax = cnvTax.split(".");
    let rupTax = parseInt(spTax[0]);
    let paiTax = parseInt(spTax[1]);
    // setRupee(parseInt(sp[0]));
    // setPaise(parseInt(sp[1]));

    let totalRTax = "";
    let paiseTax = "";
    let totalTTax = "";
    if (rupTax != 0) {
      // totalRTax = converter.toWords(rupTax);
      totalRTax = toWords.convert(rupTax);
      //  console.log(totalR);
      //  console.log(typeof(rup))
    }
    if (paiTax != 0) {
      // paiseTax = converter.toWords(paiTax);
      paiseTax = toWords.convert(paiTax);
    }

    if (paiseTax != "") {
      totalTTax = totalRTax + " And " + paiseTax + " paise only";
    } else {
      // console.log(totalRTax)
      totalTTax = totalRTax + "zero only";
    }
    // console.log(totalTTax)
    let wordsTax = totalTTax.split(" ");

    for (let i = 0; i < wordsTax.length; i++) {
      wordsTax[i] = wordsTax[i].charAt(0).toUpperCase() + wordsTax[i].slice(1);
    }
    totalTTax = wordsTax.join(" ");
    // console.log(totalTTax);
    setTaxAmnt(totalTTax);

    if (data.inv_type === "TAX INVOICE") setGstNum("07AAJCP2139H1ZE");
    else if (data.inv_type === "EXPORT INVOICE") setGstNum("09AAJCP2139H1ZA");

    let dataTable = res.data.message.items;
    let totalQuant = 0;

    console.log(dataTable);

    let untxAmnt = 0;
    for (let obj of dataTable) {
      untxAmnt = untxAmnt + obj.VATSUM;
    }
    // console.log(untxAmnt)
    setVatSum(untxAmnt);

    for (let obj of dataTable) {
      // console.log(obj);
      totalQuant += obj.quantity;
    }
    let srl = 1;
    for (let obj of dataTable) {
      obj.slNo = srl;
      srl++;
    }
    // console.log(totalQuant)
    setTotalQuantity(totalQuant);
    // console.log(dataTable)
    setTableData(dataTable);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <img width={130} src={eupheusLogo} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr
        style={{
          borderWidth: "1px",
          marginTop: "0.3em",
          marginBottom: "0.3em",
          width: "100%",
        }}
      />
      <p
        style={{
          paddingTop: "2pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          lineHeight: "11pt",
          textAlign: "left",
          fontSize: "13pt",
        }}
      >
        Proficiency Learning Solutions Pvt Ltd.,
      </p>
      <p
        style={{
          paddingTop: "4pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "9pt",
        }}
      >
        Khasra No. 75, Village Malakpur, Ecotech-2, Opp. NTPC Ltd.(Netra)
        Greater Noida, Gautam Budh Nagar, Uttar Pradesh, Pin -201306
      </p>

      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>
      <p style={{ textIndent: "0pt", textAlign: "left" }}></p>
      <h1
        style={{
          paddingTop: "0",
          paddingBottom: "1pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
          fontSize: "9pt",
        }}
      >
        IRN No<span className="p">:</span>
      </h1>
      <table
        style={{ borderCollapse: "collapse", marginLeft: "6.75pt" }}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ height: "22pt" }}>
            <td
              style={{
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={13}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "223pt",
                  paddingRight: "240pt",
                  textIndent: "0pt",
                  lineHeight: "8.2pt",
                  textAlign: "center",
                  fontSize: "9pt",
                }}
              >
                {invType}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "20pt" }}>
            <td
              style={{
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
              rowSpan={3}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "5pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                  fontStyle: "bold",
                }}
              >
                Bill To :
              </p>
              <p
                className="s2"
                style={{
                  paddingTop: "6pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                  fontStyle: "bold",
                }}
              >
                {/* MKK Enterprises */}
                {billTo}
              </p>
              {/* <p
                className="s3"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                F-2/13 Ratiya Marg Sangam Vihar,MKK Enterprises,
                {billToAddress}
              </p> */}

              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  paddingRight: "94pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* New Delhi - 110080 Delhi - INDIA */}
                {billToAddress}
              </p>
            </td>
            <td
              style={{
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  paddingTop: "5pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Invoice No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* RI/52941/20-21 */}
                {invoiceNo}
              </p>
            </td>
            <td
              style={{
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "5pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Dated
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* 25/02/2021 */}
                {dated}
              </p>
            </td>
            <td
              style={{
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "45pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "23pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Customer Code
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* CBP000211 */}
                {customerCode}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "5pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Customer Name
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* MKK Enterprises */}
                {customerName}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "22pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Supplier's Ref
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* Test supplier Ref */}
                {supplierRef}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Other Reference
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* Test Other Ref */}
                {otherReference}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                GSTIN Number :
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* TEST GST NUMBER */}
                {billToGST}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "30pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  paddingTop: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Order No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* 23471 */}
                {orderNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                GR No
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "0pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* DL 1LX 6955 */}
                {GRno}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "15pt" }}>
            <td
              style={{
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Ship To :
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Dispatch Doc No.
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                GR Date
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "24pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                  paddingTop: "5pt",
                }}
              >
                {/* Mkk Enterprises */}
                {shipTo}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* 23780 */}
                {dispatchDocNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s5"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "11pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* 25-February-2021 */}
                {GRdate}
              </p>
            </td>
          </tr>
          <tr style={{ height: "39pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "2pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* F-2/13 Ratiya Marg Sangam Vihar New Delhi,MKK Enterprises -
                110080 */}
                {shipToAddress}
              </p>

              {/* <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                }}
              >
                Delhi - INDIA
                {shipToAddress}
              </p> */}
              <p
                className="s1"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                State Code :{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  {stateCode}
                </span>
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "23pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Dispatch Through
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* A V R N */}
                {dispatchThrough}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                No of Boxes
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* 17 */}
                {noOfBox}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "23pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Bill of Ladding/LR-RR No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* Test Bill of Ladding */}
                {LRno}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "5pt",
                  paddingTop: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Motor Vehicle No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* Test Motor Vehicle No */}
                {motorVehicleNo}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Contact Person :{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  {contactPerson}
                </span>
              </p>
              <p
                className="s1"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "5pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* Mobile : <span className="s3">9582400777</span> */}
                Mobile :{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  {mobile}
                </span>
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "371pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={3}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              ></p>
            </td>
            <td
              style={{
                width: "371pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Terms of Delivery:{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  {termsOfDelivery}
                </span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={4}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                GSTIN Number :{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  {shipToGST}
                </span>
              </p>
            </td>
            <td
              style={{
                width: "371pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={9}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                S.No
              </p>
            </td>
            <td
              style={{
                width: "44pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "7pt",
                }}
              >
                HSN/SAC
              </p>
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                  fontSize: "7pt",
                }}
              >
                Code
              </p>
            </td>
            <td
              style={{
                width: "130pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "30pt",
                  paddingRight: "14pt",
                  textIndent: "-14pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Description of Goods
              </p>
            </td>
            <td
              style={{
                width: "35pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "10.2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Quantity
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Disc
              </p>
              <p
                className="s1"
                style={{
                  marginTop: "3pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                %
              </p>
            </td>
            <td
              style={{
                width: "50pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "50pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "10.2pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                {/* CGST [INR] */}
                CGST [{curr}]
              </p>
            </td>
            <td
              style={{
                width: "50pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                {/* SGST[INR] */}
                SGST[{curr}]
              </p>
            </td>
            <td
              style={{
                width: "50pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "8pt",
                  paddingLeft: "19pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                {/* IGST [INR] */}
                IGST[{curr}]
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "7pt",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>

          {/* start of first row */}

          {/* <div style={{ height: 400, width: '100%' }}>
          <DataGrid
        rows={tableData}
        // columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        />
        </div> */}

          {tableData.map((item) => {
            return (
              <tr style={{ height: "40pt" }}>
                <td
                  style={{
                    width: "17pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "3pt",
                      textIndent: "0pt",
                      textAlign: "center",
                      fontSize: "9pt",
                    }}
                  >
                    {item.slNo}
                  </p>
                </td>

                <td
                  style={{
                    width: "44pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "6pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {item.hsc_code}
                  </p>
                </td>
                <td
                  style={{
                    width: "97pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "5pt",
                      paddingLeft: "5pt",
                      paddingRight: "14pt",
                      textIndent: "0pt",
                      lineHeight: "10pt",
                      textAlign: "left",
                      fontSize: "8pt",
                      lineHeight: "10.2pt",
                    }}
                  >
                    {/* WOW! Mathematics -CBSE Book 6 */}
                    {item.item_name}
                  </p>
                </td>
                <td
                  style={{
                    width: "64pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "6pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 240.00 */}
                    {parseFloat(item.quantity).toFixed(2)}
                    {/* {item.quantity} */}
                  </p>
                </td>
                <td
                  style={{
                    width: "48pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 490.00 */}
                    {/* {item.PRICE} */}
                    {parseFloat(item.PRICE).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "25pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 20.00 */}
                    {/* {item.DiscPrcnt} */}
                    {parseFloat(item.DiscPrcnt).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "57pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "7pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 94080.00 */}
                    {/* {item.VATSUM} */}
                    {parseFloat(item.VATSUM).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "25pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 0.00 */}
                    {/* {item.CGSTRATE} */}
                    {parseFloat(item.CGSTRATE).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "36pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "4pt",
                      paddingLeft: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* {item.CGSTAMNT} */}
                    {parseFloat(item.CGSTAMNT).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "30pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 0.00 */}
                    {/* {item.SGSTRATE} */}
                    {parseFloat(item.SGSTRATE).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "36pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 0.00 */}
                    {/* {item.SGSTAMNT} */}
                    {parseFloat(item.SGSTAMNT).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "30pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "2pt",
                      paddingLeft: "3pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 0.00 */}
                    {/* {item.IGSTRATE} */}
                    {parseFloat(item.IGSTRATE).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "48pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderRightStyle: "solid",
                    borderRightWidth: "1pt",
                  }}
                >
                  <p
                    className="s3"
                    style={{
                      paddingTop: "3pt",
                      paddingLeft: "2pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    {/* 0.00 */}
                    {/* {item.IGSTAMNT} */}
                    {parseFloat(item.IGSTAMNT).toFixed(2)}
                  </p>
                </td>
                <td
                  style={{
                    width: "6pt",
                    borderTopStyle: "solid",
                    borderTopWidth: "1pt",
                    borderLeftStyle: "solid",
                    borderLeftWidth: "1pt",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "1pt",
                  }}
                  rowSpan={1}
                >
                  <p style={{ textIndent: "0pt", textAlign: "left" }}>
                    <br />
                  </p>
                </td>
              </tr>
            );
          })}

          {/* end of first row */}

          {/* <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "center",
                }}
              >
                1
              </p>
            </td>

            <td
              style={{
                width: "44pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                490199
              </p>
            </td>
            <td
              style={{
                width: "97pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  paddingRight: "14pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                }}
              >
                WOW! Mathematics -CBSE Book 6
              </p>
            </td>
            <td
              style={{
                width: "64pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                240.00
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                490.00
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                20.00
              </p>
            </td>
            <td
              style={{
                width: "57pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "7pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                94080.00
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "36pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "3pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p
                className="s3"
                style={{
                  paddingTop: "3pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                0.00
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={1}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr> */}

          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "44pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "97pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "9pt",
                  textIndent: "0pt",
                  textAlign: "right",
                  fontSize: "8pt",
                }}
              >
                Total:
              </p>
            </td>
            <td
              style={{
                width: "64pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* 720 */}
                {totalQuantity}
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "25pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "29pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "11pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "102pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={2}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "45pt" }}>
            <td
              style={{
                width: "360pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Amount Chargeable (In Words) :
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* INR Two Lakhs Eighty-Two Thousand Two Hundred Forty */}
                {`${curr} ${totalRup}`}
              </p>
            </td>
            <td
              style={{
                width: "200pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={6}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {/* Untaxed Amount :- INR 282240.00  */}
                {`Untaxed Amount :- ${curr} ${parseFloat(vatSum).toFixed(2)}`}
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Freight :- {`${curr} `}{" "}
                {parseFloat(freightCharge ? freightCharge : 0).toFixed(2)}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Tax Amount (In Words) :{`${curr} ${taxAmnt}`}
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  marginTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Taxable
              </p>
            </td>
            <td
              style={{
                width: "11pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "102pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s2"
                style={{
                  marginTop: "4pt",
                  paddingLeft: "21pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                :- {`${curr} `} {taxedAmount}
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Remarks
                <span
                  className="s9"
                  style={{
                    fontSize: "9pt",
                  }}
                >
                  :- {remarks}
                </span>
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Total
              </p>
            </td>
            <td
              style={{
                width: "11pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "102pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              colSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "19pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                {`:- ${curr} ${parseFloat(total).toFixed(2)}`}
              </p>
            </td>
            <td
              style={{
                width: "30pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Company's Bank Details
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Company's PAN :{" "}
                <span className="s10" style={{ fontSize: "8pt" }}>
                  AAJCP2139H
                </span>
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
              rowSpan={4}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Name of Account :{" "}
                <span className="s10" style={{ fontSize: "8pt" }}>
                  Proficiency Learning Solutions Private Limited
                </span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "10.2pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s1"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Bank Name :{" "}
                <span
                  className="s10"
                  style={{
                    fontSize: "8pt",
                  }}
                >
                  Axis Bank Limited
                </span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "11pt",
                }}
              >
                CIN:{" "}
                <span className="s10" style={{ fontSize: "8pt" }}>
                  {/* U80904PB2016PTC054953 */}
                  {cinNum}
                </span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                A/c No :{" "}
                <span className="s10" style={{ fontSize: "8pt" }}>
                  922030062639998
                </span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                GSTIN/UIN :{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  {gstNum}
                </span>
              </p>
            </td>
          </tr>

          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                IFSC Code :{" "}
                <span className="s10" style={{ fontSize: "8pt" }}>
                  UTIB0001609
                </span>
              </p>
            </td>

            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                MSMED:{" "}
                <span className="s3" style={{ fontSize: "8pt" }}>
                  DL09E0003137
                </span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "9pt",
                }}
              >
                Bank Branch :{" "}
                <span className="s10" style={{ fontSize: "8pt" }}>
                  Corporate Banking Branch, New Delhi.
                </span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "50pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              {!taxedAmount || taxedAmount == 0 ? (
                <div>
                  <p
                    className="s11"
                    style={{
                      paddingTop: "5pt",
                      paddingLeft: "1pt",
                      paddingRight: "77pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    Declaration: We declare that this invoice shows the actual
                    price of the goods described and that all particulars are
                    true and correct.
                  </p>
                  <p
                    className="s11"
                    style={{
                      paddingLeft: "1pt",
                      paddingRight: "44pt",
                      textIndent: "0pt",
                      textAlign: "left",
                      fontSize: "8pt",
                    }}
                  >
                    No E-Way Bill Required as notified under Annexure to Rule
                    138 (14) (a) of CGST Rule 2017 for HSN Code 4901 for Printed
                    Books. (Notification No. 27/2017 Dt 30th August, 2017).
                  </p>
                </div>
              ) : (
                ""
              )}
            </td>
            <td
              style={{
                width: "239pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              colSpan={7}
            >
              <p
                className="s4"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                For Proficiency Learning Solutions Private Limited
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s12"
                style={{
                  marginTop: "10.2pt",
                  paddingLeft: "149pt",
                  textIndent: "0pt",
                  textAlign: "left",
                  fontSize: "8pt",
                }}
              >
                Authorised Signatory
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Inv;
