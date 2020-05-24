import React from "react";
import "./Subscription.css";

const Subscription = () => {
  return (
    <div className="row p-0 m-0 p-5 bg-subscription" id="kontak">
      <div className="row vh-50 bg-light d-flex justify-content-center align-items-center">
        <div className="col-lg-12 col-md-12 col-sm-12 p-5 vh-50">
          <div className="row">
            <div className="col-lg-6 col-md-7 col-sm-12">
              <h3>Berhubunganlah Dengan Kami</h3>
              <p>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
              <p>0812121212</p>
              <p>iqbalkorompiz@gmail.com</p>
              <p>@hanekawa_hanbei</p>
            </div>
            <div className="col-lg-6 col-md-5 col-sm-12">
              <div className="card" style={{ zIndex: "8" }}>
                <div className="card-body">
                  <div className="card-text text-uppercase my-3">
                    Send us message
                  </div>
                  <form action="" className="form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nama"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="form-control disabled-resize"
                        placeholder="Pesan"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-block btn-outline-primary">
                        Send us message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row vh-50 d-flex justify-content-center align-items-center flex-column bg-primary w-100">
        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">
          <div className="display-4 mt-5">Berlangganan Sekarang</div>
          <div className="h3 mt-3">
            Dapatkan info seputar berita dan event dari kami
          </div>
          <div className="form-subscribe d-flex justify-content-center align-items-center w-50 mt-3">
            <input
              type="text"
              className="form-control mr-3"
              placeholder="Email"
            />
            <button className="btn btn-outline-light">Berlangganan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
