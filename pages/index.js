import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/store/reducers/counterSlice";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const list = [
    "Jaringan luas",
    "Rekam jejak terbukti",
    "Jaminan kualitas",
    "Dukungan berkelanjutan",
  ];

  const handleCounter = () => {
    dispatch(increment());
  };
  return (
    <>
      <Navbar />
      <header>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
              <h1 className="tittle text-primary m-5">
                Talenta Terbaik Negri untuk Perubahan Revolusi 4.0
              </h1>
              <p className="desc me-5 mb-5 ms-5">
                Dorongan revolusi industri 4.0 mendorong kita untuk
                mempersiapkan lingkungan kerja yang lebih baik serta sumber daya
                manusia yang cepat dan tepat.
              </p>
              <Link href="/candidate">
                <button className="btn btn-primary btn-lg w-50 ms-5 mb-2">
                  Mulai Dari Sekarang
                </button>
              </Link>

              {/* <button
                className="btn btn-primary btn-lg"
                onClick={handleCounter}
              >
                Counter : {state.counterSlice.value}
              </button> */}
            </div>

            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 order-1 order-md-2">
              <div className="image-container ms-5 d-flex justify-content-center">
                <div className="gray-square m-3"></div>
                <div className="purple-square"></div>
                <div className="yellow-square"></div>
                <Image
                  className="m-3"
                  src="/header.jpg"
                  alt="header-img"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="col">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 ">
                <div className="image-container ms-5 d-flex justify-content-center">
                  <div className="gray-square-2 m-3"></div>
                  <div className="purple-square-2"></div>

                  <Image
                    className="m-3"
                    src="/menu1.jpg"
                    alt="header-img"
                    width={500}
                    height={300}
                  />
                </div>
              </div>

              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <h2 className="text-primary m-5 mt-5 mb-4">
                  Kenapa Harus Mencari Tallent di Peworld
                </h2>
                {list.map((item, key) => (
                  <div className="d-flex align-items-center mt-0" key={key}>
                    <Image
                      className="ms-5 mt-4 mb-0 "
                      src="/tick1.png"
                      alt="tick-icon"
                      width={25}
                      height={25}
                    />
                    <p className="ms-5 mt-4 mb-0">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
              <h2 className="text-primary m-5 mt-2 mb-2">Skill Tallent</h2>
              <p className="ms-5">
                Terdapat berbagai macam kemampuan unik yang di miliki programmer
                agar dapat menulis kode yang bersih, efisien, dan tahan lama.
                Keterampilan tersebut meliputi:
              </p>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xs-5 col-sm-5">
                  {["Java", "Kotlin", "PHP", "Javascript"].map((item, key) => (
                    <div className="d-flex align-items-center mt-0" key={key}>
                      <Image
                        className="ms-5 mt-4 mb-0 "
                        src="/tick2.png"
                        alt="tick-icon"
                        width={25}
                        height={25}
                      />
                      <p className="ms-5 mt-4 mb-0 ">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="col-md-6 col-lg-6 col-xs-5 col-sm-5">
                  {["C++", "Ruby", "Python", "10+ Bahasa lainnya"].map(
                    (item, key) => (
                      <div className="d-flex align-items-center mt-0" key={key}>
                        <Image
                          className="ms-5 mt-4 mb-0"
                          src="/tick2.png"
                          alt="tick-icon"
                          width={25}
                          height={25}
                        />
                        <p className="ms-5 mt-4 me-3 mb-0 ">{item}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 order-1 order-md-2">
              <div className="image-container ms-5 d-flex justify-content-center">
                <div className="gray-square-3 m-3"></div>
                <div className="yellow-square-2"></div>

                <Image
                  className="m-3"
                  src="/menu2.jpg"
                  alt="header-img"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
