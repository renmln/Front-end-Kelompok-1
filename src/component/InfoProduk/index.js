import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Rectangle127 from "../../images/Rectangle127.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fi_plus from "../../images/fi_plus.png";
// import { Link } from "react-router-dom";

export default function InfoProduk() {
  const [id_seller, setIdSeller] = useState("");
  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userId");
  const id = userInfo;
  // const data = localStorage.getItem("userInfo");
  // const userInfo = JSON.parse(data);
  // const idseller = userInfo.id
  // console.log(idseller)

  const addProduct = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (var i = 0; i < file.length; i++) {
      form.append("picture", file[i]);
    }
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/products/cloudinary/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.url)
      await axios.post(`http://localhost:8000/api/v1/products/add`, {
        id_seller: id,
        product_name: product_name,
        price: price,
        image_1: response.data.url[0],
        image_2: response.data.url[1],
        image_3: response.data.url[2],
        image_4: response.data.url[3],
        category: category,
        description: description,
      });
      navigate("/daftarjual");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-light d-inline-flex"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          className="d-inline-flex"
          style={{
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a className="navbar-brand" href="/">
            <img src={Rectangle127} alt="" />
          </a>
        </div>
      </nav>

      <section>
        <form onSubmit={addProduct}>
          <input
            type="text"
            value={id_seller}
            onChange={(e) => setIdSeller(e.target.value)}
            hidden
          />
          <div className="container" style={{ padding: "30px", width: "70%" }}>
            <div className="mb-3">
              <label for="namaproduk" className="form-label">
                Nama Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="namaproduk"
                placeholder="Nama Produk"
                required
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="harga" className="form-label">
                Harga Produk<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                min="1"
                step="any"
                className="form-control"
                id="harga"
                placeholder="Rp 0,00"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="kategori" className="form-label">
                Kategori<span style={{ color: "red" }}>*</span>
              </label>
              {/* <select className="form-select" id="kategori" required>
                                <option selected>Pilih Kategori</option>
                                <option value="1"> Pakaian</option>
                                <option value="2"> Makanan</option>
                                <option value="3"> Elektronik</option>
                            </select> */}
              <input
                type="text"
                className="form-control"
                id="kategori"
                placeholder="Kategori Produk"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="deskripsi" className="form-label">
                Deskripsi<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="deskripsi"
                placeholder="contoh: Jalan Ikan Hiu 33"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label for="deskripsi" className="form-label">
                Foto Produk<span style={{ color: "red" }}>*</span>
              </label>
              <div>
                <div className="row">
                  <div className="col-md-3">
                    <label>
                      {file ? (
                        <img src={file} alt="" />
                      ) : (
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        // style={{ display: "none" }}
                        placeholder="Upload Image"
                        onChange={(e) => setFile(e.target.files)}
                        multiple
                      />
                    </label>
                  </div>
                  {/* <div className="col-md-3">
                    <label>
                      {image_1 ? (
                        <img src={image_1} alt="" />
                      ) : (
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        placeholder="Upload Image"
                        onChange={(e) => setImage2(e.target.files)}
                        multiple
                      />
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {image_1 ? (
                        <img src={image_1} alt="" />
                      ) : (
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        placeholder="Upload Image"
                        onChange={(e) => setImage3(e.target.files)}
                        multiple
                      />
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      {image_1 ? (
                        <img src={image_1} alt="" />
                      ) : (
                        <img
                          src={fi_plus}
                          alt=""
                          style={{
                            borderStyle: "dashed",
                            padding: "34px",
                            borderRadius: "12px",
                            width: "96px",
                            borderColor: "#d0d0d0",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        placeholder="Upload Image"
                        onChange={(e) => setImage4(e.target.files)}
                        multiple
                      />
                    </label>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <button
                    type="submit"
                    class="btn"
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: "16px",
                      color: "black",
                      borderColor: "#7126B5",
                    }}
                  // component={Link}
                  // to="/infoprofil"
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      backgroundColor: "#7126B5",
                      borderRadius: "16px",
                    }}
                  >
                    Terbitkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
