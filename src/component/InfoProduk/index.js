import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rectangle127 from "../../images/Rectangle127.svg"
import fi_plus from "../../images/fi_plus.png"

export default function InfoProduk() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-light d-inline-flex" style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div className="d-inline-flex" style={{ padding: '10px', justifyContent: 'center', alignItems: 'center' }}>
                    <a className="navbar-brand" href="/"><img src={Rectangle127} alt='' />
                    </a>
                </div>

            </nav>


            <section>
                <form>
                    <div className="container" style={{ padding: '30px', width: '70%' }}>
                        <div className="mb-3">
                            <label for="namaproduk" className="form-label">Nama Produk<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="namaproduk" placeholder="Nama Produk" required style={{borderRadius: '16px'}}/>
                        </div>
                        <div class="mb-3">
                            <label for="harga" className="form-label">Harga Produk<span style={{ color: 'red' }}>*</span></label>
                            <input type="number" min="1" step="any" className="form-control" id="harga" placeholder="Rp 0,00" required  style={{borderRadius: '16px'}}/>
                        </div>
                        <div className="mb-3">
                            <label for="kategori" className="form-label">Kategori<span style={{ color: 'red' }}>*</span></label>
                            <select className="form-select" id="kategori" required  style={{borderRadius: '16px'}}>
                                <option selected>Pilih Kategori</option>
                                <option value="1"> Pakaian</option>
                                <option value="2"> Makanan</option>
                                <option value="3"> Elektronik</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label for="deskripsi" className="form-label">Deskripsi<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="deskripsi" placeholder="contoh: Jalan Ikan Hiu 33" required  style={{borderRadius: '16px'}}/>
                        </div>

                        <div className="mb-3">
                            <label for="deskripsi" className="form-label">Foto Produk<span style={{ color: 'red' }}>*</span></label>
                            <div>
                                <label><img src={fi_plus} alt='' style={{ borderStyle: 'dashed', padding: '34px', borderRadius: '12px', width: '96px', borderColor: '#d0d0d0' }} />
                                    <input type="file" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} /></label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <button type="submit" class="btn" style={{ width: '100%', backgroundColor: 'white', borderRadius: '16px', color: 'black', borderColor: '#7126B5' }}>Preview</button>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', backgroundColor: '#7126B5', borderRadius: '16px' }}>Terbitkan</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </section>
        </div>
    )
}