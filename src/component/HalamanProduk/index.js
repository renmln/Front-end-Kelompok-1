import React from "react";
import "../../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../NavBar";
import halamanproduk from "../../images/halamanproduk.png";
import profilpenjual from '../../images/profilpenjual.png';



export default function HalamanProduk() {
    return (
        <div className="container">
            <div>
                <NavBar />
            </div>
            <div className="container-fluid">
                <div className="row mx-auto mb-3">
                    <div className="col-xl-6 col-sm-12">
                        <img className="img-fluid center-cropped rounded" src={halamanproduk} alt="halamanproduk" style={{ width: '600px', height: '436px' }} />
                        <h5>Deskripsi</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="col-xl-4 col-sm-12">
                        <div className="card mt-1 p-2 rounded mb-2">
                            <h6 class="card-title " style={{ fontsize: '14px' }}>Jam Tangan Casio</h6>
                            <p className="" style={{ fontsize: '10px' }}>Aksesoris</p>
                            <p class="" style={{ fontsize: '14px' }}>Rp 250.000</p>
                            <button
                                className="btn btn-custom me-3 mb-2 "
                                onclick="/"
                                id="Terbitakan"
                            > Terbitakan
                            </button>
                            <button
                                className="btn btn-custom me-3 mb-2 "
                                onclick="/"
                                id="Edit"
                            > Edit
                            </button>
                            <p>or</p>
                            <button
                                className="btn btn-custom me-3 mb-2 "

                                id="Terbitakan"
                            > Saya tertarik dan ingin nego
                            </button>

                        </div>
                        <div className="card">
                            <div className="row">
                                <div className="col-2 m-auto pl-2">
                                    <img src={profilpenjual} alt='profilpenjual' className="w-50 " />
                                </div>
                                <div className="col-10">
                                    <h5 className="">Nama Penjual</h5>
                                    <p>Kota</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
