import React, {useEffect, useState} from "react";
import "./Inv.css";
import eupheusLogo from "./eupheusLogo.png";
import axios from "axios";
import Cookies from "js-cookie";
var converter = require('number-to-words')


const Inv = () => {

  const [data, setData] = useState({
    billTo:"",
    billToAddress:"",
    shipTo:"",
    shipToAddress:"",
    billToGST:"",
    shipToGST:"",
    stateCode:"",
    contactPerson:"",
    mobile:"",
    invoiceNo:"",
    customerCode:"",
    supplierRef:"",
    orderNo:"",
    dated:"",
    customerName:"",
    otherReference:"",
    GRno:"",
    dispatchDocNo:"",
    dispatchThrough:"",
    LRno:"",
    GRdate:"",
    noOfBox:"",
    motorVehicleNo:"",
    termsOfDelivery:"",
    total:"",
    untaxedAmount:"",

  })


  useEffect(() => {
    getAllData()
  },[])

  const getAllData = async () => {

    // const res = await axios.post(`http://192.168.7.148:5070/api/doc_print/invoice/detail`,
    //  {
    //     "category":"inv",
    //     "doc_num":"21344",
    //     "doc_date":"2021-02-23"
    // },
    // {  headers: {
    //     Authorization: `${Cookies.get("accessToken")}`,
    //   },}
    // );
    
    // console.log(res);
    setData({
      billTo: "newData",
      untaxedAmount: "282240"
    })
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <img width={221} height={56} src={eupheusLogo} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr
        style={{
          borderWidth: "2px",
          marginTop: "0.5em",
          marginBottom: "0.5em",
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
        }}
      >
        Proficiency Learning Solutions Pvt Ltd.,
      </p>
      <p
        style={{
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
        }}
      >
        Khasra No. 75, Village Malakpur, Ecotech-2, Opp. NTPC Ltd.(Netra)
        Greater Noida, Gautam Budh Nagar, Uttar Pradesh
      </p>
      <p
        style={{
          paddingLeft: "11pt",
          textIndent: "0pt",
          lineHeight: "11pt",
          textAlign: "left",
        }}
      >
        Pin -201306
      </p>
      <p style={{ textIndent: "0pt", textAlign: "left" }}>
        <br />
      </p>
      <p style={{ textIndent: "0pt", textAlign: "left" }}></p>
      <h1
        style={{
          paddingTop: "8pt",
          paddingBottom: "2pt",
          paddingLeft: "11pt",
          textIndent: "0pt",
          textAlign: "left",
        }}
      >
        IRN No<span className="p">:</span>
      </h1>
      <table
        style={{ borderCollapse: "collapse", marginLeft: "6.75pt" }}
        cellSpacing={0}
      >
        <tbody>
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "1030pt",
                borderTopStyle: "solid",
                borderTopWidth: "2pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={13}
            >
              <p
                className="s1"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "223pt",
                  paddingRight: "240pt",
                  textIndent: "0pt",
                  lineHeight: "12pt",
                  textAlign: "center",
                }}
              >
                BILL OF SUPPLY
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "2pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "35pt" }}>
            <td
              style={{
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={3}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                }}
              >
                {/* MKK Enterprises */}
                {data.billTo}
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* F-2/13 Ratiya Marg Sangam Vihar,MKK Enterprises, */}
                {data.billToAddress}
              </p>

              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  paddingRight: "94pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* New Delhi - 110080 Delhi - INDIA */}
                {data.billToAddress}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                Invoice No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "12pt",
                  textAlign: "left",
                }}
              >
                {/* RI/52941/20-21 */}
                {data.invoiceNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                Dated
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* 25/02/2021 */}
                {data.dated}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "39pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
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
                }}
              >
                {/* CBP000211 */}
                {data.customerCode}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
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
                }}
              >
                {/* MKK Enterprises */}
                {data.customerName}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "25pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                }}
              >
              {/* Test supplier Ref */}
                {data.supplierRef}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                }}
              >
                {/* Test Other Ref */}
                {data.otherReference}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
          <tr style={{ height: "18pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "5pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                GSTIN Number :
              </p>
              <p
                className="s3"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  paddingRight: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* TEST GST NUMBER */}
                {data.billToGST}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "38pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                Order No.
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "7pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* 23471 */}
                {data.orderNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                GR No
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* DL 1LX 6955 */}
                {data.GRno}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
                width: "186pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
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
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
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
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
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
                borderLeftWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
              >
                {/* Mkk Enterprises */}
                {data.shipTo}
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                {/* 23780 */}
                {data.dispatchDocNo}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                {/* 25-February-2021 */}
                {data.GRdate}
              </p>
            </td>
          </tr>
          <tr style={{ height: "39pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                {/* F-2/13 Ratiya Marg Sangam Vihar New Delhi,MKK Enterprises -
                110080 */}
                {data.shipToAddress}
              </p>

              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                {/* Delhi - INDIA */}
                {data.shipToAddress}
              </p>
              <p
                className="s2"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                State Code : <span className="s3">{data.stateCode}</span>
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
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
                }}
              >
                {/* A V R N */}
                {data.dispatchThrough}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                No of Boxes
              </p>
              <p
                className="s5"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* 17 */}
                {data.noOfBox}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "33pt" }}>
            <td
              style={{
                width: "180pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
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
                }}
              >
                {/* Test Bill of Ladding */}
                {data.LRno}
              </p>
            </td>
            <td
              style={{
                width: "191pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p
                className="s10"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
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
                }}
              >
                {/* Test Motor Vehicle No */}
                {data.motorVehicleNo}
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
          <tr style={{ height: "12pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
              rowSpan={2}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                Contact Person :{" "}
                {/* <span className="s3">Ksk academy senior secondar</span> */}
                <span className="s3">{data.contactPerson}</span>
              </p>
              <p
                className="s2"
                style={{
                  paddingTop: "9pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "9pt",
                  textAlign: "left",
                }}
              >
                {/* Mobile : <span className="s3">9582400777</span> */}
                Mobile : <span className="s3">{data.mobile}</span>
              </p>
            </td>
            <td
              style={{
                width: "180pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={5}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "4pt" }}>
            <td
              style={{
                width: "371pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
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
          <tr style={{ height: "12pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={9}
            >
              <p
                className="s6"
                style={{
                  paddingLeft: "23pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                }}
              >
                Terms of Delivery: <span className="s3">{data.termsOfDelivery}</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "23pt" }}>
            <td
              style={{
                width: "186pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={4}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  lineHeight: "10pt",
                  textAlign: "left",
                }}
              >
                GSTIN Number : <span className="s3">{data.shipToGST}</span>
              </p>
            </td>
            <td
              style={{
                width: "371pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "1pt",
              }}
              rowSpan={2}
            >
              <p
                className="s7"
                style={{
                  paddingTop: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                }}
              >
                HSN/SAC
              </p>
              <p
                className="s8"
                style={{
                  paddingLeft: "6pt",
                  paddingRight: "1pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "center",
                }}
              >
                Code
              </p>
            </td>
            <td
              style={{
                width: "97pt",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "30pt",
                  paddingRight: "14pt",
                  textIndent: "-14pt",
                  textAlign: "left",
                }}
              >
                Description of Goods
              </p>
            </td>
            <td
              style={{
                width: "64pt",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "15pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Quantity
              </p>
            </td>
            <td
              style={{
                width: "48pt",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                Disc
              </p>
              <p
                className="s8"
                style={{
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                %
              </p>
            </td>
            <td
              style={{
                width: "57pt",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "16pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Amount
              </p>
            </td>
            <td
              style={{
                width: "61pt",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "13pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                CGST [INR]
              </p>
            </td>
            <td
              style={{
                width: "66pt",
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
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "20pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                SGST[INR]
              </p>
            </td>
            <td
              style={{
                width: "78pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={2}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "19pt",
                  textIndent: "0pt",
                  lineHeight: "8pt",
                  textAlign: "left",
                }}
              >
                IGST [INR]
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "19pt" }}>
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "6pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "36pt",
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "4pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "36pt",
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Rate
              </p>
            </td>
            <td
              style={{
                width: "48pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "1pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
            >
              <p
                className="s8"
                style={{
                  paddingTop: "2pt",
                  paddingLeft: "10pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                borderLeftWidth: "2pt",
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
{/*               
          <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
                  paddingTop: "1pt",
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
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
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

        {/* end of first row */}



          {/* <tr style={{ height: "28pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
                  paddingTop: "1pt",
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
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
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

          <tr style={{ height: "34pt" }}>
            <td
              style={{
                width: "17pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
                className="s4"
                style={{
                  paddingTop: "5pt",
                  paddingRight: "9pt",
                  textIndent: "0pt",
                  textAlign: "right",
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
                  paddingTop: "4pt",
                  paddingLeft: "20pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                720
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
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "48pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                }}
              >
                {/* INR Two Lakhs Eighty-Two Thousand Two Hundred Forty */}
                {`INR ${converter.toWords(Number(data.untaxedAmount))}`}
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                {/* Untaxed Amount :- INR 282240.00  */}
                {`Untaxed Amount :- INR ${data.untaxedAmount}`}
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
                }}
              >
                Freight :- INR 0.00
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
            </td>
          </tr>
          <tr style={{ height: "49pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                Tax Amount (In Words) :
              </p>
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s3"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                INR Zero Only
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
              <p style={{ textIndent: "0pt", textAlign: "left" }}>
                <br />
              </p>
              <p
                className="s2"
                style={{
                  paddingLeft: "21pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                :- INR 0.00
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
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                Remarks
                <span className="s9">
                  :- Based On Sales Orders 23471. Based On Deliveries 23780.
                </span>
              </p>
            </td>
            <td
              style={{
                width: "42pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
              }}
            >
              <p
                className="s2"
                style={{
                  paddingTop: "4pt",
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
                }}
              >
               
                {`:- INR ${data.untaxedAmount}`}
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
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
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
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                Company's PAN : <span className="s10">AAJCP2139H</span>
              </p>
            </td>
            <td
              style={{
                width: "6pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
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
          <tr style={{ height: "12pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                Bank Name :{" "}
                <span className="s10">ICICI BANK,SAKET WEALTH BRANCH</span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                CIN: <span className="s10">U80904DL2016PTC309293</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "12pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                }}
              >
                A/c No : <span className="s10">164705000227</span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                GSTIN/UIN : <span className="s3">09AAJCP2139H1ZA</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "20pt" }}>
            <td
              style={{
                width: "324pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "2pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                IFSC Code : <span className="s10">ICIC0001647</span>
              </p>
            </td>
            <td
              style={{
                width: "233pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={6}
            >
              <p
                className="s2"
                style={{
                  paddingLeft: "5pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                MSMED: <span className="s3">DL09E0003137</span>
              </p>
            </td>
          </tr>
          <tr style={{ height: "63pt" }}>
            <td
              style={{
                width: "324pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
              }}
              colSpan={7}
            >
              <p
                className="s11"
                style={{
                  paddingTop: "1pt",
                  paddingLeft: "1pt",
                  paddingRight: "77pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                Declaration: We declare that this invoice shows the actual price
                of the goods described and that all particulars are true and
                correct.
              </p>
              <p
                className="s11"
                style={{
                  paddingLeft: "1pt",
                  paddingRight: "44pt",
                  textIndent: "0pt",
                  textAlign: "left",
                }}
              >
                No E-Way Bill Required as notified under Annexure to Rule 138
                (14) (a) of CGST Rule 2017 for HSN Code 4901 for Printed Books.
                (Notification No. 27/2017 Dt 30th August, 2017).
              </p>
            </td>
            <td
              style={{
                width: "239pt",
                borderTopStyle: "solid",
                borderTopWidth: "1pt",
                borderLeftStyle: "solid",
                borderLeftWidth: "2pt",
                borderBottomStyle: "solid",
                borderBottomWidth: "1pt",
                borderRightStyle: "solid",
                borderRightWidth: "2pt",
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
                  marginTop: "15pt",
                  paddingLeft: "149pt",
                  textIndent: "0pt",
                  textAlign: "left",
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
