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
  const [isLoading, setIsLoading] = useState(false);

  const validatePasswords = () => {
    return formData.password === confirmPassword;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = null;

    if (validatePasswords()) {
      try {
        const verif = "must be between 8 and 50 characters";
        const validationRules = {
          email: {
            required: true,
            errorMessage: "Email is required",
          },
          password: {
            required: true,
            minLength: 8,
            maxLength: 50,
            errorMessage: `Password ${verif}`,
          },
          fullname: {
            required: true,
            minLength: 8,
            maxLength: 50,
            errorMessage: "Name must be between 8 and 50 characters",
          },
          company: {
            required: true,
            minLength: 8,
            maxLength: 50,
            errorMessage: "Company name must be between 8 and 50 characters",
          },
          job_title: {
            required: true,
            minLength: 8,
            maxLength: 50,
            errorMessage: "Job title must be between 8 and 50 characters",
          },
          phone: {
            required: true,
            minLength: 8,
            maxLength: 50,
            errorMessage: "Phone number must be between 8 and 50 characters",
          },
        };

        let isValid = true;

        Object.entries(validationRules).forEach(([field, rules]) => {
          if (rules.required && formData[field] === "") {
            setErrMsg(rules.errorMessage);
            isValid = false;
          } else if (
            rules.minLength &&
            formData[field].length < rules.minLength
          ) {
            setErrMsg(rules.errorMessage);
            isValid = false;
          } else if (
            rules.maxLength &&
            formData[field].length > rules.maxLength
          ) {
            setErrMsg(rules.errorMessage);
            isValid = false;
          }
        });

        if (!isValid) {
          setIsLoading(false);
          return;
        }

        response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/register`,
          formData
        );

        router.push("/login");
      } catch (error) {
        if ((error.response.message = "Request failed with status code 422")) {
          setErrMsg("The email must be a valid email address.");
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrMsg("Password tidak sama");
      setIsLoading(false);
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
                {errMsg && (
                  <div
                    className="alert alert-danger ms-5 me-5 mt-2 mb-0"
                    role="alert"
                  >
                    {errMsg}
                  </div>
                )}
                <div className="m-5 mt-3 mb-0 d-grid">
                  <button type="submit" className="btn btn-warning btn-lg">
                    {isLoading ? "Loading..." : "Daftar"}
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
