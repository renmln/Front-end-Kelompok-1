import React from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {FiPlus} from "react-icons/fi";
import {Link} from "react-router-dom";

export default function ButtonJual() {
    return (
        <div className=" container d-flex justify-content-center sticky ">
            <Link to="/infoproduk">
                <button className="btn btn-custom me-3 sticky active buttonradius12" style={{width: "115px", heigth: "52px"}} id="Jual">
                    <FiPlus /> Jual
                </button>
            </Link>
        </div>
    );
}
