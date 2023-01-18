import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import React, { useEffect, useRef } from "react";
import CreditNote from './PDF/CreditNote';
import Inv from './PDF/Inv';

const ViewPdf = () => {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };

  return (
    <div className='bg-white'>
      <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>

      <div ref={printRef}>
        <Inv/>
        {/* <CreditNote/> */}
      </div>
    </div>
  );
};

export default ViewPdf;