import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";

import {Container, Row, Col, Form, Button, Stack} from "react-bootstrap";
import "../../css/auth.css";
import CoverAuth from "../../images/img.png";
import Swal from "sweetalert2";

import {login, clear} from "../../redux/actions/authActions";

const Regis = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, status, error} = useSelector((state) => state.auth);

    useEffect(() => {
        if (error) {
            alert(error);
        }
        dispatch(clear());
    }, [dispatch, error]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        if (email === "") {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Harap isi email anda",
                showConfirmButton: false,
                timer: 1000,
            });
        } else if (password === "") {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Harap isi password anda",
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            dispatch(login({email, password}));
        }
    };

    if (status === "LOGIN_SUCCESS") {
        return <Navigate to={`/`} />;
    }

    return (
        <>
            {!isAuthenticated ? (
                <Container fluid>
                    <Row className="h-100 align-items-center">
                        <Col lg={6} className="m-0 p-0 cover-image">
                            <img src={CoverAuth} className="img-fluid image-login" alt="" />
                        </Col>
                        <Col lg={6}>
                            <Form className="formAuth">
                                <h3 className="fw-bold mb-3">Masuk</h3>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label className="formLabel">Email</Form.Label>
                                    <Form.Control type="email" className="formInput" placeholder="Contoh: johndee@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="formLabel">Password</Form.Label>
                                    <Form.Control type="password" className="formInput" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button type="button" className="btn-block w-100 mb-3 btnPrimary" onClick={() => handleSubmit()}>
                                    Masuk
                                </Button>
                                <div className="mt-3 d-flex justify-content-center">
                                    <Stack direction="horizontal" gap={1}>
                                        <p>Belum punya akun?</p>
                                        <Link to="/regis">
                                            <p style={{color: "#4b1979", fontWeight: "bold"}}>Daftar di sini</p>
                                        </Link>
                                    </Stack>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default Regis;
