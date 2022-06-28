import React from "react";
import {useSelector, useDispatch} from "react-redux";

import NavBar from "../NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import profilpenjual from "../../images/profilpenjual.png";
import "../../App.css";
import {FiBox, FiHeart, FiDollarSign, FiChevronRight, FiPlus} from "react-icons/fi";
import Rectangle from "../../images/Rectangle 23.png";

import {getAllProductByIdSeller} from "../../redux/actions/productsActions";

export default function DaftarJual() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {product} = useSelector((state) => state.product);

    if (product.length === 0 && user !== null) {
        dispatch(getAllProductByIdSeller(user.id));
    }

    return {product} ? (
        <div className="container">
            <div>
                <NavBar />
            </div>
            <div>
                <p className="fw-bold my-3">Daftar Jual Saya</p>
                <div className="row">
                    <div className="col-xl-1 col-sm-1 col-1 pl-2" style={{width: "50px"}}>
                        <img src={profilpenjual} alt="profilpenjual" className="img-fluid" style={{width: "48px"}} />
                    </div>
                    <div className="col-xl-10  col-sm-6 col-9">
                        <p className="fw-bold mb-1" style={{fontSize: "14px"}}>
                            Nama Penjual
                        </p>
                        <p className="mb-1" style={{fontSize: "10px"}}>
                            Kota
                        </p>
                    </div>
                    <div className="col-xl-1  col-sm-3 col-1">
                        <button className="btn btn-custom borderradius8">edit</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="row my-4 ">
                    <div className="col-3 card  p-3 mr-2">
                        <p className="fw-bold" style={{fontSize: "16px"}}>
                            Kategori
                        </p>
                        <table>
                            <tr>
                                <td>
                                    <FiBox />
                                </td>
                                <td>Semua Produk</td>
                                <td>
                                    <FiChevronRight />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <FiHeart />
                                </td>
                                <td>Diminati</td>
                                <td>
                                    <FiChevronRight />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FiDollarSign />
                                </td>
                                <td>Terjual</td>
                                <td>
                                    <FiChevronRight />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="col-9 ">
                        <div className="row">
                            <div
                                className="col-md-4 col-xl-4 col-sm-12 card mb-1 ml-1 justify-content-center justify-align-center"
                                style={{
                                    borderStyle: "dashed",
                                    border: "3px dashed",
                                    color: "#D0D0D0",
                                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                                    padding: "8px, 8px, 16px, 8px",
                                    borderRadius: "4px",
                                }}
                            >
                                <a href="/" className="text-decoration-none m-auto" style={{color: "black"}}>
                                    <div className=" m-auto">
                                        <FiPlus className="align-center " />
                                    </div>
                                    <div>
                                        <p>Tambah Produk</p>
                                    </div>
                                </a>
                            </div>
                            {product.length > 0 ? (
                                product.map((item) => (
                                    <div key={item.id} className="col-md-4 col-xl-4 col-sm-12">
                                        <a href="/halamanproduk" className="text-decoration-none" style={{color: "black"}}>
                                            <div
                                                className="card "
                                                style={{border: "none", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)", padding: "8px, 8px, 16px, 8px", gap: "8px", borderRadius: "4px"}}
                                            >
                                                <div className="d-flex justify-content-center ">
                                                    <img className="card-img-top center-cropped m-1 img-fluid" src={item.image_1} alt="test" />
                                                </div>
                                                <div className="card-body mb-3">
                                                    <h6 className="card-title text-decoration-none" style={{fontsize: "14px"}}>
                                                        {item.product_name}
                                                    </h6>
                                                    <p className="text-decoration-none" style={{fontsize: "10px"}}>
                                                        {item.category}
                                                    </p>
                                                    <p className="text-decoration-none" style={{fontsize: "14px"}}>
                                                        Rp {item.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
