import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-primary" style={{ minHeight: "40vh" }}>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12 ">
              <img className="mt-5 " src="/logo_white.png" alt="Image-desc" />
              <div className="text-md-start">
                <p className="me-5 mt-4 mb-5 text-light ">
                  Peworld menawarkan solusi untuk <br />
                  mencari pekerja dan pekerjaan yang <br />
                  berkualitas.
                </p>
              </div>
              <hr
                className="bg-white"
                style={{ height: "5px", width: "100%" }}
              />
              <div className="d-flex justify-content-between text-light">
                <p> 2023 Peworld. All right reserved</p>
                <div className="d-flex">
                  <p className="me-5"> Telepon </p>
                  <p> Email </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </footer>
  );
}

export default Footer;
