import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useRef } from "react";
import { useLayoutEffect } from "react";
import instance from "../Instance";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DataTable from "../Components/DataTable";
import BasicButton from "../Components/Material/Button";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const Reimbursment = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState({
    start: "2023-04-01",
    end: "2024-03-31",
  });
  const [chartData, setChartData] = useState({});
  const [xlData, setXlData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const sidebarRef = useRef();
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const show = null;

  const navInfo = {
    title: "Reimbursement Report",
    details: ["Home", "/ Reimbursement Report"],
  };

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };
  const getReimbursmentData = async () => {
    setLoading(true);
    const userData = await instance({
      url: "user/profile",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
    });
    const ReimbursmentData = await instance({
      url: "doc_print/statement/detail",
      method: "POST",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
      },
      data: {
        startDate: year.start,
        endDate: year.end,
        employeeId: "R" + userData.data.message.emp_id,
      },
    });
    let chartData = {
      expense: 0,
      reimbursment: 0,
    };
    let tableData = [];
    ReimbursmentData.data.data.data.map((item, index) => {
      let tableObj = {
        id: index,
        Amount: Math.abs(item["C/D (LC)"]),
        documentNumber: item["Document Number"],
        Details: item.Details,
        docDate: item.DocDate[0]?.split("T")[0],
      };
      if (item.Document === "JE Entry") {
        tableObj.Type = "Expense";
        chartData.expense += Math.abs(item["C/D (LC)"]);
      } else if (item.Document === "Outgoing Payment") {
        tableObj.Type = "Reimbursment";
        chartData.reimbursment += Math.abs(item["C/D (LC)"]);
      }
      tableData.push(tableObj);
    });
    setTableData(tableData);
    setChartData(chartData);
    setLoading(false);
  };
  useLayoutEffect(() => {
    getReimbursmentData();
  }, [year]);

  //   const exportToCSV = async (name) => {
  //     if (name === "sales") {
  //       let columnsName = ["SNo", "Customer", "Sales"];
  //       const fileType =
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //       const fileExtension = ".xlsx";

  //       let reqExportData = [];
  //       console.log(xlData);
  //       for (let i = 0; i < xlData.length; i++) {
  //         const obj = xlData[i];
  //         if (obj.customer != null && obj.total != null) {
  //           let reqObj = {
  //             SNo: i + 1,
  //             Customer: obj.customer,
  //             Sales: obj.total,
  //           };
  //           reqExportData.push(reqObj);
  //         }
  //       }
  //       console.log(reqExportData);

  //       let fileName = "sales_report";
  //       const ws = XLSX.utils.json_to_sheet(reqExportData);
  //       /* custom headers */
  //       XLSX.utils.sheet_add_aoa(ws, [columnsName], {
  //         origin: "A1",
  //       });
  //       const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //       const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //       const data = new Blob([excelBuffer], { type: fileType });
  //       FileSaver.saveAs(data, fileName + fileExtension);
  //     } else if (name === "collection") {
  //       let columnsName = [
  //         "SNo",
  //         "Doc_Entry",
  //         "Doc_Number",
  //         "Doc_Date",
  //         "Type",
  //         "Customer_Name",
  //         "Amount",
  //       ];
  //       const fileType =
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //       const fileExtension = ".xlsx";

  //       let reqExportData = [];
  //       console.log(xlData);
  //       for (let i = 0; i < collXlData.length; i++) {
  //         const obj = collXlData[i];
  //         // if (obj.customer != null && obj.total != null) {
  //         let reqObj = {
  //           SNo: i + 1,
  //           Doc_Entry: obj?.DocEntry,
  //           Doc_Number: obj?.DocNum,
  //           Doc_Date: obj?.DocDate.split("T")[0],
  //           Type: obj?.type,
  //           Customer_Name: obj?.Customer_Name,
  //           Amount: obj?.Value,
  //         };
  //         reqExportData.push(reqObj);
  //         // }
  //       }
  //       console.log(reqExportData);

  //       let fileName = "collection_report";
  //       const ws = XLSX.utils.json_to_sheet(reqExportData);
  //       /* custom headers */
  //       XLSX.utils.sheet_add_aoa(ws, [columnsName], {
  //         origin: "A1",
  //       });
  //       const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //       const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //       const data = new Blob([excelBuffer], { type: fileType });
  //       FileSaver.saveAs(data, fileName + fileExtension);
  //     }
  //   };

  useEffect(() => {
    document.title = "CRM - Reimbursement Report";
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

  const changeYear = (year) => {
    console.log(year);
    setLoading(true);
    setYear({ start: year.start, end: year.end });
    setLoading(false);
  };

  const Tablecolumns = [
    {
      field: "Type",
      headerName: "Type",
      width: 200,
    },
    {
      field: "Amount",
      headerName: "Amount",
      width: 200,
    },
    {
      field: "Details",
      headerName: "Details",
      width: 500,
    },
    {
      field: "documentNumber",
      headerName: "Document Number",
      width: 200,
    },
    {
      field: "docDate",
      headerName: "Doc Date",
      width: 200,
    },
  ];

  const exportToCSV = () => {
    let columnsName = [
      "Type",
      "Amount",
      "Details",
      "DocumentNumber",
      "DocDate",
    ];
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    let reqExportData = [];
    for (let i = 0; i < tableData.length; i++) {
      const obj = tableData[i];
      let reqObj = {
        Type: obj.Type,
        Amount: obj.Amount,
        Details: obj.Details,
        DocumentNumber: obj.documentNumber,
        DocDate: obj.docDate,
      };
      reqExportData.push(reqObj);
    }

    let fileName = "reimbursement_report";
    const ws = XLSX.utils.json_to_sheet(reqExportData);
    /* custom headers */
    XLSX.utils.sheet_add_aoa(ws, [columnsName], {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Sidebar
          highLight={"myExpense"}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"myExpense"}
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
            changeYear={changeYear}
            defaultYear={"FY 2023-24"}
          />

          <div className="min-h-[90vh] relative flex w-full justify-center items-center bg-[#141728] flex-col">
            <h1 className="text-gray-100 sm:text-2xl text-base font-semibold absolute top-[2rem] left-[2rem]">
              Reimbursement Report
            </h1>
            <div className="md:w-[50vw] w-full justify-center mt-[5rem] flex">
              <VerticalChart chartData={chartData} />
            </div>
            <div className="w-full flex justify-end px-8" onClick={exportToCSV}>
              <BasicButton size={"small"} text={"Export to Excel"} />
            </div>
            <div className="w-full px-8 mb-5">
              <DataTable
                rows={tableData}
                checkbox={false}
                Tablecolumns={Tablecolumns}
                tableName="reimbursmentTable"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const VerticalChart = ({ chartData }) => {
  console.log(chartData);

  const labels = ["Reimbursement Report"];
  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: [chartData?.expense],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Reimbursement",
        data: [chartData?.reimbursment],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
    plugins: {
      datalabels: {
        color: "#fff",
      },
    },
  };

  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                return "";
              },
            },
          },
          title: {
            display: true,
            text: "Reimbursement Report",
          },
        },
      }}
      data={data}
    />
  );
};

export default Reimbursment;
