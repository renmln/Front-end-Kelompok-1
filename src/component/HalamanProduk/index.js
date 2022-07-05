import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { addOffering } from "../../redux/actions/offeringActions";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import profilpenjual from "../../images/profilpenjual.png";
import nullprofil from "../../images/nullprofil.png";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { Carousel } from "react-bootstrap";
import NavBar from "../NavBar";
import { getProductById } from "../../redux/actions/productsActions";
import { getUserbyID } from "../../redux/actions/authActions";
import { getAllOffers } from "../../redux/actions/offeringActions";

export default function HalamanProduk() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { detailProduct } = useSelector((state) => state.product);
  const { user, detailUser } = useSelector((state) => state.auth);
  const { offering } = useSelector((state) => state.offering);
  const [modalShow, setModalShow] = React.useState(false);

  const [id_product, setIdProduct] = useState("");
  const [offering_price, setOfferingPrice] = useState("");
  const [no_hp, setNoHp] = useState("");

  React.useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (token === null) {
      return navigate("/");
    }
    dispatch(getAllOffers());
  }, [dispatch, navigate, token]);

  React.useEffect(() => {
    dispatch(getUserbyID(detailProduct.id_seller, offering.id_buyer));
  }, [dispatch, detailProduct.id_seller, offering.id_buyer]);

  const handleSubmit = async () => {
    const data = {
      id_product: detailProduct.id,
      offering_price: offering_price,
      no_hp: user.no_hp,
    };
    console.log(data);
    console.log(user.no_hp);
    console.log(detailProduct.id);
    console.log(offering.offerings);
    dispatch(addOffering(data));
    document.getElementById("suksesnego").classList.add("disabled");
  };

  function ModalTawar(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h6>Masukkan Harga Tawarmu</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "14px" }}>
            Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </p>
          <div className="row p-1">
            <div className="col-3 m-auto ">
              <img
                src={profilpenjual}
                alt="profilpenjual"
                style={{ widht: "48" }}
              />
            </div>
            <div
              className="col-9 "
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                paddingTop: "18px",
                paddingLeft: "5px",
              }}
            >
              <b>{detailProduct.product_name}</b>
              <p>Rp {detailProduct.price}</p>
            </div>
          </div>
          <div>
            <form>
              <div className="mb-3">
                <input
                  type="number"
                  value={id_product}
                  onChange={() => setIdProduct(detailProduct.id)}
                  hidden
                />
                <input
                  type="number"
                  value={no_hp}
                  onChange={() => setNoHp(user.no_hp)}
                  hidden
                />
                <label htmlFor="harga_tawar" className="form-label">
                  Harga Tawar
                </label>
                <input
                  type="number"
                  className="form-control rounded "
                  id="harga_tawar"
                  placeholder="Rp 0,00"
                  style={{ borderRadius: "16px" }}
                  value={offering_price}
                  onChange={(e) => setOfferingPrice(e.target.value)}
                />
              </div>
              <button
                type="button"
                id="suksesnego"
                className="btn btn-custom me-3 mb-2 "
                onClick={handleSubmit}
              >
                Kirim
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (localStorage.getItem("token") === null) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Harap Login Terlebih Dahulu",
      showConfirmButton: false,
      timer: 1000,
    });
    return <Navigate to="/login" />;
  }

  // handle carosel preview
  const imagepreview = [];
  if (detailProduct.image_1 !== null) {
    imagepreview.push(detailProduct.image_1);
  }
  if (detailProduct.image_2 !== null) {
    imagepreview.push(detailProduct.image_2);
  }
  if (detailProduct.image_3 !== null) {
    imagepreview.push(detailProduct.image_3);
  }
  if (detailProduct.image_4 !== null) {
    imagepreview.push(detailProduct.image_4);
  }

  return (
    <div className="container">
      {detailProduct.length === 0 ? (
        <></>
      ) : (
        <>
          <div>
            <NavBar />
          </div>
          {user === null ? (
            <></>
          ) : (
            <>
              <div className="container-fluid mt-5">
                <div className="row mx-auto mb-3">
                  <div className="col-xl-6 col-sm-12">
                    {imagepreview === 0 ? (
                      <></>
                    ) : (
                      <Carousel className="boxCarousel">
                        {imagepreview.map((item, index) => {
                          return (
                            <Carousel.Item key={index}>
                              <img
                                className="d-block w-100 boxImagePreview"
                                src={item}
                                alt="First slide"
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    )}
                    <h5 className="mt-5">Deskripsi</h5>
                    <p>{detailProduct.description}</p>
                  </div>
                  <div className="col-xl-4 col-sm-12">
                    <div className="card mt-1 p-2 rounded mb-2">
                      <h6 className="card-title " style={{ fontsize: "14px" }}>
                        {detailProduct.product_name}
                      </h6>
                      <p style={{ fontsize: "10px" }}>
                        {detailProduct.category}
                      </p>
                      <p style={{ fontsize: "14px" }}>
                        Rp {detailProduct.price}
                      </p>
                      {detailProduct.id_seller === user.id ? (
                        <>
                          <button className="btn btn-custom me-3 mb-2 ">
                            {" "}
                            Terbitakan
                          </button>
                          <button className="btn btn-custom me-3 mb-2 ">
                            {" "}
                            Edit
                          </button>
                        </>
                      ) : offering.id_buyer === user.id ? (
                        <>
                          <button
                            id="suksesnego"
                            className="btn btn-custom me-3 mb-2 "
                          >
                            Menunggu respon penjual
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-custom me-3 mb-2 "
                            onClick={() => setModalShow(true)}
                            id="suksesnego"
                          >
                            Saya tertarik dan ingin nego
                          </button>
                        </>
                      )}
                    </div>
                    <div className="card">
                      <div className="row m-2">
                        <div className="col-2">
                          {detailUser.photo_profile === null ? (
                            <img
                              src={nullprofil}
                              alt="profilpenjual"
                              style={{ width: "50px" }}
                            />
                          ) : (
                            <img
                              src={detailUser.photo_profile}
                              alt="profilpenjual"
                              style={{ width: "50px" }}
                            />
                          )}
                        </div>
                        <div className="col-10">
                          <h5>{detailUser.name}</h5>
                          <p>{detailUser.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ModalTawar
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
