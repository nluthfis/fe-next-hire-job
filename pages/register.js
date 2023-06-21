import React from "react";
import Link from "next/link";

function Register() {
  return (
    <div id="register_page">
      <div className="container">
        <div className="col">
          <div className="row">
            <div className="col-6 mt-3 d-none d-sm-block">
              <div
                className="d-flex align-items-center justify-content-center text-white fs-3 fw-bold img-fluid"
                style={{
                  width: "100%",
                  height: "95vh",
                  backgroundImage: `linear-gradient(rgba(94, 80, 161, 0.76), rgba(94, 80, 161, 0.76)), url('/auth.png')`,
                  backgroundSize: "cover",
                }}
              >
                <h1 className="m-5 p-5">
                  Temukan developer berbakat & terbaik di berbagai bidang
                  keahlian
                </h1>
              </div>
            </div>
            <div className="col-12 col-sm-6 d-flex align-items-center">
              <div className="d-flex flex-column justify-content-center">
                <h2 className="m-5 mt-2 mb-0">Halo, Pewpeople</h2>
                <p className="m-5 mt-1 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  euismod ipsum et dui rhoncus auctor.
                </p>

                <form>
                  <div className="m-5 mt-1 mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Nama
                    </label>
                    <input
                      type="name"
                      className="form-control form-control-lg"
                      id="inputName"
                      aria-describedby="name"
                      placeholder="Masukan nama"
                    />
                  </div>
                  <div className="m-5 mt-1 mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="inputEmail"
                      aria-describedby="email"
                      placeholder="Masukan alamat email"
                    />
                  </div>
                  <div className="m-5 mt-1 mb-3">
                    <label htmlFor="inputPhoneNumber" className="form-label">
                      No Handphone
                    </label>
                    <input
                      type="phoneNumber"
                      className="form-control form-control-lg"
                      id="inputPhoneNumber"
                      aria-describedby="phoneNumber"
                      placeholder="Masukan no handphone"
                    />
                  </div>
                  <div className="m-5 mt-1 mb-3">
                    <label htmlFor="Password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="inputPassword"
                      placeholder="Masukan kata sandi"
                    />
                  </div>
                  <div className="m-5 mt-1 mb-3">
                    <label htmlFor="inputPassword2" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="InputPassword2"
                      placeholder="Konfirmasi kata sandi"
                    />
                  </div>

                  <div className="m-5 mt-1 mb-3 d-grid">
                    <button type="submit" className="btn btn-warning btn-lg">
                      Daftar
                    </button>
                  </div>

                  <p className="text-center mt-3">
                    Anda sudah punya akun?{" "}
                    <Link
                      href="/login"
                      className="text-decoration-none text-warning"
                    >
                      Masuk disini
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
