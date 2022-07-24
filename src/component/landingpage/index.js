import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProduct } from "../../redux/actions/productsActions";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import CarouselBanner from "../Carousel";
import { FiSearch } from "react-icons/fi";
import ButtonJual from "../ButtonJual";
import Footer from "../Footer";
import { Container } from "react-bootstrap";
import { getOfferbyIDProduct } from "../../redux/actions/offeringActions";
import Swal from "sweetalert2";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const [category, setCategory] = useState("");
  const [isHobby, setIshobby] = useState(false);
  const [isVehicle, setIsvehicle] = useState(false);
  const [isCloth, setIscloth] = useState(false);
  const [isElectronic, setIselectronic] = useState(false);
  const [isHealth, setIshealt] = useState(false);
  const [isTrigger, setIsTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch, isTrigger, category]);

  async function handleAll() {
    setIsTrigger(false);
    setIshobby(false);
    setIsvehicle(false);
    setIscloth(false);
    setIselectronic(false);
    setIshealt(false);
  }

  async function handleCategory(event) {
    setIshobby(false);
    setIsvehicle(false);
    setIscloth(false);
    setIselectronic(false);
    setIshealt(false);
    setIsTrigger(true);
    setCategory(event);
    const coba = typeof event;
    if (event === "Hobi") {
      setIshobby(true);
    } else if (event === "Kendaraan") {
      setIsvehicle(true);
    } else if (event === "Baju") {
      setIscloth(true);
    } else if (event === "Elektronik") {
      setIselectronic(true);
    } else if (event === "Kesehatan") {
      setIshealt(true);
    }
    console.log(category, coba, isTrigger);
  }

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const Produktersedia = [];
  if (product) {
    for (let i = 0; i < product.length; i++) {
      if (product[i].status !== "NOT AVAILABLE") {
        Produktersedia.push(product[i]);
      }
    }
  }
  console.log(Produktersedia);

  const jumlahproduksaya = [];
  if (product && user) {
    for (let i = 0; i < product.length; i++) {
      if (
        product[i].status !== "NOT AVAILABLE" &&
        product[i].id_seller === user.id
      ) {
        jumlahproduksaya.push(product[i]);
      }
    }
  }
  console.log(jumlahproduksaya);

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  function handlebuttonjual() {
    if (jumlahproduksaya.length >= 5) {
      Swal.fire({
        icon: "error",
        title: "Tidak bisa manambahkan produk",
        text: "mencapai batas maksimal jual",
      });
    } else {
      navigate("/infoproduk");
    }
  }

  return (
    <Container className="App">
      <NavBar />
      <CarouselBanner />
      <Container className="container py-3">
        <p className="fw-bold">Telusuri Kategori</p>
        <div
          className="container py-3 d-flex buttonradius12"
          style={{ overflowX: "auto" }}
        >
          <button
            className="btn btn-custom me-3 buttonradius12 "
            id="filtersemua"
            onClick={handleAll}
            style={{
              backgroundColor: !isTrigger ? "#7126B5" : "#E2D4F0",
              color: !isTrigger ? "#ffffff" : "#3c3c3c",
            }}
          >
            <FiSearch /> Semua
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterHobi"
            style={{
              backgroundColor: isHobby ? "#7126B5" : "#E2D4F0",
              color: isHobby ? "#ffffff" : "#3c3c3c",
            }}
            value="Hobi"
            onClick={(e) => handleCategory(e.target.value)}
          >
            <FiSearch /> Hobi
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterKendaraan"
            style={{
              backgroundColor: isVehicle ? "#7126B5" : "#E2D4F0",
              color: isVehicle ? "#ffffff" : "#3c3c3c",
            }}
            value="Kendaraan"
            onClick={(e) => handleCategory(e.target.value)}
          >
            <FiSearch /> Kendaraan
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterBaju"
            style={{
              backgroundColor: isCloth ? "#7126B5" : "#E2D4F0",
              color: isCloth ? "#ffffff" : "#3c3c3c",
            }}
            value="Baju"
            onClick={(e) => handleCategory(e.target.value)}
          >
            <FiSearch /> Baju
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterElektronik"
            style={{
              backgroundColor: isElectronic ? "#7126B5" : "#E2D4F0",
              color: isElectronic ? "#ffffff" : "#3c3c3c",
            }}
            value="Elektronik"
            onClick={(e) => handleCategory(e.target.value)}
          >
            <FiSearch /> Elektronik
          </button>
          <button
            className="btn btn-custom me-3 buttonradius12"
            id="filterKesehatan"
            style={{
              backgroundColor: isHealth ? "#7126B5" : "#E2D4F0",
              color: isHealth ? "#ffffff" : "#3c3c3c",
            }}
            value="Kesehatan"
            onClick={(e) => handleCategory(e.target.value)}
          >
            <FiSearch /> Kesehatan
          </button>
        </div>
      </Container>
      <div id="card" className="container">
        <div className="row">
          {product.length === 0 ? (
            <>
              <h4 className="text-center py-4">Produk Tidak Tersedia</h4>
            </>
          ) : isTrigger ? (
            // <Product category={category}/>
            product
              .filter(
                (item) =>
                  item.category === category && item.status !== "NOT AVAILABLE"
              )
              .map((item) => (
                <div key={item.id} className="col-md-4 col-xl-3 col-sm-12">
                  <a
                    href={`/halamanproduk/${item.id}`}
                    className="text-decoration-none"
                    style={{ color: "black" }}
                  >
                    <div className="card " style={{ border: "none" }}>
                      <div className="d-flex justify-content-center ">
                        <img
                          className="card-img-top center-cropped m-1 img-fluid"
                          src={item.image_1}
                          style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                          alt="product_image"
                        />
                      </div>
                      <div className="card-body mb-3">
                        <h6
                          className="card-title text-decoration-none"
                          style={{ fontsize: "14px" }}
                        >
                          {item.product_name}
                        </h6>
                        <p
                          className="text-decoration-none"
                          style={{ fontsize: "10px" }}
                        >
                          {item.category}
                        </p>
                        <p
                          className="text-decoration-none"
                          style={{ fontsize: "14px" }}
                        >
                          {rupiah(item.price)}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              ))
          ) : (
            Produktersedia.map((item) => (
              <div key={item.id} className="col-md-4 col-xl-3 col-sm-12">
                <a
                  href={`/halamanproduk/${item.id}`}
                  className="text-decoration-none"
                  style={{ color: "black" }}
                >
                  <div className="card cardProduct " style={{}}>
                    <div className="d-flex justify-content-center ">
                      <img
                        className="card-img-top center-cropped m-1 img-fluid"
                        src={item.image_1}
                        style={{
                          width: "250px",
                          height: "200px",
                          objectFit: "contain",
                        }}
                        alt="product_image"
                      />
                    </div>
                    <div className="card-body">
                      <h6
                        className="card-title text-decoration-none"
                        style={{ fontsize: "14px" }}
                      >
                        {item.product_name}
                      </h6>
                      <p
                        className="text-decoration-none"
                        style={{ fontsize: "10px" }}
                      >
                        {item.category}
                      </p>
                      <p
                        className="text-decoration-none"
                        style={{ fontsize: "14px" }}
                      >
                        Rp {item.price}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      <a onClick={handlebuttonjual}>
        <ButtonJual />
      </a>

      <div>
        <Footer />
      </div>
    </Container>
  );
}
