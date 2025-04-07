import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main className="main">
      {/* Hero Section */}
      <section id="hero" className="hero section dark-background">
        <img src="../img/CineNiche2.jpg" alt="" data-aos="fade-in" />
        <div
          className="container text-center"
          data-aos="zoom-out"
          data-aos-delay="100"
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2>Welcome to CineNiche</h2>
              <p>Where Every Film Finds Its Fan</p>
              <Link className="btn-get-started" to="/register">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About Our Company</h2>
        </div>

        <div className="container" data-aos="fade-up">
          <div
            className="row g-4 g-lg-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="col-lg-5">
              <div className="about-img">
                <img
                  src="/img/streaming.jpg"
                  className="img-fluid"
                  alt="Remote pointed at TV"
                />
              </div>
            </div>

            <div className="col-lg-7">
              <h3 className="pt-0 pt-lg-5">
                We are a company of dreamers who's goal is to bring cinema to
                everyone
              </h3>

              {/* Tabs */}
              <ul className="nav nav-pills mb-3" role="tablist">
                <li>
                  <a
                    className="nav-link active"
                    data-bs-toggle="pill"
                    href="#about-tab1"
                    aria-selected="true"
                    role="tab"
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    data-bs-toggle="pill"
                    href="#about-tab2"
                    aria-selected="false"
                    tabIndex={-1}
                    role="tab"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link"
                    data-bs-toggle="pill"
                    href="#about-tab3"
                    aria-selected="false"
                    tabIndex={-1}
                    role="tab"
                  >
                    Why Choose Us
                  </a>
                </li>
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="about-tab1"
                  role="tabpanel"
                >
                  <p className="fst-italic">
                    CineNiche connects film enthusiasts with hidden cinematic
                    gems tailored to their unique tastes. Founded by passionate
                    movie lovers in 2023, we've built a platform that goes
                    beyond mainstream recommendations.
                  </p>
                  <div className="mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2"></i>
                      <h4>From Dream to Reality</h4>
                    </div>
                    <p>
                      CineNiche was born from a simple idea: great films deserve
                      to be seen. Our founders, all lifelong movie enthusiasts,
                      were frustrated by recommendation algorithms that kept
                      showing the same mainstream titles.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2"></i>
                      <h4>Our Mission</h4>
                    </div>
                    <p>
                      We believe every film deserves its audience and every
                      viewer deserves to find films that truly resonate with
                      them. We're committed to creating a platform that
                      celebrates cinema in all its diversity.
                    </p>
                  </div>
                </div>

                <div className="tab-pane fade" id="about-tab2" role="tabpanel">
                  <p className="fst-italic">
                    Our team consists of film critics, data scientists, and
                    passionate cinephiles from around the world, working
                    together to redefine how people discover movies.
                  </p>
                  <div className="mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2"></i>
                      <h4>Leadership</h4>
                    </div>
                    <p>
                      Our leadership team brings together experiences from top
                      streaming platforms, film festivals, and tech startups.
                      This diverse expertise allows us to approach
                      recommendations from multiple angles.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2"></i>
                      <h4>Our Curators</h4>
                    </div>
                    <p>
                      We employ film scholars and critics who specialize in
                      genres ranging from French New Wave to Korean horror,
                      ensuring our platform represents global cinema in all its
                      richness and complexity.
                    </p>
                  </div>
                </div>

                <div className="tab-pane fade" id="about-tab3" role="tabpanel">
                  <p className="fst-italic">
                    What sets CineNiche apart is our dedication to
                    personalization and discovery, helping you find films that
                    perfectly match your unique taste profile.
                  </p>
                  <div className="mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2"></i>
                      <h4>Advanced Recommendation Algorithm</h4>
                    </div>
                    <p>
                      Our proprietary algorithm goes beyond simple genre
                      matching to understand the nuances of film preferences,
                      including directorial style, pacing, themes, and visual
                      aesthetics.
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check2"></i>
                      <h4>Curated Collections</h4>
                    </div>
                    <p>
                      We offer expert-curated collections that introduce you to
                      forgotten classics, independent treasures, and
                      international masterpieces that might otherwise go
                      undiscovered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon flex-shrink-0">
                <i className="bi bi-briefcase"></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    Lorem Ipsum
                  </a>
                </h4>
                <p className="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi sint occaecati cupiditate non provident
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="icon flex-shrink-0">
                <i className="bi bi-card-checklist"></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    Dolor Sitema
                  </a>
                </h4>
                <p className="description">
                  Minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat tarad limino ata
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="icon flex-shrink-0">
                <i className="bi bi-bar-chart"></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    Sed ut perspiciatis
                  </a>
                </h4>
                <p className="description">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="icon flex-shrink-0">
                <i className="bi bi-binoculars"></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    Magni Dolores
                  </a>
                </h4>
                <p className="description">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="icon flex-shrink-0">
                <i className="bi bi-brightness-high"></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    Nemo Enim
                  </a>
                </h4>
                <p className="description">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 service-item d-flex"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <div className="icon flex-shrink-0">
                <i className="bi bi-calendar4-week"></i>
              </div>
              <div>
                <h4 className="title">
                  <a href="service-details.html" className="stretched-link">
                    Eiusmod Tempor
                  </a>
                </h4>
                <p className="description">
                  Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
