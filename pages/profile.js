import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

function Profile() {
  const [activeTab, setActiveTab] = useState("portofolio");
  const router = useRouter();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const storedToken = localStorage.getItem("auth");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);
  let company = [...new Array(2)];
  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            {user && user.data && user.data.photo && (
              <div className="card">
                <img
                  src={user?.data?.photo}
                  className="rounded-circle mx-auto d-block mt-3"
                  width={`100`}
                  height={`100`}
                  alt="card"
                />
                <div className="card-body">
                  <h5 className="card-title">{user?.data?.fullname}</h5>
                  <p className="card-text">{user?.data?.company}</p>
                  <div className="card-location mb-0 d-flex">
                    <img
                      className="me-2"
                      src="/map-pin.png"
                      width={`20`}
                      height={`20`}
                    />
                    <p className="text-muted">{user?.data?.domicile}</p>
                  </div>

                  <p className="text-muted mb-2">{user?.data?.job_title}</p>
                  <p className="text-muted mb-0">{user?.data?.description}</p>
                </div>
                <div className="d-grid gap-2 col">
                  <div className="w-100">
                    <Link href="/edit_profile">
                      <button
                        className="btn btn-primary mx-3"
                        style={{ width: "calc(100% - 2rem)" }}
                      >
                        Edit profile
                      </button>
                    </Link>
                  </div>
                </div>

                <h5 className="card-title ms-3 mt-5">Skills</h5>
                <div className="card-skills ms-2 ">
                  <div className="d-inline ">
                    {user?.data?.skills.map((item, key) => (
                      <span key={key} className="badge bg-warning m-1 p-2">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-location mb-0 ms-3 mt-5 d-flex">
                  <img
                    className="me-2"
                    src="/mail.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">{user?.data?.email}</p>
                </div>
                <div className="card-location mb-0 ms-3 d-flex">
                  <img
                    className="me-2"
                    src="/instagram.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">@Louist91</p>
                </div>
                <div className="card-location mb-0 ms-3 d-flex">
                  <img
                    className="me-2"
                    src="/github.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">@Louistommo</p>
                </div>
                <div className="card-location mb-5 ms-3 d-flex">
                  <img
                    className="me-2"
                    src="/gitlab.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">@Louistommo91</p>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12 ">
            <div className="card">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "portofolio" ? "active" : ""
                    }`}
                    style={
                      activeTab === "portofolio"
                        ? { borderBottom: "2px solid #5e50a1" }
                        : {}
                    }
                    onClick={() => setActiveTab("portofolio")}
                  >
                    Portofolio
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "pengalaman-kerja" ? "active" : ""
                    }`}
                    style={
                      activeTab === "pengalaman-kerja"
                        ? { borderBottom: "2px solid #5e50a1" }
                        : {}
                    }
                    onClick={() => setActiveTab("pengalaman-kerja")}
                  >
                    Pengalaman Kerja
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  id="portofolio"
                  className={`tab-pane fade ${
                    activeTab === "portofolio" ? "show active" : ""
                  }`}
                >
                  <div className="row mt-3">
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                      <div className="card">
                        <img
                          src="card1.png"
                          className="card-img-top "
                          alt="Image 1"
                        />
                        <div className="card-body">
                          <p>card1</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                      <div className="card">
                        <img
                          src="card2.png"
                          className="card-img-top"
                          alt="Image 2"
                        />
                        <div className="card-body">
                          <p>card 2</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                      <div className="card">
                        <img
                          src="card3.png"
                          className="card-img-top"
                          alt="Image 3"
                        />
                        <div className="card-body">
                          <p>card 3</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                      <div className="card">
                        <img
                          src="card4.png"
                          className="card-img-top"
                          alt="Image 3"
                        />
                        <div className="card-body">
                          <p>card 4</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                      <div className="card">
                        <img
                          src="card5.png"
                          className="card-img-top"
                          alt="Image 3"
                        />
                        <div className="card-body">
                          <p>card 5</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                      <div className="card">
                        <img
                          src="card6.png"
                          className="card-img-top"
                          alt="Image 3"
                        />
                        <div className="card-body">
                          <p>card 6</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="pengalaman-kerja"
                  className={`tab-pane fade ${
                    activeTab === "pengalaman-kerja" ? "show active" : ""
                  }`}
                >
                  {company.map((item, key) => (
                    <div className="row mt-4 ms-4 me-4" key={key}>
                      <div className="col-md-2 col-lg-2 col-xs-2 col-sm-2">
                        <img src="tokped.png" />
                      </div>
                      <div className="col col-md-10 col-lg-10 col-xs-8 col-sm-8">
                        <h5 className="mb-0">Trainer</h5>
                        <p className="mb-0">Pijar Camp</p>
                        <div className="d-flex align-items-center">
                          <p className="text-secondary">
                            July 2019 - January 2020
                          </p>
                          <p className="text-secondary ms-5">6 months</p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum erat orci, mollis nec gravida sed,
                          ornare quis urna. Curabitur eu lacus fringilla,
                          vestibulum risus at.
                        </p>

                        {key === company.length - 1 ? null : <hr />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
