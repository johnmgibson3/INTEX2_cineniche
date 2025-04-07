import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/HomePage.css';

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
              <a href="#about" className="btn-get-started">
                Create Account
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About</h2>
          <p>
            Rerum debitis facere soluta tenetur. Iure molestiae assumenda sunt
            qui inventore eligendi voluptates nisi
          </p>
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
                  src="/assets/img/about-portrait.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>

            <div className="col-lg-7">
              <h3 className="pt-0 pt-lg-5">
                Neque officiis dolore maiores et exercitationem quae est seda
                lidera pat claero
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
                    Saepe fuga
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
                    Voluptates
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
                    Corrupti
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
                    Consequuntur inventore voluptates consequatur aut vel et.
                    Eos doloribus expedita. Sapiente atque consequatur minima
                    nihil quae aspernatur quo suscipit voluptatem.
                  </p>
                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-check2"></i>
                    <h4>
                      Repudiandae rerum velit modi et officia quasi facilis
                    </h4>
                  </div>
                  <p>
                    Laborum omnis voluptates voluptas qui sit aliquam
                    blanditiis. Sapiente minima commodi dolorum non eveniet
                    magni quaerat nemo et.
                  </p>

                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-check2"></i>
                    <h4>Incidunt non veritatis illum ea ut nisi</h4>
                  </div>
                  <p>
                    Non quod totam minus repellendus autem sint velit. Rerum
                    debitis facere soluta tenetur. Iure molestiae assumenda sunt
                    qui inventore eligendi voluptates nisi at. Dolorem quo
                    tempora. Quia et perferendis.
                  </p>

                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-check2"></i>
                    <h4>Omnis ab quia nemo dignissimos rem eum quos..</h4>
                  </div>
                  <p>
                    Eius alias aut cupiditate. Dolor voluptates animi ut
                    blanditiis quos nam. Magnam officia aut ut alias quo
                    explicabo ullam esse. Sunt magnam et dolorem eaque magnam
                    odit enim quaerat. Vero error error voluptatem eum.
                  </p>
                </div>

                <div className="tab-pane fade" id="about-tab2" role="tabpanel">
                  <p className="fst-italic">
                    Consequuntur inventore voluptates consequatur aut vel et.
                    Eos doloribus expedita. Sapiente atque consequatur minima
                    nihil quae aspernatur quo suscipit voluptatem.
                  </p>
                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-check2"></i>
                    <h4>
                      Repudiandae rerum velit modi et officia quasi facilis
                    </h4>
                  </div>
                  <p>
                    Laborum omnis voluptates voluptas qui sit aliquam
                    blanditiis. Sapiente minima commodi dolorum non eveniet
                    magni quaerat nemo et.
                  </p>

                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-check2"></i>
                    <h4>Incidunt non veritatis illum ea ut nisi</h4>
                  </div>
                  <p>
                    Non quod totam minus repellendus autem sint velit. Rerum
                    debitis facere soluta tenetur. Iure molestiae assumenda sunt
                    qui inventore eligendi voluptates nisi at. Dolorem quo
                    tempora. Quia et perferendis.
                  </p>
                </div>

                <div className="tab-pane fade" id="about-tab3" role="tabpanel">
                  <p className="fst-italic">
                    Consequuntur inventore voluptates consequatur aut vel et.
                    Eos doloribus expedita. Sapiente atque consequatur minima
                    nihil quae aspernatur quo suscipit voluptatem.
                  </p>
                  <div className="d-flex align-items-center mt-4">
                    <i className="bi bi-check2"></i>
                    <h4>
                      Repudiandae rerum velit modi et officia quasi facilis
                    </h4>
                  </div>
                  <p>
                    Laborum omnis voluptates voluptas qui sit aliquam
                    blanditiis. Sapiente minima commodi dolorum non eveniet
                    magni quaerat nemo et.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section
        id="call-to-action"
        className="call-to-action section accent-background"
      >
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="col-xl-10">
              <div className="text-center">
                <h3>Call To Action</h3>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
                <a className="cta-btn" href="#">
                  Call To Action
                </a>
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
