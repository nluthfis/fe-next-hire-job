import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Profile() {
  const [activeTab, setActiveTab] = useState("portofolio");
  const { query } = useRouter();
  const id = parseInt(query?.id);

  // const [user, setUser] = useState("");
  const jobProfile = useSelector((state) =>
    state?.job?.job?.find((job) => job.id === id)
  );

  // let company = [...new Array(2)];
  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            <div className="card">
              <img
                src={jobProfile?.photo}
                className="rounded-circle mx-auto d-block mt-3"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <div className="card-body">
                <h5 className="card-title">{jobProfile?.fullname}</h5>
                <p className="card-text">{jobProfile?.company}</p>
                <div className="card-location mb-0 d-flex">
                  <img
                    className="me-2"
                    src="/map-pin.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">{jobProfile?.domicile}</p>
                </div>

                <p className="text-muted mb-2">{jobProfile?.job_title}</p>
                <p className="text-muted mb-0">{jobProfile?.description}</p>
              </div>
              <div className="d-grid gap-2 col">
                <div className="w-100">
                  <Link href="/hire">
                    <button
                      className="btn btn-primary mx-3"
                      style={{ width: "calc(100% - 2rem)" }}
                    >
                      Hire
                    </button>
                  </Link>
                </div>
              </div>

              <h5 className="card-title ms-3 mt-5">Skills</h5>
              <div className="card-skills ms-2 ">
                <div className="d-inline ">
                  {jobProfile?.skills.map((item, key) => (
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
                <p className="text-muted">{jobProfile?.email}</p>
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
                          src="../card1.png"
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
                          src="../card2.png"
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
                          src="../card3.png"
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
                          src="../card4.png"
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
                          src="../card5.png"
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
                          src="../card6.png"
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
                  {jobProfile?.job_history.map((item, key) => (
                    <div className="row mt-4 ms-4 me-4" key={key}>
                      <div className="col-md-2 col-lg-2 col-xs-2 col-sm-2">
                        <img src={item.logo} style={{ width: `10vh` }} />
                      </div>
                      <div className="col col-md-10 col-lg-10 col-xs-8 col-sm-8">
                        <h5 className="mb-0">{item?.position}</h5>
                        <p className="mb-0">{item?.company}</p>
                        <div className="d-flex align-items-center">
                          <p className="text-secondary">{item?.date}</p>
                          <p className="text-secondary ms-5">6 months</p>
                        </div>
                        <p>{item?.description}</p>

                        {key === jobProfile.length - 1 ? null : <hr />}
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
