import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import arrow from "../../images/fi_arrow-left.png";
import Rectangle127 from "../../images/Rectangle127.svg";
import profilpenjual from "../../images/profilpenjual.png";
import profilproduk from "../../images/Rectangle 23.png";
import { Stack, Button, Toast, Nav } from "react-bootstrap";
import Jam from "../../images/Rectangle 23.png";
import NavBar from "../NavBar";
import { getUserbyID } from "../../redux/actions/authActions";
import {
  deleteOffering,
  getAllOffering,
  getOfferingByIdBuyer,
  updateOffering,
} from "../../redux/actions/offeringActions";
import {
  addTransaction,
  getAllTransaction,
  updateTransaction,
} from "../../redux/actions/transactionAction";
import { UPDATE_PRODUCT } from "../../redux/actions/types";
import { updateProduct } from "../../redux/actions/productsActions";
import { format, parseISO } from "date-fns";

export default function InfoPenawaran() {
  let [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, detailUser } = useSelector((state) => state.auth);
  const { alloffer } = useSelector((state) => state.offering);
  const { transaction } = useSelector((state) => state.transaction);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getUserbyID(id));
  }, [dispatch, id]);
  // console.log(detailUser)

  useEffect(() => {
    dispatch(getAllOffering());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTransaction());
  }, [dispatch]);

  // Data Dummy
  const produkDitawar = [];

  if (alloffer && detailUser) {
    for (let i = 0; i < alloffer.length; i++) {
      if (alloffer[i].id_buyer === detailUser.id) {
        produkDitawar.push(alloffer[i]);
      }
    }
  }
  console.log(produkDitawar);

  const listtransaksi = [];
  if (transaction && user) {
    for (let i = 0; i < transaction.length; i++) {
      listtransaksi.push(transaction[i]);
    }
  }

  console.log(listtransaksi);

  if (produkDitawar) {
    produkDitawar.sort(function (a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  function handleTerima(index) {
    // console.log(index)
    // e.preventDefault();
    const data = {
      id_seller: user.id,
      id_product: produkDitawar[index].id_product,
      id_offering: produkDitawar[index].id,
      id_buyer: produkDitawar[index].id_buyer,
      status: "proses",
    };
    // console.log(data)
    dispatch(addTransaction(data));
  }

  function handleTolak(index) {
    const data = {
      id: produkDitawar[index].id,
      status: "Ditolak",
    };
    // console.log(data)
    dispatch(updateOffering(data));
    // window.location.reload();
  }
  function handlerefresh() {
    window.location.reload();
  }

  function handleModalStatus(index) {
    setShow(true);
    console.log(status);
    if (status === "BERHASIL") {
      const updatestatusproduct = {
        id: listtransaksi[index].id_product,
        status: "NOT AVAILABLE",
      };
      console.log(updatestatusproduct);
      dispatch(updateProduct(updatestatusproduct));

      const data = {
        id: listtransaksi[index].id_offering,
        status: "BERHASIL",
      };
      dispatch(updateOffering(data));
    }

    if (status === "GAGAL") {
      const updatestatusproduct = {
        id: listtransaksi[index].id_product,
        status: "AVAILABLE",
      };
      console.log(updatestatusproduct);
      dispatch(updateProduct(updatestatusproduct));

      const data = {
        id: listtransaksi[index].id_offering,
        status: "GAGAL",
      };
      dispatch(updateOffering(data));
    }

    const data = {
      id: listtransaksi[index].id,
      status,
    };
    // console.log(data)
    dispatch(updateTransaction(data));
    // window.location.reload();
  }

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  return (
    <div>
      <NavBar />
      <nav
        className="navbar navbar-expand-lg bg-light d-inline-flex infopenawar"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          className="d-inline-flex"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <span className="navbar-brand mb-0 h1"></span>
        </div>

        <div
          className="d-inline-flex "
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <span
            className="navbar-brand mb-0 h1"
            style={{ fontWeight: "400px" }}
          >
            Info Penawar
          </span>
        </div>

        <div
          className="d-inline-flex"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <span className="navbar-brand mb-0 h1"></span>
        </div>
      </nav>
      <section className="d-flex justify-content-center">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="position-absolute notifToast px-2"
        >
          <Toast.Body>Status produk berhasil diperbarui</Toast.Body>
        </Toast>
        <div className="container mt-3" style={{ maxWidth: "700px" }}>
          <a href="/">
            {" "}
            <img src={arrow} alt="" />
          </a>
          <Stack direction="horizontal" gap={3} className="infoPenjual mt-4">
            <img
              src={detailUser.photo_profile}
              alt=""
              className="imageSmall"
              style={{ width: "48px", height: "48px" }}
            />
            <div>
              <h5
                className="my-auto"
                style={{ fontSize: "14px", lineHeight: "24px" }}
              >
                {detailUser.name}
              </h5>
              <p
                className="my-auto"
                style={{ fontSize: "14px", color: "#BABABA" }}
              >
                {detailUser.city}
              </p>
            </div>
          </Stack>
          <div className="mt-4" style={{ padding: "5px" }}>
            <h5
              className="my-auto"
              style={{ fontSize: "14px", lineHeight: "24px" }}
            >
              Daftar Produkmu yang Ditawar
            </h5>
            {produkDitawar.map((produk, index) => {
              return (
                <div key={`modal${index}`}>
                  <div style={{ marginTop: "10px", marginBottom: "70px" }}>
                    <Stack direction="horizontal" gap={3}>
                      <img
                        src={produk.Product.image_1}
                        alt=""
                        className="imageSmall align-self-start mt-1"
                        style={{ width: "48px", height: "48px" }}
                      />
                      <div>
                        <p
                          className="my-auto"
                          style={{ fontSize: "12px", color: "#BABABA" }}
                        >
                          Penawaran Produk
                        </p>
                        <h5
                          className="my-auto"
                          style={{ fontSize: "14px", lineHeight: "26px" }}
                        >
                          {produk.Product.product_name}
                        </h5>
                        <h5
                          className="my-auto"
                          style={{ fontSize: "14px", lineHeight: "26px" }}
                        >
                          {rupiah(produk.Product.price)}
                        </h5>
                        <h5
                          className="my-auto"
                          style={{ fontSize: "14px", lineHeight: "26px" }}
                        >
                          Ditawar {rupiah(produk.offering_price)}
                        </h5>
                      </div>
                      <p
                        className="align-self-start ms-auto"
                        style={{ fontSize: "12px", color: "#BABABA" }}
                      >
                        {format(parseISO(produk.createdAt), "dd MMM, kk:mm")}
                      </p>
                    </Stack>

                    {listtransaksi.find((x) => x.id_offering === produk.id) ? (
                      <>
                        <div className="float-end mt-2">
                          {produk.status === "BERHASIL" ||
                          produk.status === "GAGAL" ? (
                            <>
                              <Button
                                className="btnOutline me-2 px-5"
                                data-toggle="modal"
                                data-target={`#status${produk.id}`}
                                disabled
                              >
                                Transaksi {produk.status}
                              </Button>
                              <a
                                href={
                                  "https://api.whatsapp.com/send/?phone=" +
                                  detailUser.no_hp +
                                  "&text&app_absent=0"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="btnPrimary px-3">
                                  Hubungi di{" "}
                                  <i className="bi bi-whatsapp ms-2"></i>
                                </Button>
                              </a>
                            </>
                          ) : (
                            <>
                              <Button
                                className="btnOutline me-2 px-5"
                                data-toggle="modal"
                                data-target={`#status${produk.id}`}
                              >
                                Status
                              </Button>
                              <a
                                href={
                                  "https://api.whatsapp.com/send/?phone=" +
                                  detailUser.no_hp +
                                  "&text&app_absent=0"
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="btnPrimary px-3">
                                  Hubungi di{" "}
                                  <i className="bi bi-whatsapp ms-2"></i>
                                </Button>
                              </a>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="float-end mt-2">
                          {produk.status === "Ditolak" ? (
                            <>
                              <Button
                                className="btnOutline me-2 px-5"
                                // onClick={() => handleTolak(index)}
                                disabled
                              >
                                Tawaran ditolak
                              </Button>
                              <Button
                                className="btnPrimary px-5"
                                onClick={() => handleTerima(index)}
                                data-toggle="modal"
                                data-target={`#modal${produk.id}`}
                                disabled
                              >
                                Terima
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                className="btnOutline me-2 px-5"
                                onClick={() => handleTolak(index)}
                              >
                                Tolak
                              </Button>
                              <Button
                                className="btnPrimary px-5"
                                onClick={() => handleTerima(index)}
                                data-toggle="modal"
                                data-target={`#modal${produk.id}`}
                              >
                                Terima
                              </Button>
                            </>
                          )}
                        </div>
                      </>
                    )}

                    {/* Modal Terima*/}
                    <div
                      className="modal fade"
                      id={`modal${produk.id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modalPenawaran">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={handlerefresh}
                            ></button>
                          </div>
                          <div className="modal-body">
                            Yeay kamu berhasil mendapat harga yang sesuai
                            <p
                              className="align-self-start ms-auto"
                              style={{ fontSize: "14px", color: "#BABABA" }}
                            >
                              Segera hubungi pembeli melalui whatsapp untuk
                              transaksi selanjutnya
                            </p>
                            <Stack gap={3} className="modalProduk">
                              <div className="text-center fw-bold">
                                Product Match
                              </div>
                              <Stack direction="horizontal" gap={3}>
                                <img
                                  src={produk.User.photo_profile}
                                  alt=""
                                  className="imageSmall"
                                />
                                <div>
                                  <h5
                                    className="my-auto"
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "24px",
                                    }}
                                  >
                                    {produk.User.name}
                                  </h5>
                                  <p
                                    className="my-auto"
                                    style={{
                                      fontSize: "14px",
                                      color: "#BABABA",
                                    }}
                                  >
                                    {produk.User.city}
                                  </p>
                                </div>
                              </Stack>
                              <Stack direction="horizontal" gap={3}>
                                <img
                                  src={produk.Product.image_1}
                                  alt=""
                                  className="imageSmall align-self-start mt-1"
                                />
                                <div>
                                  <h5
                                    className="my-auto"
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "26px",
                                    }}
                                  >
                                    {produk.Product.product_name}
                                  </h5>
                                  <h5
                                    className="my-auto"
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "26px",
                                    }}
                                  >
                                    <del>{produk.Product.price}</del>
                                  </h5>
                                  <h5
                                    className="my-auto"
                                    style={{
                                      fontSize: "14px",
                                      lineHeight: "26px",
                                    }}
                                  >
                                    Ditawar {produk.offering_price}
                                  </h5>
                                </div>
                              </Stack>
                            </Stack>
                            <button
                              type="button"
                              className="btn btnPrimary mt-3 w-100"
                              id="btnSubmit"
                              onClick={() => setShow(true)}
                              data-dismiss="modal"
                            >
                              Hubungi via Whatsapp{" "}
                              <i className="bi bi-whatsapp ms-2"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Modal Status */}
                    <div
                      className="modal fade"
                      id={`status${produk.id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content modalPenawaran">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close"
                              data-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <Stack gap={3}>
                              <div>Perbarui status penjualan produkmu</div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  value="BERHASIL"
                                  onClick={(e) => setStatus(e.target.value)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault1"
                                >
                                  Berhasil terjual
                                </label>
                                <p
                                  className="my-auto"
                                  style={{ fontSize: "14px", color: "#BABABA" }}
                                >
                                  Kamu telah sepakat menjual produk ini kepada
                                  pembeli
                                </p>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  value="GAGAL"
                                  onClick={(e) => setStatus(e.target.value)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexRadioDefault2"
                                >
                                  Batalkan transaksi
                                </label>
                                <p
                                  className="my-auto"
                                  style={{ fontSize: "14px", color: "#BABABA" }}
                                >
                                  Kamu membatalkan transaksi produk ini dengan
                                  pembeli
                                </p>
                              </div>
                            </Stack>
                            <button
                              type="button"
                              className="btn btnPrimary mt-3 w-100"
                              id="btnSubmit"
                              onClick={() => handleModalStatus(index)}
                              data-dismiss="modal"
                            >
                              Kirim
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="mb-4"></hr>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
