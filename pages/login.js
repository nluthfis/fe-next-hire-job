import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../store/reducers/authSlice";
import { setUser } from "../store/reducers/userSlice";
import { useState } from "react";
import { loginUser } from "../store/reducers/authSlice";
import { useEffect } from "react";
function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const status = useSelector((state) => state.auth.status);
  const messages = useSelector((state) => state.auth.messages);
  console.log(messages);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const action = await dispatch(loginUser({ email, password }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "succeeded") {
      router.replace("/");
    }
  }, [status]);

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
                Selamat Datang Kembali, Silahkan masuk ke akun anda untuk dapat
                menggunakan layanan kami secara maksimal
              </p>
              {messages && (
                <div className="alert alert-danger ms-5" role="alert">
                  {messages}
                </div>
              )}
              {auth.status === "failed" && <div>{auth.messages}</div>}

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
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-warning btn-lg"
                  >
                    {isLoading ? "Loading..." : "Masuk"}
                  </button>
                </div>
              </form>

              <p className="text-center mt-3">
                Anda belum punya akun?{" "}
                <Link
                  href="/register"
                  className="text-decoration-none text-warning"
                >
                  Daftar disini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
