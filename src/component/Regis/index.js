import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../images/img.png";
import "../../css/style.css";
import icon from "../../images/img.png";
import Swal from "sweetalert2";

// Redux Action
import {regis} from "../../redux/actions/authActions";

export default function Regis() {
    const dispatch = useDispatch();
    const {isAuthenticated, status} = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const Register = async (e) => {
        if (email === "" || password === "" || name === "") {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please fill all field",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            const data = {
                email,
                password,
                name,
            };
            dispatch(regis(data));
        }
    };

    if (status === "OK") {
        return <Navigate to={`/login`} />;
    }

    return (
        <>
            {!isAuthenticated ? (
                <section className="Form my-4 mx-5">
                    <div className="container">
                        <div className="row rowlogin no-gutters">
                            <div className="col-lg-5">
                                <img className="img-fluid img1" src={icon} alt="" />
                            </div>
                            <div className="col-lg-7 px-5 pt-5">
                                <h1 className="font-weight-bold py-3">Daftar</h1>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <label className="fw-bold my-0">Nama</label>
                                        <input
                                            type="nama"
                                            placeholder="Nama Lengkap"
                                            className="form-control my-3 p-4 mt-0 buttonradius16"
                                            style={{height: "48px"}}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <label className="fw-bold my-0">Email</label>
                                        <input
                                            type="email"
                                            placeholder="johndee@gmail.com"
                                            className="form-control my-3 mt-0 p-4 buttonradius16"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{height: "48px"}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <label className="fw-bold my-0">Password</label>
                                        <input
                                            type="password"
                                            placeholder="Masukkan Password"
                                            className="form-control my-3 p-4 buttonradius16 mt-0"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{height: "48px"}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <button type="button" className="btn1 btn-custom buttonradius16 is-success is-fullwidth" style={{height: "48px"}} onClick={() => Register()}>
                                            Daftar
                                        </button>
                                    </div>
                                </div>
                                <p className="my-1">
                                    Sudah punya akun?
                                    <a href="/login" className=" fw-bold" style={{color: "#7126B5"}}>
                                        Masuk disini
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}
