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

function Edit_profile() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    fullname: "",
    company: "",
    job_title: "",
    phone: "",
    description: "",
    domicile: "",
  });

  console.log(formState);

  //input skills
  const [valueSkills, setValueSkills] = useState([]);
  const onChangeSkills = (event) => {
    setValueSkills(event.target.value);
  };
  const onSearch = (searchTerm) => {
    console.log("seacrh", searchTerm);
  };

  //handle change edit biodata
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (user.data) {
      setFormState({
        fullname: user.data.fullname || "",
        company: user.data.company || "",
        job_title: user.data.job_title || "",
        phone: user.data.phone || "",
        description: user.data.description || "",
        domicile: user.data.domicile || "",
      });
      setIsLoading(false);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("auth");

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile`,
        formState,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(setUser(response.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // change photo
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedFile, setSelectedFile] = useState();
  const [previewSrc, setPreviewSrc] = useState();

  const submitHandler = async (event) => {
    event.preventDefault();

    const formImage = new FormData();
    formImage.append("photo", selectedFile);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/profile/picture`,
        formImage,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );

      handleClose();
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  const fileChangeHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setPreviewSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12 bg-light">
            <div className="card">
              <img
                src={user?.data?.photo}
                className="rounded-circle mx-auto d-block mt-3"
                width={`100`}
                height={`100`}
                alt="card"
                onClick={handleShow}
              />
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
              </div>
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
                  <div className="ms-5 me-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-warning  w-100"
                    >
                      {isLoading ? "Loading..." : "Simpan"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h4>Skill</h4>
                <hr />
                <div className="d-inline ms-5 mb-2">
                  {Array.isArray(user?.data?.skills) &&
                    user.data.skills.map((item, key) => (
                      <span key={key} className="badge bg-primary m-1 p-2 fs-6">
                        {item}
                        <button className="btn btn-danger ms-2">Hapus</button>
                      </span>
                    ))}
                </div>
                <hr />
                <div className="d-flex">
                  <div className="col-md-8 col-lg-8 m-5 mt-2 mb-3">
                    <input
                      type="skills"
                      className="form-control"
                      name="skills"
                      id="skills"
                      value={valueSkills}
                      onChange={onChangeSkills}
                      aria-describedby="skills"
                      placeholder="Masukan skill"
                    />
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-warning mt-2 mb-2 w-100"
                      onClick={() => onSearch(valueSkills)}
                    >
                      Tambahkan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h4>Pengalaman Kerja</h4>
                <hr />
                <form>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputPosition" className="form-label">
                      Posisi
                    </label>
                    <input
                      type="position"
                      className="form-control"
                      id="inputPosition"
                      aria-describedby="position"
                      placeholder="Web Developer"
                    />
                  </div>
                  <div className="d-flex">
                    <div className="col-md-5 col-lg-5 ms-5 me-2 mt-2 mb-3">
                      <label htmlFor="inputPosition" className="form-label">
                        Nama Perusahaan
                      </label>
                      <input
                        type="position"
                        className="form-control"
                        id="inputPosition"
                        aria-describedby="position"
                        placeholder="Web Developer"
                      />
                    </div>
                    <div className="col-md-5 col-lg-5 m-5 mt-2 mb-3">
                      <label htmlFor="inputPosition" className="form-label">
                        Bulan/Tahun
                      </label>
                      <input
                        type="position"
                        className="form-control"
                        id="inputPosition"
                        aria-describedby="position"
                        placeholder="Web Developer"
                      />
                    </div>
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputJodPlace" className="form-label">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      type="text-area"
                      className="form-control"
                      id="inputJobPlace"
                      placeholder="Tuliskan deskripsi singkat"
                      style={{ height: `15vh` }}
                    />
                    <hr className="mb-5 mt-5" />
                  </div>
                </form>
                <div className="row">
                  <div className="col-12 ">
                    <button
                      type="button"
                      className="btn btn-outline-warning w-100"
                    >
                      Tambah Pengalaman Kerja
                    </button>
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
