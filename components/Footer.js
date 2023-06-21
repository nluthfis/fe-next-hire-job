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
                  Lorem ipsum dolor sit amet,consectetur
                  <br /> adipiscing elit. In euismod ipsum et dui <br /> rhoncus
                  auctor.
                </p>
              </div>
              <hr
                className="bg-white"
                style={{ height: "5px", width: "100%" }}
              />
              <div className="d-flex justify-content-between text-light">
                <p> 2020 Pewworld. All right reserved</p>
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
