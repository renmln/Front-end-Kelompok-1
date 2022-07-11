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
import { getAllOffering, getOfferingByIdBuyer } from "../../redux/actions/offeringActions";

export default function InfoPenawaran() {
    let [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, status, detailUser } = useSelector((state) => state.auth);
    const { alloffer } = useSelector((state) => state.offering);

    useEffect(() => {
        dispatch(getUserbyID(id))
    }, [dispatch, id]);
    console.log(detailUser)

    useEffect(() => {
        dispatch(getAllOffering())
    }, [dispatch]);

    console.log(alloffer)
    // Data Dummy
    const produkDitawar = [];
    // Buat orderan baru masuk
    // for (let i = 1; i <= 2; i++) {
    //     produkDitawar.push({
    //         id: i,
    //         nama: "Jam Tangan Casio",
    //         gambar: "Jam",
    //         harga: "Rp. 250.000",
    //         ditawar: "Rp. 200.000",
    //         date: "20 Apr, 14:04",
    //         status: "Ditawarkan",
    //     });
    // }

    // // Buat orderan udah diterima
    // for (let i = 1; i <= 2; i++) {
    //     produkDitawar.push({
    //         id: i,
    //         nama: "Jam Tangan Casio",
    //         gambar: "Jam",
    //         harga: "Rp. 250.000",
    //         ditawar: "Rp. 200.000",
    //         date: "20 Apr, 14:04",
    //         status: "Diterima",
    //     });
    // }

    if (alloffer && detailUser) {
        for (let i = 0; i < alloffer.length; i++) {
            if (alloffer[i].id_buyer === detailUser.id) {
                produkDitawar.push(alloffer[i])
            }
        }
    }
    console.log(produkDitawar)



    return (
        <div>
            <NavBar />
            <nav className="navbar navbar-expand-lg bg-light d-inline-flex" style={{ justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div className="d-inline-flex" style={{ padding: "10px", justifyContent: "center", alignItems: "center" }}>
                    <a className="navbar-brand" href="/">
                        {" "}
                        <img src={Rectangle127} alt="" />
                    </a>
                </div>

                <div className="d-inline-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                    <span className="navbar-brand mb-0 h1" style={{ fontWeight: "400px" }}>
                        Info Penawar
                    </span>
                </div>

                <div className="d-inline-flex" style={{ justifyContent: "center", alignItems: "center" }}>
                    <span className="navbar-brand mb-0 h1"></span>
                </div>
            </nav>
            <section className="d-flex justify-content-center">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide className="position-absolute notifToast px-2">
                    <Toast.Body>Status produk berhasil diperbarui</Toast.Body>
                </Toast>
                <div className="container mt-3" style={{ maxWidth: "700px" }}>
                    <a href="/">
                        {" "}
                        <img src={arrow} alt="" />
                    </a>
                    <Stack direction="horizontal" gap={3} className="infoPenjual mt-4">
                        <img src={detailUser.photo_profile} alt="" className="imageSmall" style={{ width: "48px", height: "48px" }} />
                        <div>
                            <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "24px" }}>
                                {detailUser.name}
                            </h5>
                            <p className="my-auto" style={{ fontSize: "14px", color: "#BABABA" }}>
                                {detailUser.city}
                            </p>
                        </div>
                    </Stack>
                    <div className="mt-4" style={{ padding: "5px" }}>
                        <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "24px" }}>
                            Daftar Produkmu yang Ditawar
                        </h5>
                        {produkDitawar.map((produk, index) => {
                            return (
                                <div key={`modal${index}`}>
                                    <div style={{ marginTop: "10px", marginBottom: "70px" }}>
                                        <Stack direction="horizontal" gap={3}>
                                            <img src={produk.Product.image_1} alt="" className="imageSmall align-self-start mt-1" style={{ width: "48px", height: "48px" }} />
                                            <div>
                                                <p className="my-auto" style={{ fontSize: "12px", color: "#BABABA" }}>
                                                    Penawaran Produk
                                                </p>
                                                <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "26px" }}>
                                                    {produk.Product.product_name}
                                                </h5>
                                                <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "26px" }}>
                                                    {produk.Product.price}
                                                </h5>
                                                <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "26px" }}>
                                                    {produk.offering_price}
                                                </h5>
                                            </div>
                                            <p className="align-self-start ms-auto" style={{ fontSize: "12px", color: "#BABABA" }}>
                                                Tanggal dan jam
                                            </p>
                                        </Stack>
                                        {produk.length>0 ? (
                                            <div className="float-end mt-2">
                                                <Button className="btnOutline me-2 px-5">Tolak</Button>
                                                <Button className="btnPrimary px-5" data-toggle="modal" data-target={`#modal${produk.id}`}>
                                                    Terima
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="float-end mt-2">
                                                <Button className="btnOutline me-2 px-5" data-toggle="modal" data-target={`#status${produk.id}`}>
                                                    Status
                                                </Button>
                                                <Button className="btnPrimary px-3">
                                                    Hubungi di <i className="bi bi-whatsapp ms-2"></i>
                                                </Button>
                                            </div>
                                        )}

                                        {/* Modal Terima*/}
                                        <div className="modal fade" id={`modal${produk.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content modalPenawaran">
                                                    <div className="modal-header">
                                                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        Yeay kamu berhasil mendapat harga yang sesuai
                                                        <p className="align-self-start ms-auto" style={{ fontSize: "14px", color: "#BABABA" }}>
                                                            Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
                                                        </p>
                                                        <Stack gap={3} className="modalProduk">
                                                            <div className="text-center fw-bold">Product Match</div>
                                                            <Stack direction="horizontal" gap={3}>
                                                                <img src={profilpenjual} alt="" className="imageSmall" />
                                                                <div>
                                                                    <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "24px" }}>
                                                                        Nama Pembeli
                                                                    </h5>
                                                                    <p className="my-auto" style={{ fontSize: "14px", color: "#BABABA" }}>
                                                                        Kota
                                                                    </p>
                                                                </div>
                                                            </Stack>
                                                            <Stack direction="horizontal" gap={3}>
                                                                <img src={profilproduk} alt="" className="imageSmall align-self-start mt-1" />
                                                                <div>
                                                                    <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "26px" }}>
                                                                        {produk.nama}
                                                                    </h5>
                                                                    <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "26px" }}>
                                                                        <del>{produk.harga}</del>
                                                                    </h5>
                                                                    <h5 className="my-auto" style={{ fontSize: "14px", lineHeight: "26px" }}>
                                                                        Ditawar {produk.ditawar}
                                                                    </h5>
                                                                </div>
                                                            </Stack>
                                                        </Stack>
                                                        <button type="button" className="btn btnPrimary mt-3 w-100" id="btnSubmit" onClick={() => setShow(true)} data-dismiss="modal">
                                                            Hubungi via Whatsapp <i className="bi bi-whatsapp ms-2"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Modal Status */}
                                        <div className="modal fade" id={`status${produk.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content modalPenawaran">
                                                    <div className="modal-header">
                                                        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <Stack gap={3}>
                                                            <div>Perbarui status penjualan produkmu</div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                    Berhasil terjual
                                                                </label>
                                                                <p className="my-auto" style={{ fontSize: "14px", color: "#BABABA" }}>
                                                                    Kamu telah sepakat menjual produk ini kepada pembeli
                                                                </p>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                    Batalkan transaksi
                                                                </label>
                                                                <p className="my-auto" style={{ fontSize: "14px", color: "#BABABA" }}>
                                                                    Kamu membatalkan transaksi produk ini dengan pembeli
                                                                </p>
                                                            </div>
                                                        </Stack>
                                                        <button type="button" className="btn btnPrimary mt-3 w-100" id="btnSubmit" onClick={() => setShow(true)} data-dismiss="modal">
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
