import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FiBox,
  FiHeart,
  FiDollarSign,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import {
  getAllOffering,
  getOfferingByIdBuyer,
} from "../../redux/actions/offeringActions";
import {
  Container,
  Row,
  Col,
  Button,
  Stack,
  Table,
  Card,
} from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import AddProduct from "../../images/addProduct.png";
import alertnotif from "../../images/Ellipse.png";
import NullOffer from "../../images/Group 33.svg";
import { format, parseISO } from "date-fns";

export default function DaftarDiminati() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  const { alloffer } = useSelector((state) => state.offering);

  useEffect(() => {
    dispatch(getAllOffering());
  }, [dispatch]);

  const diminati = [];
  if (alloffer && user) {
    for (let i = 0; i < alloffer.length; i++) {
      if (alloffer[i].Product.id_seller === user.id) {
        diminati.push(alloffer[i]);
      }
    }
  }

  const handleFilterDiminati = () => {
    return navigate("/daftarDiminati");
  };
  const handleFilterSemua = () => {
    return navigate("/daftarjual");
  };
  const handleFilterTerjual = () => {
    return navigate("/daftarterjual");
  };

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row className="justify-content-md-center mt-5 mb-3">
          <Col>
            <h4 className="fw-bold">Daftar Jual Saya</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3} className="infoPenjual">
              {user === null ? (
                <></>
              ) : (
                <>
                  <img
                    src={user.photo_profile}
                    alt=""
                    className="image-profile"
                  />
                  <div>
                    <h5 className="my-auto">{user.name}</h5>
                    <p className="my-auto">{user.city}</p>
                  </div>
                </>
              )}
              <Button
                type="button"
                className="btn-block btnOutlineSmall me-2 ms-auto"
                onClick={() => navigate("/infoprofil")}
              >
                Edit
              </Button>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={12} xs={12}>
            <div className="boxShadow mt-4">
              <h5>Kategori</h5>
              <Table style={{ color: "grey" }}>
                <thead>
                  <tr
                    style={{ height: "50px" }}
                    className="kategoriInActive"
                    id="filterAll"
                    onClick={handleFilterSemua}
                  >
                    <td>
                      <i className="bi bi-box me-2"></i>Semua Produk
                      <i className="bi bi-chevron-right float-end"></i>
                    </td>
                  </tr>
                  <tr
                    style={{ height: "50px" }}
                    className="kategoriActive"
                    id="filterDiminati"
                    onClick={handleFilterDiminati}
                  >
                    <td>
                      <i className="bi bi-heart me-2"></i>Diminati
                      <i className="bi bi-chevron-right float-end"></i>
                    </td>
                  </tr>
                  <tr
                    style={{ height: "50px" }}
                    className="kategoriInActive"
                    id="filterTerjual"
                    onClick={handleFilterTerjual}
                  >
                    <td>
                      <i className="bi bi-currency-dollar me-2"></i>Terjual
                      <i className="bi bi-chevron-right float-end"></i>
                    </td>
                  </tr>
                </thead>
              </Table>
            </div>
          </Col>
          <Col lg={9} md={12} xs={12}>
            <Row className="mt-4">
              {diminati.length === 0 || diminati.length === undefined ? (
                <>
                  <Col lg={4} md={12} xs={12} className="m-auto">
                    <div className="">
                      <img src={NullOffer}></img>
                    </div>
                    <p className="text-center">
                      Belum ada produkmu yang diminati nih, sabar ya rejeki
                      nggak kemana kok
                    </p>
                  </Col>
                </>
              ) : (
                diminati.map((item) => (
                  <a
                    href={`info-penawaran/${item.id_buyer}`}
                    className="text-decoration-none"
                    style={{ color: "black" }}
                  >
                    <div className="card notifikasi">
                      <div className="row">
                        <div className="col-2 m-auto">
                          <img
                            src={item.Product.image_1}
                            className="w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-10">
                          <div
                            className="row mb-1"
                            style={{ fontSize: "10px" }}
                          >
                            <div className="col-xl-6 mb-1">
                              <p className="mb-1">Penawaran produk</p>
                            </div>
                            <div
                              className="col-xl-6 mb-1"
                              style={{ textAlign: "right" }}
                            >
                              <p className="mb-1">
                                {format(
                                  parseISO(item.createdAt),
                                  "dd MMM, kk:mm"
                                )}
                              </p>
                            </div>
                          </div>
                          <p
                            className="mb-1"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {item.Product.product_name}
                          </p>
                          <p
                            className="mb-1"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            {rupiah(item.Product.price)}
                          </p>
                          <p
                            className="mb-1"
                            style={{ fontSize: "14px", fontWeight: "bold" }}
                          >
                            Ditawar {rupiah(item.offering_price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
