import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faGitlab,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faBuilding,
  faSuitcaseRolling,
  faNoteSticky,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [activeTab, setActiveTab] = useState("pengalaman-kerja");
  const router = useRouter();
  const auth = useSelector((state) => state?.auth);
  const user = useSelector((state) => state?.user);
  const getProperty = (prop) => {
    return user?.data?.dataValues?.[prop] || user?.data?.[prop];
  };

  const fullname = getProperty("fullname");
  const photo = getProperty("photo");
  const company = getProperty("company");
  const domicile = getProperty("domicile");
  const job_title = getProperty("job_title");
  const description = getProperty("description");
  const email = getProperty("email");
  const skills = getProperty("skills");
  const job_history = getProperty("job_history");

  useEffect(() => {
    if (auth.token === null) {
      router.replace("/login");
    }
  }, [auth.status]);

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  // let company = [...new Array(2)];
  return (
    <div>
      <Navbar />
      <div
        className="bg-primary position-absolute "
        style={{
          width: `100%`,
          height: `40vh`,
        }}
      ></div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            {user && user?.data && (
              <div className="card">
                <img
                  src={photo || "/default_photo.jpg"}
                  className="rounded-circle mx-auto d-block mt-3 object-fit-cover"
                  width={`100`}
                  height={`100`}
                  alt="card"
                />

                <div className="card-body">
                  <h5 className="card-title">{capitalizeWords(fullname)}</h5>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faBuilding} />
                    <p className="card-text ms-2 mb-0">
                      {company && company !== "-"
                        ? capitalizeWords(company)
                        : "Company tidak tersedia"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p className="card-text ms-2 mb-0">
                      {domicile && domicile !== "-"
                        ? capitalizeWords(domicile)
                        : "Domisili tidak tersedia"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faSuitcaseRolling} />
                    <p className="card-text ms-2 mb-0">
                      {job_title && job_title !== "-"
                        ? capitalizeWords(job_title)
                        : "Title tidak tersedia"}
                    </p>
                  </div>
                  <div className="d-flex align-items-start">
                    <FontAwesomeIcon icon={faNoteSticky} className="mt-1" />{" "}
                    <p className="text-muted ms-2 mb-0 mt-0">
                      {description && description !== "-"
                        ? description
                        : "Description tidak tersedia"}
                    </p>
                  </div>
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

                <h5 className="card-title ms-3 mt-3">Skills</h5>
                <div className="card-skills ms-2 ">
                  <div className="d-inline ">
                    {skills && skills.length > 0 ? (
                      skills.map((item, key) => (
                        <span key={key} className="badge bg-warning m-1 p-2">
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="m-1 p-2 text-secondary">
                        Skill tidak tersedia
                      </p>
                    )}
                  </div>
                </div>

                <div className="d-flex align-items-center ms-3 mt-3 mb-5">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <p className="text-muted ms-2 mb-0">{email}</p>
                </div>
                {/* <div className="d-flex align-items-center mb-0 ms-3 mt-2">
                  <FontAwesomeIcon icon={faInstagram} />
                  <p className="text-muted ms-2 mb-0">@Louist91</p>
                </div>
                <div className="d-flex align-items-center mb-0 ms-3 mt-2">
                  <FontAwesomeIcon icon={faGithub} />
                  <p className="text-muted ms-2 mb-0">@Louistommo</p>
                </div>
                <div className="d-flex align-items-center mb-5 ms-3 mt-2">
                  <FontAwesomeIcon icon={faGitlab} />
                  <p className="text-muted ms-2 mb-0">@Louistommo91</p>
                </div> */}
              </div>
            )}
          </div>
          <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12 ">
            <div className="card">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "pengalaman-kerja" ? "active" : ""
                    }`}
                    style={
                      activeTab === "pengalaman-kerja"
                        ? { borderBottom: "5px solid #5e50a1" }
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
                    {/* <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
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
                    </div> */}
                  </div>
                </div>
                <div
                  id="pengalaman-kerja"
                  className={`tab-pane fade ${
                    activeTab === "pengalaman-kerja" ? "show active" : ""
                  }`}
                >
                  {job_history?.length ? (
                    job_history.map((job, index) => (
                      <div key={index} className="row mt-4 ms-4 me-4">
                        <div className="col-md-2 col-lg-2 col-xs-2 col-sm-2">
                          {job.logo ? (
                            <img
                              src={job.logo}
                              alt={job.company}
                              style={{ width: `10vh` }}
                            />
                          ) : (
                            "no image"
                          )}
                        </div>
                        <div className="col col-md-10 col-lg-10 col-xs-8 col-sm-8">
                          <h5 className="mb-0">{job && job.position}</h5>
                          <p className="mb-0">{job && job.company}</p>
                          <div className="d-flex align-items-center">
                            <p className="text-secondary mb-0">
                              {job && job.date}
                            </p>
                          </div>
                          <p className="mt-0">{job && job.description}</p>
                        </div>
                        <hr className="border border-primary border-3 opacity-75" />
                      </div>
                    ))
                  ) : (
                    <h1 className="text-center text-secondary m-5 ">
                      Pengalaman Kerja Kosong
                    </h1>
                  )}
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
