// import jsPDF from "jspdf";
// import { Button } from "@mui/material";
// import React, { Component } from "react";
// import logo from "../images/wedding.jpg";

// export default function PdfDownload() {
//   const pdfGenerate = () => {
//     var doc = new jsPDF("portrait", "px", "a4", "false");
//     doc.addImage(logo, "JPG", 65, 20, 400, 400);
//     doc.addPage();
//     doc.setFont("Helvertica", "bold");
//     doc.text(60, 60, "Name");
//     doc.text(60, 80, "City");
//     doc.text(60, 100, "Amount");
//     doc.setFont("Helvertica", "bold");
//     doc.text(100, 60, ": Selvi");
//     doc.text(100, 80, ": VNR");
//     doc.text(120, 100, ": 10000");
//     doc.save("wedding.pdf");
//   };
//   return (
//     <div>
//       <Button onClick={pdfGenerate}>Download</Button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { Button } from "@material-ui/core";
// import { useSearchParams } from "react-router-dom";

// // Set the worker URL for the PDF.js library
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// export default function PdfDownload() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [searchParam] = useSearchParams();
//   const [data, setData] = useState([]);
//   const eventId = searchParam.get("event");

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   function handleDownloadPDF() {
//     const fileName = "example.pdf";
//     const url = `/api/generate-pdf?fileName=${fileName}`;
//     // const url = `https://localhost:3000/entryList?event=${eventId}`;
//     window.open(url, "_blank");
//   }

//   return (
//     <div>
//       <Document file="example.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//       <Button onClick={handleDownloadPDF}>Download PDF</Button>
//     </div>
//   );
// }

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PdfDownload = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div class="print__section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1>Printing and download PDF file in React</h1>
              <button onClick={handlePrint} className="print__button">
                {" "}
                Print{" "}
              </button>
              <div ref={componentRef} className="card">
                <div class="float__start">
                  <h3 class="card-title mb-0">Information</h3>
                </div>
                <div class="float__infoss">
                  <ul>
                    <li>
                      {" "}
                      Name : <span> Dr Andrew C S Koh </span>{" "}
                    </li>
                    <li>
                      {" "}
                      Email : <span> Andrew@gmail.com </span>{" "}
                    </li>
                    <li>
                      {" "}
                      Gender : <span> Male </span>{" "}
                    </li>
                    <li>
                      {" "}
                      Date of Birth : <span> 07-24-1982</span>{" "}
                    </li>
                    <li>
                      {" "}
                      Phone No: <span> </span> 9856231456{" "}
                    </li>
                    <li>
                      {" "}
                      Address :{" "}
                      <span>
                        {" "}
                        26 Wyle Cop, Shrewsbury, Shropshire, SY1 1XD{" "}
                      </span>{" "}
                    </li>
                    <li>
                      {" "}
                      Website : <span> www.Andrew.com </span>{" "}
                    </li>
                    <li>
                      {" "}
                      Country : <span> United states </span>{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PdfDownload;
