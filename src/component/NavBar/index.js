import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, cekTokenExp } from "../../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";

import icon from "../../images/kotakbiru.svg";
import {
  FiLogIn,
  FiSearch,
  FiList,
  FiBell,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Search from "./Search";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import fotoproduk from "../../images/Rectangle 23.png";
import alertnotif from "../../images/Ellipse.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllOffering } from "../../redux/actions/offeringActions";
import {
  getAllNotificationByIdSeller,
  updateNotification,
} from "../../redux/actions/notificationAction";
import { format, parseISO } from "date-fns";
import Swal from "sweetalert2";
import logo from "../../images/SecondHand1.png";
import "../../App.css";
import "../../css/style.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);
  const { alloffer } = useSelector((state) => state.offering);
  const token = localStorage.getItem("token");
  const { notification } = useSelector((state) => state.notification);

  useEffect(() => {
    if (localStorage.getItem("token") && user === null) {
      dispatch(cekTokenExp());
    }
  }, [dispatch, isAuthenticated, status, user]);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (token === null) {
      return navigate("/");
    }
    dispatch(getAllNotificationByIdSeller());
  }, [dispatch, navigate, token]);

  var notif = [];
  if (notification && user) {
    for (let i = 0; i < notification.length; i++) {
      if (notification[i].userId === user.id) {
        notif.push(notification[i]);
      }
    }
  }

  if (notif) {
    notif.sort(function (a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  let jumlahnotif = [];
  if (notification && user) {
    for (let i = 0; i < notification.length; i++) {
      if (
        notification[i].userId === user.id &&
        notification[i].status !== "read"
      ) {
        jumlahnotif.push(notification[i]);
      }
    }
  }
  // console.log(notif);

  function handlenotif(index) {
    if (notif[index].title === "Berhasil di ditambahkan") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: "Berhasil di ditambahkan",
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (notif[index].title === "Penawaran diterima") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Penawaran Anda diterima dengan harga ${notif[index].Offering.offering_price}`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (notif[index].title === "Menerima penawaran") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Anda menerima tawaran produk anda dengan harga ${notif[index].Offering.offering_price}`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (
      notif[index].title === "Penawaran produk" &&
      notif[index].Product.id_seller !== user.id
    ) {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Tawaran berhasil terkirim dengan harga ${notif[index].Offering.offering_price}. Silahkan menunggu konfirmasi penjual`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (notif[index].title === "Penawaran ditolak") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Tawaranmu dengan harga ${notif[index].Offering.offering_price}. Silahkan melakukan tawaran kembali jika ingin membeli`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (notif[index].title === "Menolak penawaran") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Anda Menolak penawaran dengan harga ${notif[index].Offering.offering_price}.`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (notif[index].title === "Transaksi dibatalkan") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Transaksi dibatalkan karena sesuatu hal. silahkan hubungi penjual`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (notif[index].title === "Membatalkan transaksi") {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Anda membatalkan transaksi`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (
      notif[index].title === "Transaksi berhasil" &&
      notif[index].Product.id_seller !== user.id
    ) {
      Swal.fire({
        title: notif[index].Product.product_name,
        text: `Transaksi berhasil dengan harga ${notif[index].Offering.offering_price}`,
        imageUrl: notif[index].Product.image_1,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
    if (
      notif[index].title === "Penawaran produk" &&
      notif[index].Product.id_seller === user.id
    ) {
      navigate(`/info-penawaran/${notif[index].Offering.id_buyer}`);
    }

    const data = {
      id: notif[index].id,
      status: "read",
    };
    console.log(data);
    dispatch(updateNotification(data));
  }

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        style={{ sticky: "top" }}
      >
        <Navbar.Brand>
          <a href="/">
            <img src={logo} alt="" style={{ width: "130px" }} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              {/* <form className="d-flex border buttonradius12 ">
                <input
                  className="form-control border-0"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  //   onChange={(e) => setSearchProduct(e.target.value)}
                ></input>
                <button className="btn" type="submit">
                  <FiSearch />
                </button>
              </form> */}
              <Search />
            </Nav.Link>
          </Nav>
          {!isAuthenticated ? (
            <Nav>
              <Nav.Link href="/login">
                <button className="btnPrimary border-0">
                  <FiLogOut /> Masuk
                </button>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/daftarjual">
                <button
                  type="button"
                  className="btn btn-sm nav-link text-dark rounded-12px active"
                >
                  <FiList />
                </button>
              </Nav.Link>
              <NavDropdown
                title={
                  <button
                    type="button"
                    className="btn btn-sm nav-link text-dark rounded-12px active"
                  >
                    <FiBell />
                    {jumlahnotif.length > 0 ? (
                      <>
                        <span class="icon-button__badge">
                          {jumlahnotif.length}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                }
                id="collasible-nav-dropdown"
                align="end"
              >
                {notif.length > 0 ? (
                  notif.map((item, index) => {
                    return (
                      <NavDropdown.Item
                        onClick={() => handlenotif(index)}
                        // href={`/info-penawaran/${item.Offering.id_buyer}`}
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
                                  <p className="mb-1">{item.title}</p>
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
                                    {item.status === "read" ? (
                                      <></>
                                    ) : (
                                      <>
                                        &nbsp; <img src={alertnotif} alt="" />
                                      </>
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
                                {item.Product.price}
                              </p>
                              <p
                                className="mb-1"
                                style={{ fontSize: "14px", fontWeight: "bold" }}
                              >
                                {item.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      </NavDropdown.Item>
                    );
                  })
                ) : (
                  <NavDropdown.Item href="#">
                    <div className="card notifikasi">
                      <p>tidak ada notif</p>
                    </div>
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              <Nav.Link href="/infoprofil">
                <button
                  type="button"
                  className="btn btn-sm nav-link text-dark rounded-12px active"
                >
                  <FiUser />
                </button>
              </Nav.Link>

              <Nav.Link href="/">
                <button className="btnPrimary border-0" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
