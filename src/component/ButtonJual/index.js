import React from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function ButtonJual() {
  return (
    <div className="d-flex justify-content-center sticky">
      <button
        className="btn btn-custom me-3 sticky active buttonradius12 btnJual py-2"
        style={{ width: "115px" }}
      >
        <FiPlus /> Jual
      </button>
    </div>
  );
}
