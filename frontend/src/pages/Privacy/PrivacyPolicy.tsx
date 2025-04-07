import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-wrapper">
      <div className="privacy-container">
        <h2 className="privacy-title">Our Company Privacy Policy</h2>
        <p>
          Our Company is part of the Our Company Group which includes Our Company International and Our Company Direct.
          This privacy policy explains how our organization uses the personal data we collect from you when you use our website.
        </p>

        <Section title="Topics">
          <ul className="privacy-list">
            {[
              'What data do we collect?',
              'How do we collect your data?',
              'How will we use your data?',
              'How do we store your data?',
              'Marketing',
              'What are your data protection rights?',
              'What are cookies?',
              'How do we use cookies?',
              'What types of cookies do we use?',
              'How to manage your cookies',
              'Privacy policies of other websites',
              'Changes to our privacy policy',
              'How to contact us',
              'How to contact the appropriate authorities',
            ].map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </Section>

        <Section title="What data do we collect?">
          <ul className="privacy-list">
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>[Add any other data your company collects]</li>
          </ul>
        </Section>

        <Section title="How do we collect your data?">
          <p>We collect data when you:</p>
          <ul className="privacy-list">
            <li>Register or place an order for our products or services</li>
            <li>Complete surveys or give feedback</li>
            <li>Use or view our website via cookies</li>
            <li>[Other collection methods]</li>
          </ul>
          <p>Indirect sources:</p>
          <ul className="privacy-list">
            <li>[List indirect sources]</li>
          </ul>
        </Section>

        <Section title="How will we use your data?">
          <ul className="privacy-list">
            <li>Manage your account and process orders</li>
            <li>Email you offers and updates</li>
            <li>[Other uses]</li>
          </ul>
          <p>Partner companies may receive your data:</p>
          <ul className="privacy-list">
            <li>[List partner companies]</li>
          </ul>
        </Section>

        <Section title="How do we store your data?">
          <p>Stored securely at [location]. We keep your data for [time] and delete via [method].</p>
        </Section>

        <Section title="Marketing">
          <p>We may send offers from us and our partners.</p>
          <ul className="privacy-list">
            <li>[Partner companies]</li>
          </ul>
          <p>You can opt out at any time.</p>
        </Section>

        <Section title="What are your data protection rights?">
          <ul className="privacy-list">
            <li><strong>Access</strong> – Request copies of your data</li>
            <li><strong>Rectification</strong> – Correct inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> – Request data deletion</li>
            <li><strong>Restrict Processing</strong> – Request limits on use</li>
            <li><strong>Object to Processing</strong> – Object to how we use data</li>
            <li><strong>Data Portability</strong> – Request transfer to another entity</li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>Cookies are text files to collect standard log info and behavior data. Visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noreferrer">allaboutcookies.org</a> for more.</p>
        </Section>

        <Section title="How do we use cookies?">
          <ul className="privacy-list">
            <li>Keeping you signed in</li>
            <li>Understanding your usage</li>
            <li>[More uses]</li>
          </ul>
        </Section>

        <Section title="What types of cookies do we use?">
          <ul className="privacy-list">
            <li><strong>Functionality</strong> – Recognize and remember preferences</li>
            <li><strong>Advertising</strong> – Track visit details and personalize ads</li>
            <li>[More types]</li>
          </ul>
        </Section>

        <Section title="How to manage cookies">
          <p>You can set your browser to not accept cookies. Some features may not work as a result.</p>
        </Section>

        <Section title="Other Website Policies">
          <p>Our site links to others. This policy applies only to our site.</p>
        </Section>

        <Section title="Changes to this policy">
          <p>We review and update regularly. Last updated: 9 January 2019.</p>
        </Section>

        <Section title="Contact us">
          <p>If you have questions or want to exercise your rights, contact us:</p>
          <ul className="privacy-list">
            <li>Email: [Your Email]</li>
            <li>Phone: [Your Phone]</li>
            <li>Address: [Your Address]</li>
          </ul>
        </Section>

        <Section title="Contacting authorities">
          <p>If we haven’t addressed your concern, contact the ICO:</p>
          <ul className="privacy-list">
            <li>Email: [ICO Email]</li>
            <li>Address: [ICO Address]</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="privacy-section">
    <h3 className="section-title">{title}</h3>
    {children}
  </section>
);

export default PrivacyPolicy;