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
                123 Cinema Street
                <br />
                Los Angeles, CA 90210
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
                +1 (310) 555-7890
                <br />
                +1 (888) CINE-HELP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title" data-aos="fade-up">
                <h2>Send Us a Message</h2>
                <p>
                  Have a question about our streaming service, content, or
                  technical support? Fill out the form and our team will get
                  back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="success-message" data-aos="fade-up">
                  <i className="bi bi-check-circle"></i>
                  <h3>Thank you for contacting us!</h3>
                  <p>Your message has been received. We'll respond shortly.</p>
                </div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  data-aos="fade-up"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <select
                      className="form-control"
                      name="subject"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select a Topic</option>
                      <option value="Technical Support">
                        Technical Support
                      </option>
                      <option value="Account Issues">Account Issues</option>
                      <option value="Content Request">Content Request</option>
                      <option value="Billing Questions">
                        Billing Questions
                      </option>
                      <option value="Partnership Inquiry">
                        Partnership Inquiry
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={5}
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn-submit">
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="col-lg-6 d-flex align-items-center">
              <div
                className="contact-image"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <img
                  src="/img/contact-image.jpg"
                  alt="Contact CineNiche"
                  className="img-fluid"
                />
                <div className="contact-faq">
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
                          Password" link on the login page. Follow the
                          instructions sent to your email to create a new
                          password.
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
                          CineNiche is available on web browsers, iOS and
                          Android devices, smart TVs, gaming consoles, and
                          streaming devices like Roku and Amazon Fire TV.
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
                          How do I suggest a movie?
                        </button>
                      </h2>
                      <div
                        id="faq3"
                        className="accordion-collapse collapse"
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body">
                          You can suggest content by selecting "Content Request"
                          in our contact form or by using the "Suggest" feature
                          in your account dashboard.
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
      <section className="business-hours section dark-background">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>Customer Support Hours</h2>
              <div className="hours-box">
                <div className="row">
                  <div className="col-md-6">
                    <h4>Weekdays</h4>
                    <p>Monday - Friday: 8:00 AM - 10:00 PM EST</p>
                  </div>
                  <div className="col-md-6">
                    <h4>Weekends</h4>
                    <p>Saturday - Sunday: 9:00 AM - 8:00 PM EST</p>
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

      {/* Map Section - Could be replaced with actual map integration */}
      <section className="map-section">
        <div className="map-placeholder">
          <div className="map-content">
            <h3>Our Headquarters</h3>
            <p>123 Cinema Street, Los Angeles, CA 90210</p>
            <span className="map-note">
              Interactive map would be displayed here
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
