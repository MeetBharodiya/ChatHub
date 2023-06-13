import React from "react";
import { CCard, CCardHeader, CCardBody, CCardText } from "@coreui/react";
import "./Card.css";

const Card = (data) => {
  console.log("props", data);
  return (
    <>
      <div className="card-container">
        <CCard style={{ width: "18rem" }}>
          <CCardHeader>Header</CCardHeader>
          <CCardBody>
            <CCardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CCardText>
          </CCardBody>
        </CCard>
      </div>
    </>
  );
};

export default Card;
