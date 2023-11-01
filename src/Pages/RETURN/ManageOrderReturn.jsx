import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar";
import instance from "../../Instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import BasicButton from "../../Components/Material/Button";
import { ShowError } from "../../util/showError";
import { Backdrop, CircularProgress } from "@mui/material";
import UploadButton from "../../Components/Material/UploadButton";
import axios from "axios";

const ManageOrderReturn = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("manage_return_req");
  const [returnData, setReturnData] = useState([]);
  const sidebarRef = useRef();
  const [loading, setLoading] = useState(false);

  const navInfo = {
    title: "Manage Order Return",
    details: ["Home", " / Manage Order Return"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };
  const getReturnData = async () => {
    const data = await instance({
      url: "sales_data/get-returns",
      method: "GET",
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    setReturnData(data.data.data);
  };
  useLayoutEffect(() => {
    getReturnData();
  }, []);

  const uploadAttachment = async (file, id) => {
    let formdata = new FormData();
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      ShowError("Please Select an image file only");
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
    }).catch(() => {
      setLoading(false);
    });
    let link = res.data;
    if (res.status === 200) {
      const attachment = await instance({
        url: `sales_data/update-return-attachment`,
        method: "PUT",
        data: {
          id: id,
          attachment: link,
        },
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      }).catch(() => {
        setLoading(false);
      });
      if (attachment.data.status === "success") {
        getReturnData();
      }
    } else {
      ShowError("Cannot upload image");
    }
    setLoading(false);
  };

  const getPrint = async (id) => {
    setLoading(true);
    const res = await instance({
      url: `sales_data//get-return-pdf/${id}`,
      method: "GET",
      data: {
        id: id,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    });
    // console.log(res.data.message);
    setLoading(false);

    window.open(res?.data?.data);
  };

  const SubmitReturn = async (id) => {
    setLoading(true);
    const attachment = await instance({
      url: `sales_data/update-return-status`,
      method: "PUT",
      data: {
        id: id,
      },
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
    }).catch(() => {
      setLoading(false);
    });
    if (attachment.data.status === "success") {
      window.alert("Return marked as final submit");
    }
    setLoading(false);
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
          <div
            className={`sm:px-8 px-4 py-3 grid sm:grid-cols-1 grid-cols-1 gap-4 bg-[#141728]`}
          >
            {returnData.map((item, index) => {
              return (
                <div className="flex flex-col gap-2">
                  <div
                    key={index}
                    className="flex font-medium flex-wrap gap-4 text-gray-100 justify-start rounded-md items-start px-4 py-4 bg-slate-600"
                  >
                    <span>Return Type: {item.return_type}</span>
                    <span>Return Reference: {item.return_ref}</span>
                    <span>School Code: {item.school_code}</span>
                    <span>School Name: {item.fk_school.school_name}</span>
                    <span>Sales Order Date: {item.sales_order_date}</span>
                    <span>Return Date: {item.return_date}</span>
                  </div>
                  <div className="flex gap-2">
                    <div onClick={() => getPrint(item?.id)}>
                      <BasicButton size={"small"} text={"Get Print"} />
                    </div>

                    {!item.is_final ? (
                      <UploadButton
                        name={"Upload Attachment"}
                        accept={"image/*"}
                        uploadContent={uploadAttachment}
                        id={item.id}
                      />
                    ) : null}
                    {!item.is_final && item.attachment ? (
                      <div onClick={() => SubmitReturn(item?.id)}>
                        <BasicButton size={"small"} text={"Submit"} />
                      </div>
                    ) : null}
                    {/* {item.is_final ? (
                      <BasicButton size={"small"} text={"Copy to Sap"} />
                    ) : null} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrderReturn;
