import React from "react";
import { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { useState } from "react";
import eupheusLogo from "../PDF/eupheusLogo.png";

export const ReturnOrderPdf = () => {
  const { id } = useParams();
  const [pdfData, setPdfData] = useState({});
  useLayoutEffect(() => {
    const getPdfData = async () => {
      const res = await instance({
        url: `sales_data/get-return-details/${id}`,
        method: "GET",
        headers: {
          accesskey: `auth0026c3956e3d0fba`,
        },
      });
      setPdfData(res.data.data);
    };
    getPdfData();
  }, []);
  return (
    <div className="bg-white px-12 py-4 w-[100vw]">
      <div className="flex flex-col gap-2">
        <img width={130} src={eupheusLogo} />

        <h1 className="font-semibold text-xl mb-6">Return Order Details:</h1>
        <div className="flex flex-col gap-2 w-full flex-wrap font-semibold">
          <span>Return Type: {pdfData?.return_type}</span>
          <span>School Code: {pdfData?.school_code}</span>
          <span>Remarks: {pdfData?.remarks}</span>
          <span>Return Reference: {pdfData?.return_ref}</span>
          <span>Amount: {pdfData?.amount}</span>
          <span>Sales Order Number: {pdfData?.sales_order_number}</span>
          <span>Sales Order Date: {pdfData?.sales_order_date}</span>
          <span>Return Date: {pdfData?.return_date}</span>
          <span>School Name: {pdfData?.fk_school?.school_name}</span>
          <span>Customer Name: {pdfData?.fk_bp?.bp_name}</span>
          <span>Transpoter Name: {pdfData?.transporter_name}</span>
          <span>Contact Person Name: {pdfData?.bp_contact?.name}</span>
        </div>
      </div>
      <h1 className="font-semibold text-xl my-6">Return Addresses Details:</h1>
      <div className="w-full flex justify-between">
        {pdfData?.return_processing_addresses?.map((item) => {
          return (
            <div className="w-full flex justify-start flex-col gap-2 font-semibold">
              {item?.fk_addressq?.category === "B" ? (
                <>
                  <span>Billing Address</span>
                  <span>Address: {item?.fk_addressq?.address}</span>
                  <span>Street: {item?.fk_addressq?.street}</span>
                  <span>Block: {item?.fk_addressq?.block}</span>
                  <span>Zip Code: {item?.fk_addressq?.zip_code}</span>
                  <span>GST No. : {item?.fk_addressq?.gst_no}</span>
                </>
              ) : (
                <>
                  <span>Shipping Address</span>
                  <span>Address: Greater Noida warehouse</span>
                  <span>Street: Khasra No. 75, Village Malakpur</span>
                  <span>Block: -</span>
                  <span>Zip Code: 201306</span>
                  <span>GST No. : 09AAJCP2139H1ZA</span>
                </>
              )}
            </div>
          );
        })}
      </div>
      <h1 className="font-semibold text-xl mt-6">
        Return Order Items Details:
      </h1>

      <table className="w-full border-2 my-4">
        <thead className="w-full">
          <tr className="border-2">
            <th>Item Name</th>
            <th>Item Code</th>
            <th>Item Subject</th>
            <th>Item Series</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
          </tr>
        </thead>
        <tbody>
          {pdfData?.return_processing_items?.map((item) => {
            return (
              <tr>
                <td align="center">{item?.item_name}</td>
                <td align="center">{item?.item_code}</td>
                <td align="center">{item?.fk_item?.fk_subject?.subject}</td>
                <td align="center">{item?.series}</td>
                <td align="center">{item?.price}</td>
                <td align="center">{item?.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
