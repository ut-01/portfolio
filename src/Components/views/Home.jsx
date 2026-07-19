import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../Assets/styles/Home.css";
import Background from "../common/Background";
import Modal from "../common/Modal";
import Footer from "../Footer";
import Ut from "../../Assets/images/ut.jpg";
import Extras from "../common/Extras";
import { usePortfolio } from "../../Context/PortfolioContext";

export default function Home(props) {
  let [showModal, setShowModal] = useState(null);
  const { data } = usePortfolio();

  // Check if image was already loaded before
  const wasImageLoaded = localStorage.getItem('profileImageLoaded') === 'true';
  const [imageLoading, setImageLoading] = useState(!wasImageLoaded);
  const [showLoader, setShowLoader] = useState(!wasImageLoaded);

  const imageLoadedRef = useRef(false);
  const minDelayPassedRef = useRef(false);

  useEffect(() => {
    // Skip loader if image was already loaded before
    if (wasImageLoaded) {
      return;
    }

    // Set minimum delay of 2s
    const timer = setTimeout(() => {
      minDelayPassedRef.current = true;
      // If image is already loaded, show it
      if (imageLoadedRef.current) {
        setImageLoading(false);
        // Keep loader visible during image fade-in (300ms), then hide it
        setTimeout(() => setShowLoader(false), 300);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [wasImageLoaded]);

  const handleImageLoad = () => {
    imageLoadedRef.current = true;
    // Mark image as loaded in localStorage
    localStorage.setItem('profileImageLoaded', 'true');

    // Skip loader logic if already loaded before
    if (wasImageLoaded) {
      return;
    }

    // Only hide loader if minimum delay has passed
    if (minDelayPassedRef.current) {
      setImageLoading(false);
      // Keep loader visible during image fade-in (300ms), then hide it
      setTimeout(() => setShowLoader(false), 300);
    }
  };

  const toggleModal = (e) => {
    if (!showModal && e.currentTarget === e.target) setShowModal(e.target.src);
    else setShowModal(null);
  };

  return (
    <>
      <main className="home">
        <header className="home-header">
          <article className="home-left profile-section">
            <picture className="profile-img-container">
              {showLoader && <div className="profile-loader"></div>}
              <img
                src={Ut}
                className={`profile-img ${imageLoading ? "loading" : ""}`}
                alt="profile"
                onLoad={handleImageLoad}
              />
            </picture>
            <section className="profile-content">
              <h1 className="name">{data.homepage.name}</h1>
              <p className="details p-1r">{data.homepage.title}</p>
            </section>
          </article>
          <article className="home-right">
            <nav className="home-nav">
              <Link to="/projects" className="home-nav-link">
                Projects
              </Link>
              <Link to="/blogs" className="home-nav-link">
                Blogs
              </Link>
              <a href="#contact" className="home-nav-link">
                Contact
              </a>
            </nav>
          </article>
        </header>
        <Extras toggleModal={toggleModal} />
      </main>
      <Footer />
      <Background text="Home" />
      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img alt="extra" src={showModal} className="block w-80p" />
        </Modal>
      )}
    </>
  );
}
