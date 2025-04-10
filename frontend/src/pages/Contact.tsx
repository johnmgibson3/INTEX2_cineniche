import React, { useState } from 'react';
import '../css/Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="main">
      {/* Hero Section */}
      <section className="contact-hero section dark-background">
        <div className="hero-overlay"></div>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1>Contact Us</h1>
              <p>
                Reach out to our team for support, feedback, or partnership
                opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 info-box" data-aos="fade-up">
              <div className="icon-box">
                <i className="bi bi-geo-alt"></i>
              </div>
              <h3>Our Address</h3>
              <p>
                295 W Center St
                <br />
                Provo, UT 84601
              </p>
            </div>

            <div
              className="col-lg-4 info-box"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="icon-box">
                <i className="bi bi-envelope"></i>
              </div>
              <h3>Email Us</h3>
              <p>
                support@cineniche.com
                <br />
                partners@cineniche.com
              </p>
            </div>

            <div
              className="col-lg-4 info-box"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="icon-box">
                <i className="bi bi-telephone"></i>
              </div>
              <h3>Call Us</h3>
              <p>
                +1 (385) 200-1011
                <br />
                +1 (888) CINE-HELP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      {/* FAQ Section Only */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div data-aos="fade-up" data-aos-delay="100">
                <img
                  src="/img/contact-us.png"
                  alt="Contact CineNiche"
                  className="img-fluid"
                  style={{ width: '120px', height: 'auto' }}
                />
                <div className="contact-faq mt-4">
                  <h3>Frequently Asked Questions</h3>
                  <div className="accordion" id="faqAccordion">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq1"
                        >
                          How do I reset my password?
                        </button>
                      </h2>
                      <div
                        id="faq1"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          You can reset your password by clicking the "Forgot
                          Password" link on the login page.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq2"
                        >
                          What devices can I stream on?
                        </button>
                      </h2>
                      <div
                        id="faq2"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          CineNiche is available on browsers, mobile apps, smart
                          TVs, and streaming devices.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#faq3"
                        >
                          How do I search for the movie I want?
                        </button>
                      </h2>
                      <div
                        id="faq3"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          In the movie dashboard, you can click the magnifying
                          class and use the filters that appear there.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours Section */}
      <section className="business-hours section ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>Customer Support Hours</h2>
              <div className="hours-box">
                <div className="row">
                  <div className="col-md-6">
                    <h4>Weekdays</h4>
                    <p>Monday - Friday: 8:00 AM - 7:00 PM EST</p>
                  </div>
                  <div className="col-md-6">
                    <h4>Weekends</h4>
                    <p>Saturday - Sunday: 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
                <p className="note">
                  * Technical support is available 24/7 for critical issues
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section
        className="map-section dark-background"
        style={{ paddingBottom: '3rem', paddingTop: '1rem' }}
      >
        <div className="container text-center text-light">
          <h3>Our Headquarters</h3>
          <p>295 W Center St, Provo, UT 84601</p>
          <div className="google-map-container mt-4">
            <iframe
              title="CineNiche Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.9050567907498!2d-111.66627842360474!3d40.23341316677554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d975519999033%3A0x73db4b245d120e45!2s295%20W%20Center%20St%2C%20Provo%2C%20UT%2084601!5e0!3m2!1sen!2sus!4v1744308077069!5m2!1sen!2sus"
              width="90%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
