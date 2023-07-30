import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

function Register() {
  const router = useRouter();
  const [errMsg, setErrMsg] = React.useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    company: "",
    job_title: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePasswords = () => {
    return formData.password === confirmPassword;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = null;

    if (validatePasswords()) {
      try {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/register`,
          formData
        );

        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrMsg(response?.data?.message ?? "Password tidak sama");
    }
  };

  return (
    <div id="register_page">
      <div className="container">
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
                Temukan developer berbakat & terbaik di berbagai bidang keahlian
              </h1>
            </div>
          </div>
          <div className="col-12 col-sm-6 d-flex align-items-center">
            <div className="d-flex flex-column justify-content-center">
              <h2 className="m-5 mt-2 mb-0">Halo, Pewpeople</h2>
              <p className="m-5 mt-1 mb-2">
                Selamat datang, Silahkan daftar untuk melanjutkan!
              </p>

              <form onSubmit={handleSubmit}>
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="inputName" className="form-label">
                    Nama
                  </label>
                  <input
                    type="name"
                    className="form-control "
                    name="fullname"
                    id="inputName"
                    value={formData.fullname}
                    onChange={handleChange}
                    aria-describedby="name"
                    placeholder="Masukan nama"
                    required
                  />
                </div>
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control "
                    name="email"
                    id="inputEmail"
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby="email"
                    placeholder="Masukan alamat email"
                    required
                  />
                </div>
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="inputPhoneNumber" className="form-label">
                    No Handphone
                  </label>
                  <input
                    type="phoneNumber"
                    className="form-control "
                    name="phone"
                    id="inputPhoneNumber"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-describedby="phoneNumber"
                    placeholder="Masukan no handphone"
                    required
                  />
                </div>
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="inputPhoneNumber" className="form-label">
                    Company
                  </label>
                  <input
                    type="company"
                    className="form-control "
                    name="company"
                    id="inputCompany"
                    value={formData.company}
                    onChange={handleChange}
                    aria-describedby="company"
                    placeholder="Masukan company name"
                    required
                  />
                </div>
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="inputJobTitle" className="form-label">
                    Job Tittle
                  </label>
                  <input
                    type="job_title"
                    className="form-control"
                    name="job_title"
                    id="inputJobTitle"
                    value={formData.job_title}
                    onChange={handleChange}
                    aria-describedby="job_title"
                    placeholder="Masukan job title"
                    required
                  />
                </div>
                {errMsg ? (
                  <div
                    class="alert alert-danger ms-5 me-5 mt-2 mb-0"
                    role="alert"
                  >
                    {errMsg}
                  </div>
                ) : null}
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control "
                    name="password"
                    id="inputPassword"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukan kata sandi"
                    required
                  />
                </div>
                <div className="m-5 mt-0 mb-0">
                  <label htmlFor="inputPassword2" className="form-label">
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    className="form-control "
                    id="InputPassword2"
                    placeholder="Konfirmasi kata sandi"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="m-5 mt-3 mb-0 d-grid">
                  <button type="submit" className="btn btn-warning btn-lg">
                    Daftar
                  </button>
                </div>
              </form>

              <p className="text-center mt-3">
                Anda sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="text-decoration-none text-warning"
                >
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
