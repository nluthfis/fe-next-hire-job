import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { setUser } from "../store/reducers/userSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBuilding,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "@/store/reducers/authSlice";

function Edit_profile() {
  const router = useRouter();
  const auth = useSelector((state) => state?.auth);
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("job_history");

  const getProperty = (prop) => {
    return user?.data?.dataValues?.[prop] || user?.data?.[prop];
  };
  const token = auth?.token;
  const fullname = getProperty("fullname");
  const photoImage = getProperty("photo");
  const company = getProperty("company");
  const domicile = getProperty("domicile");
  const job_title = getProperty("job_title");
  const description = getProperty("description");
  const phone = getProperty("phone");
  const allSkill = getProperty("skills");
  const email = getProperty("email");
  const job_history = getProperty("job_history");

  function capitalizeWords(str) {
    return str?.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  useEffect(() => {
    if (auth.token === null) {
      router.replace("/login");
    }
  }, [auth.status]);

  const [formState, setFormState] = useState({
    fullname: "",
    company: "",
    job_title: "",
    phone: "",
    description: "",
    domicile: "",
  });

  //handle change edit biodata
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user?.data) {
      setFormState({
        fullname: fullname || "",
        company: company || "",
        job_title: job_title || "",
        phone: phone || "",
        description: description || "",
        domicile: domicile || "",
      });
    }
  }, [user?.data]);

  const handleSubmit = async (event) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        formState,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setUser(response?.data?.data));
      router.replace("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  // change photo
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedFile, setSelectedFile] = useState();
  const [previewSrc, setPreviewSrc] = useState();

  const submitHandler = async (event) => {
    // event.preventDefault();

    const formImage = new FormData();
    formImage.append("photo", selectedFile);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile/picture`,
        formImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setUser(response?.data?.data));
      router.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const fileChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setPreviewSrc(URL.createObjectURL(event.target.files[0]));
    }
  };
  //input skills
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "HTML",
    "CSS",
    "Python",
    "Postgresql",
    "MySql",
    "Vue",
    "React",
    "Node",
    "Express",
    "MongoDB",
    "Django",
    "Laravel",
    "PHP",
    "Javascript",
    "Java",
    "C++",
    "C#",
    "C",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "React Native",
    "Flutter",
    "Dart",
    "Typescript",
    "Bootstrap",
    "Tailwind",
    "Sass",
    "Less",
    "Material UI",
    "Chakra UI",
    "Ant Design",
    "Figma",
    "Adobe XD",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe Premiere",
    "Adobe After Effect",
    "Sketch",
    "Invision",
    "Framer",
    "Zeplin",
    "Marvel",
    "Invision Studio",
    "Inkscape",
    "NextJS",
    "Gatsby",
    "NuxtJS",
    "Svelte",
    "Strapi",
    "Wordpress",
    "Shopify",
    "WooCommerce",
    "JQuery",
    "Redux",
    "GraphQL",
    "Apollo",
    "REST API",
    "Firebase",
    "Heroku",
    "Netlify",
    "Vercel",
    "Digital Ocean",
    "AWS",
    "Azure",
    "Google Cloud",
    "Linux",
    "Windows",
    "MacOS",
    "Android",
    "IOS",
    "Arduino",
    "Raspberry Pi",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Circle CI",
  ]);

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleAddSkill = (selectedOptions) => {
    setSkills(selectedOptions.map((option) => option.value));
  };

  const handleSubmitSkills = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/skills`,
        JSON.stringify({ skills }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setUser(response?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSuggestions = suggestions
    .filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    )
    .slice(0, 5)
    .map((suggestion) => ({ value: suggestion, label: suggestion }));

  const handleDeleteSkill = async (index) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/skills/${index}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setUser(response?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  //add job history
  const [jobState, setJobState] = useState({
    position: "",
    company: "",
    month: "",
    year: "",
    description: "",
  });

  const [photo, setPhoto] = useState("");

  const handleJobChange = (event) => {
    setJobState({
      ...jobState,
      [event.target.name]: event.target.value,
    });
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleJobSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("position", jobState.position);
    formData.append("company", jobState.company);
    const date = `${jobState.month}-${jobState.year}`;
    formData.append("date", date);
    formData.append("description", jobState.description);
    formData.append("photo", photo);
    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/job`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobState({
        position: "",
        company: "",
        photo: "",
        month: "",
        year: "",
        description: "",
      });
      dispatch(setUser(response?.data?.data));
      setActiveTab("pengalaman-kerja");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUser(response?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAll = async (event) => {
    setIsLoading(true);
    try {
      await handleSubmit(); // Edit profile
      await handleSubmitSkills(); // Edit skills
      setIsLoading(false);
      router.replace("/profile");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // const handleEditAll = async (event) => {
  //   return new Promise(async (resolve, reject) => {
  //     setIsLoading(true);
  //     const editProfile = async () => {
  //       await handleSubmit();
  //     };
  //     const editSkills = async () => {
  //       skills?.length === 0 ? null : await handleSubmitSkills();
  //     };
  //     await Promise.all([editProfile(), editSkills()])
  //       .then(() => {
  //         setIsLoading(false);
  //         resolve();
  //         router.replace("/profile");
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         reject(err);
  //       });
  //   });
  // };

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
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12 bg-light">
            <div className="card">
              <img
                src={photoImage}
                className="rounded-circle mx-auto d-block mt-3 object-fit-cover"
                width={`100`}
                height={`100`}
                alt="card"
                onClick={handleShow}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              {isHovered && <span className="text-center">Edit Image</span>}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {previewSrc && (
                    <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
                      <img
                        src={previewSrc}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control"
                    onChange={fileChangeHandler}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={submitHandler}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="card-body">
                <h5 className="card-title">{capitalizeWords(fullname)}</h5>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faBuilding} />
                  <p className="card-text ms-2 mb-0">
                    {capitalizeWords(company)}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="text-muted ms-2 mb-0">
                    {capitalizeWords(domicile)}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faSuitcaseRolling} />
                  <p className="text-muted ms-2 mb-0">
                    {capitalizeWords(job_title)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col mt-2">
              <button
                className="btn btn-primary w-100"
                type="button"
                onClick={handleEditAll}
              >
                {isLoading ? "Loading..." : "Simpan"}
              </button>
            </div>
          </div>
          <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12 bg-light">
            <div className="card">
              <div className="card-body">
                <h4>Data diri</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputFullName" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      value={formState.fullname}
                      onChange={handleChange}
                      aria-describedby="fullname"
                      placeholder="Masukan nama lengkap"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputCompany" className="form-label">
                      Company
                    </label>
                    <input
                      type="company"
                      className="form-control"
                      name="company"
                      id="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder="Masukan Company"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputDomicile" className="form-label">
                      Domisili
                    </label>
                    <input
                      type="domicile"
                      className="form-control"
                      name="domicile"
                      id="domicile"
                      value={formState.domicile}
                      onChange={handleChange}
                      placeholder="Masukan domisili"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputJodTitle" className="form-label">
                      Job Title
                    </label>
                    <input
                      type="job_title"
                      className="form-control"
                      name="job_title"
                      id="job_title"
                      value={formState.job_title}
                      onChange={handleChange}
                      placeholder="Masukan Job Title"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputPhoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="phone"
                      className="form-control"
                      name="phone"
                      id="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="Masukan Phone Number"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputDescription" className="form-label">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      type="text-area"
                      className="form-control"
                      name="description"
                      id="description"
                      value={formState.description}
                      onChange={handleChange}
                      placeholder="Tuliskan deskripsi singkat"
                      style={{ height: `15vh` }}
                    />
                  </div>
                  {/* <div className="ms-5 me-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-warning  w-100"
                    >
                      {isLoading ? "Loading..." : "Simpan"}
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h4>Skill</h4>
                <hr />
                <div className="d-flex flex-wrap m-5 mb-2">
                  {Array.isArray(allSkill) &&
                    allSkill.map((item, key) => (
                      <span key={key} className="badge bg-primary m-1 p-2">
                        {item}
                        <button
                          className="btn btn-danger ms-2"
                          style={{ fontSize: `12px` }}
                          onClick={() => handleDeleteSkill(key)}
                        >
                          {isLoading ? "Menghapus" : "Hapus"}
                        </button>
                      </span>
                    ))}
                </div>
                <hr />
                {/* <div className="d-inline ms-5 mb-2">
      {Array.isArray(skills) &&
        skills.map((item, key) => (
          <span key={key} className="badge bg-primary m-1 p-2">
            {item}
          </span>
        ))}
    </div> */}
                <div className="row d-flex justify-content-center">
                  <div className="col-md-11 col-lg-11 m-5 mt-2 mb-3">
                    <Select
                      isMulti
                      name="skills"
                      options={filteredSuggestions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onInputChange={handleInputChange}
                      onChange={handleAddSkill}
                    />
                  </div>
                  {/* <div className="col-md-3 col-lg-3 mt-2">
                    <button
                      className="btn btn-primary w-100"
                      type="button"
                      onClick={handleSubmitSkills}
                    >
                      Submit
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card">
                <h4 className="m-3">Pengalaman Kerja</h4>
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "job_history" ? "active" : ""
                      }`}
                      style={
                        activeTab === "job_history"
                          ? {
                              backgroundColor: "#5e50a1",
                              color: "white",
                              marginLeft: `5vh`,
                            }
                          : { marginLeft: `5vh` }
                      }
                      onClick={() => setActiveTab("job_history")}
                    >
                      Tambah Pengalaman Kerja
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        activeTab === "pengalaman-kerja" ? "active" : ""
                      }`}
                      style={
                        activeTab === "pengalaman-kerja"
                          ? {
                              backgroundColor: "#5e50a1",
                              color: "white",
                            }
                          : {}
                      }
                      onClick={() => setActiveTab("pengalaman-kerja")}
                    >
                      Hapus Pengalaman Kerja
                    </a>
                  </li>
                </ul>

                <div className="tab-content m-2 ">
                  <div
                    id="job_history"
                    className={`tab-pane fade ${
                      activeTab === "job_history" ? "show active" : ""
                    }`}
                  >
                    <div className="card-body">
                      <form onSubmit={handleJobSubmit}>
                        <div className="m-5 mt-2 mb-3">
                          <label htmlFor="inputPosition" className="form-label">
                            Posisi
                          </label>
                          <input
                            type="position"
                            className="form-control"
                            id="inputPosition"
                            name="position"
                            value={jobState.position}
                            onChange={handleJobChange}
                            aria-describedby="position"
                            placeholder="Web Developer"
                          />
                        </div>
                        <div className="d-flex">
                          <div className="col-md-5 col-lg-5 ms-5 me-2 mt-2 mb-3">
                            <label
                              htmlFor="inputPosition"
                              className="form-label"
                            >
                              Nama Perusahaan
                            </label>
                            <input
                              type="position"
                              className="form-control"
                              id="inputPosition"
                              name="company"
                              value={jobState.company}
                              onChange={handleJobChange}
                              aria-describedby="position"
                              placeholder="Web Developer"
                            />
                          </div>
                          <div className="col-md-5 col-lg-5 m-5 mt-2 mb-3">
                            <label
                              htmlFor="inputPosition"
                              className="form-label"
                            >
                              Bulan-Tahun
                            </label>
                            <div className="d-flex">
                              <select
                                className="form-control"
                                id="month"
                                name="month"
                                value={jobState.month}
                                onChange={handleJobChange}
                              >
                                <option value="">Select Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                              </select>
                              <input
                                type="number"
                                className="form-control ml-2"
                                id="year"
                                name="year"
                                value={jobState.year}
                                onChange={handleJobChange}
                                placeholder="YYYY"
                                min="1900"
                                max="2099"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="m-5 mt-2 mb-3 ">
                          <label htmlFor="formFile" className="form-label">
                            Logo Perusahaan
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            id="formFile"
                            onChange={handlePhotoChange}
                          />
                        </div>
                        <div className="m-5 mt-2 mb-3">
                          <label htmlFor="inputJodPlace" className="form-label">
                            Deskripsi Singkat
                          </label>
                          <textarea
                            type="text-area"
                            className="form-control"
                            id="inputDescription"
                            name="description"
                            value={jobState.description}
                            onChange={handleJobChange}
                            placeholder="Tuliskan deskripsi singkat"
                            style={{ height: `15vh` }}
                          />
                          <hr className="mb-5 mt-5" />
                        </div>
                        <div className="ms-5 me-5">
                          <button
                            type="submit"
                            className="btn btn-warning w-100"
                            disabled={isLoading}
                          >
                            {isLoading
                              ? "Memproses"
                              : "Tambahkan Pengalaman Kerja"}
                          </button>
                        </div>
                      </form>
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
                            <img src={job.logo} style={{ width: `10vh` }} />
                          </div>
                          <div className="col col-md-10 col-lg-10 col-xs-8 col-sm-8">
                            <h5 className="mb-0">{job.position}</h5>
                            <p className="mb-0">{job.company}</p>
                            <div className="d-flex align-items-center">
                              <p className="text-secondary">{job.date}</p>
                            </div>
                            <p>{job.description}</p>
                          </div>
                          <button
                            className="bg-primary rounded-pill text-light fw-bold"
                            onClick={() => handleDeleteJob(job.id)}
                            style={{ height: `5vh` }}
                          >
                            {isLoading ? "Menghapus" : "Hapus"}
                          </button>
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
      </div>
      <Footer />
    </div>
  );
}

export default Edit_profile;
