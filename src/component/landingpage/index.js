import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllProduct} from "../../redux/actions/productsActions";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "../NavBar";
import CarouselBanner from "../Carousel";
import {FiSearch} from "react-icons/fi";
import Rectangle from "../../images/Rectangle 23.png";
import Footer from "../Footer";
import ButtonJual from "../ButtonJual";

export default function LandingPage() {
    const dispatch = useDispatch();
    const {product} = useSelector((state) => state.product);

    React.useEffect(() => {
        dispatch(getAllProduct());
    }, [dispatch]);

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="row">
                <CarouselBanner />
            </div>
            <div className="container py-3">
                <p className="fw-bold">Telusuri Kategori</p>
                <div className="container py-3 d-flex buttonradius12">
                    <button className="btn btn-custom me-3 buttonradius12 " onClick="/" id="filtersemua">
                        {" "}
                        <FiSearch /> Semua
                    </button>
                    <button className="btn btn-custom me-3 buttonradius12" onClick="/" id="filterHobi">
                        {" "}
                        <FiSearch /> Hobi
                    </button>
                    <button className="btn btn-custom me-3 buttonradius12" onClick="/" id="filterKendaraan">
                        {" "}
                        <FiSearch /> Kendaraan
                    </button>
                    <button className="btn btn-custom me-3 buttonradius12" onClick="/" id="filterBaju">
                        {" "}
                        <FiSearch /> Baju
                    </button>
                    <button className="btn btn-custom me-3 buttonradius12" onClick="/" id="filterElektronik">
                        {" "}
                        <FiSearch /> Elektronik
                    </button>
                    <button className="btn btn-custom me-3 buttonradius12" onClick="/" id="filterKesehatan">
                        {" "}
                        <FiSearch /> Kesehatan
                    </button>
                </div>
            </div>
            <div id="card" className="container">
                <div className="row">
                    {product.length > 0 ? (
                        product.map((item) => (
                            <div className="col-md-4 col-xl-2 col-sm-12">
                                <a href="/halamanproduk" className="text-decoration-none" style={{color: "black"}}>
                                    <div className="card " style={{border: "none"}}>
                                        <div className="d-flex justify-content-center ">
                                            <img className="card-img-top center-cropped m-1 img-fluid" src={item.image_1} style={{height: "100px"}} alt="test" />
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
            <ButtonJual />
            <div>
                <Footer />
            </div>
        </div>
    );
}
