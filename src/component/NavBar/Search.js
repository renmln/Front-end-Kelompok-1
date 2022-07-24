import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiSearch, FiX } from "react-icons/fi";
import { Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/style.css";
import { getAllProduct } from "../../redux/actions/productsActions";

export default function Search() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isTrigger, setIsTrigger] = useState(false);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch, wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = product.filter((value) => {
      return value.product_name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setIsTrigger(false);
      setFilteredProduct([]);
    } else {
      setIsTrigger(true);
      setFilteredProduct(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredProduct([]);
    setWordEntered("");
    setIsTrigger(false);
  };

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  }

  return (
    <div>
      <form className="d-flex border buttonradius12 ">
        <input
          className="form-control border-0"
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={wordEntered}
          onChange={handleFilter}
        ></input>
        {filteredProduct.length === 0 ? (
          <button className="btn" type="submit">
            <FiSearch />
          </button>
        ) : (
          <button className="btn" onClick={clearInput}>
            <FiX />
          </button>
        )}
      </form>

      {!isTrigger ? (
        <></>
      ) : (
        <Container>
          <div
            id="card"
            className="container search"
            style={{ backgroundColor: "white" }}
          >
            <div className="row d-flex justify-content-center pt-2">
              {filteredProduct.length !== 0 &&
                filteredProduct.slice(0, 15) &&
                filteredProduct
                  .filter((item) => item.status !== "NOT AVAILABLE")
                  .map((item) => (
                    <div
                      key={item.id}
                      className=" col col-md-2 col-xl-12 col-sm-6 py-2 justify-content-center"
                    >
                      <a
                        href={`/halamanproduk/${item.id}`}
                        className="text-decoration-none"
                        style={{ color: "black" }}
                      >
                        <div className="card " style={{ border: "none" }}>
                          <div className="d-flex justify-content-center">
                            <img
                              className="card-img-top center-cropped m-1 img-fluid"
                              src={item.image_1}
                              style={{
                                width: "150px",
                                height: "100px",
                                objectFit: "contain",
                              }}
                              alt="test"
                            />
                          </div>
                          <div className="card-body">
                            <p
                              className="card-title text-decoration-none"
                              style={{ fontSize: "14px", fontWeight: "bold" }}
                            >
                              {item.product_name}
                            </p>
                            <p
                              className="text-decoration-none"
                              style={{ fontSize: "10px" }}
                            >
                              {item.category}
                            </p>
                            <p
                              className="text-decoration-none"
                              style={{ fontSize: "12px" }}
                            >
                              {rupiah(item.price)}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
