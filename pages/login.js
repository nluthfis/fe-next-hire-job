import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
function Login() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errMsg, setErrMsg] = React.useState(null);

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("/api/login", { email, password })
      .then((response) => {
        const token = response?.data?.token;

        localStorage.setItem("token", token);

        if (token === "123") {
          router.replace("/");
        } else if (token === "456") {
          router.replace("/");
        } else {
          setErrMsg("Invalid token");
        }
      })
      .catch(({ response }) => {
        setErrMsg(response?.data?.message ?? "Something wrong on our server");
      });
  };

  return (
    <div id="login_page">
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
              <h1 className="text-tittle m-5 p-5">
                Temukan developer berbakat & terbaik di berbagai bidang keahlian
              </h1>
            </div>
          </div>
          <div className="col-12 col-sm-6 d-flex align-items-center">
            <div className="d-flex flex-column justify-content-center">
              <h2 className="m-5 mb-0">Halo, Pewpeople</h2>
              <p className="m-5 mt-2 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                euismod ipsum et dui rhoncus auctor.
              </p>
              {errMsg ? (
                <div class="alert alert-danger ms-5" role="alert">
                  {errMsg}
                </div>
              ) : null}

              <form onSubmit={handleLogin}>
                <div className="m-5 mt-2 mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Masukan alamat email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="m-5 mt-2 mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Masukan kata sandi"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="m-5 mt-2 mb-3 d-grid">
                  <button type="submit" className="btn btn-warning btn-lg">
                    Masuk
                  </button>
                </div>

                <p className="text-center mt-3">
                  Anda belum punya akun?{" "}
                  <Link
                    href="/register"
                    className="text-decoration-none text-warning"
                  >
                    Daftar disini
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
