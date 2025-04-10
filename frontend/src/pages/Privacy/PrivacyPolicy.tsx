import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  // Function to handle smooth scrolling to anchors
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Set up smooth scrolling for anchor links
  useEffect(() => {
    // Create an element to scroll to the top
    const topElement = document.createElement('div');
    topElement.id = 'top';
    document.querySelector('.privacy-container')?.prepend(topElement);

    return () => {
      // Clean up
      document.getElementById('top')?.remove();
    };
  }, []);

  return (
    <div className="privacy-wrapper">
      <div className="privacy-container">
        <div className="privacy-header">
          <h2 className="privacy-title">CineNiche Privacy Policy</h2>
          <p className="privacy-subtitle">Last updated: April 10, 2025</p>
          <p className="privacy-intro">
            CineNiche ("we", "our", or "us") is committed to protecting your
            privacy. This privacy policy explains how CineNiche collects, uses,
            and safeguards your information when you use our streaming service,
            website, and mobile applications.
          </p>
        </div>

        <div className="privacy-layout">
          <div className="privacy-toc">
            <h3>Table of Contents</h3>
            <ul className="privacy-toc-list">
              <li>
                <a href="#collect" onClick={scrollToSection('collect')}>
                  Information We Collect
                </a>
              </li>
              <li>
                <a
                  href="#collection-methods"
                  onClick={scrollToSection('collection-methods')}
                >
                  How We Collect Your Data
                </a>
              </li>
              <li>
                <a href="#use" onClick={scrollToSection('use')}>
                  How We Use Your Information
                </a>
              </li>
              <li>
                <a href="#storage" onClick={scrollToSection('storage')}>
                  How We Store Your Data
                </a>
              </li>
              <li>
                <a href="#marketing" onClick={scrollToSection('marketing')}>
                  Marketing Communications
                </a>
              </li>
              <li>
                <a href="#rights" onClick={scrollToSection('rights')}>
                  Your Data Protection Rights
                </a>
              </li>
              <li>
                <a href="#cookies" onClick={scrollToSection('cookies')}>
                  Cookies Policy
                </a>
              </li>
              <li>
                <a
                  href="#cookie-usage"
                  onClick={scrollToSection('cookie-usage')}
                >
                  How We Use Cookies
                </a>
              </li>
              <li>
                <a
                  href="#cookie-types"
                  onClick={scrollToSection('cookie-types')}
                >
                  Types of Cookies We Use
                </a>
              </li>
              <li>
                <a
                  href="#cookie-management"
                  onClick={scrollToSection('cookie-management')}
                >
                  Managing Your Cookies
                </a>
              </li>
              <li>
                <a href="#third-party" onClick={scrollToSection('third-party')}>
                  Third-Party Websites
                </a>
              </li>
              <li>
                <a href="#changes" onClick={scrollToSection('changes')}>
                  Changes to Our Privacy Policy
                </a>
              </li>
              <li>
                <a href="#contact" onClick={scrollToSection('contact')}>
                  Contact Information
                </a>
              </li>
              <li>
                <a href="#authorities" onClick={scrollToSection('authorities')}>
                  Regulatory Authorities
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <Section
            id="collect"
            title="Information We Collect"
            className="privacy-content-right"
          >
            <p>
              CineNiche collects several types of information from our users,
              including:
            </p>
            <ul className="info-list">
              <li>
                <span className="info-type">Account Information:</span>
                <span className="info-description">
                  Name, email address, password, phone number, and billing
                  details
                </span>
              </li>
              <li>
                <span className="info-type">Profile Information:</span>
                <span className="info-description">
                  Viewing preferences, watchlist items, and account settings
                </span>
              </li>
              <li>
                <span className="info-type">Usage Information:</span>
                <span className="info-description">
                  Viewing history, search queries, and interactions with our
                  platform
                </span>
              </li>
              <li>
                <span className="info-type">Device Information:</span>
                <span className="info-description">
                  IP address, browser type, device identifiers, operating
                  system, and screen resolution
                </span>
              </li>
              <li>
                <span className="info-type">Payment Information:</span>
                <span className="info-description">
                  Credit card details, billing address, and transaction history
                </span>
              </li>
              <li>
                <span className="info-type">Communications:</span>
                <span className="info-description">
                  Customer support inquiries, feedback, and survey responses
                </span>
              </li>
            </ul>
          </Section>

          <Section id="collection-methods" title="How We Collect Your Data">
            <p>We collect information directly from you when you:</p>
            <ul className="privacy-list">
              <li>Create an account or subscribe to CineNiche</li>
              <li>Browse, search, or watch content on our platform</li>
              <li>Add titles to your watchlist or rate content</li>
              <li>Participate in surveys, contests, or promotions</li>
              <li>Contact our customer support team</li>
              <li>Visit our website or use our applications</li>
            </ul>
            <p>Additionally, we may collect information from:</p>
            <ul className="privacy-list">
              <li>Service providers and business partners</li>
              <li>Content providers and studios</li>
              <li>Payment processors and financial institutions</li>
              <li>Analytics providers and advertising partners</li>
            </ul>
          </Section>

          <Section id="use" title="How We Use Your Information">
            <p>CineNiche uses your information to:</p>
            <ul className="privacy-list">
              <li>Provide, maintain, and improve our streaming service</li>
              <li>Process your subscription payments and billing</li>
              <li>Personalize your viewing experience and recommendations</li>
              <li>
                Send service updates, notifications, and account information
              </li>
              <li>
                Communicate with you about new features, content, and special
                offers
              </li>
              <li>
                Analyze usage patterns to optimize our platform's performance
              </li>
              <li>Protect against fraudulent activity and ensure security</li>
              <li>
                Comply with legal obligations and enforce our terms of service
              </li>
            </ul>
            <p>We may share your information with:</p>
            <ul className="privacy-list">
              <li>Service providers who perform functions on our behalf</li>
              <li>
                Content partners to provide licensing and royalty information
              </li>
              <li>Payment processors to complete transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </Section>

          <Section id="storage" title="How We Store Your Data">
            <p>
              CineNiche securely stores your data on cloud servers located in
              the United States and European Union. We implement appropriate
              technical and organizational measures to protect your information
              against unauthorized access, alteration, disclosure, or
              destruction.
            </p>
            <p>
              We retain your personal information for as long as your account is
              active or as needed to provide you services. If you close your
              account, we will retain certain information as required by law and
              for legitimate business purposes, such as to resolve disputes,
              enforce our agreements, and protect our legal rights.
            </p>
            <p>
              After the retention period expires, we will securely delete or
              anonymize your personal information.
            </p>
          </Section>

          <Section id="marketing" title="Marketing Communications">
            <p>CineNiche may send you marketing communications about:</p>
            <ul className="privacy-list">
              <li>New releases and exclusive content</li>
              <li>Special offers and promotions</li>
              <li>Personalized recommendations</li>
              <li>Service updates and features</li>
            </ul>
            <p>
              You can opt out of receiving marketing communications at any time
              by:
            </p>
            <ul className="privacy-list">
              <li>Clicking the "unsubscribe" link in our emails</li>
              <li>
                Adjusting your notification preferences in your account settings
              </li>
              <li>Contacting our customer support team</li>
            </ul>
            <p>
              Note that even if you opt out of marketing communications, you
              will still receive service-related messages that are necessary for
              the administration of your account.
            </p>
          </Section>

          <Section id="rights" title="Your Data Protection Rights">
            <p>
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="privacy-list">
              <li>
                <strong>Right to Access:</strong> Request copies of your
                personal data we hold
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate or incomplete information
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your
                personal data
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request
                limitations on how we use your data
              </li>
              <li>
                <strong>Right to Object:</strong> Object to our processing of
                your personal data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Request transfer of
                your data to another service
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent
                where we process data based on consent
              </li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details
              provided in the "Contact Information" section below. We will
              respond to all legitimate requests within 30 days.
            </p>
          </Section>

          <Section id="cookies" title="Cookies Policy">
            <p>
              Cookies are small text files placed on your device to collect
              standard internet log information and visitor behavior
              information. When you visit our website or use our applications,
              we may collect information from you automatically through cookies
              or similar technologies.
            </p>
            <p>
              For more information about cookies, visit{' '}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noreferrer"
              >
                allaboutcookies.org
              </a>
              .
            </p>
          </Section>

          <Section id="cookie-usage" title="How We Use Cookies">
            <p>CineNiche uses cookies to:</p>
            <ul className="privacy-list">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our platform</li>
              <li>Improve the performance and user experience of our site</li>
              <li>Deliver personalized content and recommendations</li>
              <li>Measure the effectiveness of our marketing campaigns</li>
              <li>Protect against fraudulent activity</li>
            </ul>
          </Section>

          <Section id="cookie-types" title="Types of Cookies We Use">
            <ul className="privacy-list">
              <li>
                <strong>Essential Cookies:</strong> Required for our service to
                function properly
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences
                and settings
              </li>
              <li>
                <strong>Performance Cookies:</strong> Collect information about
                how you use our platform
              </li>
              <li>
                <strong>Analytical Cookies:</strong> Help us understand how
                visitors interact with our website
              </li>
              <li>
                <strong>Targeting/Advertising Cookies:</strong> Deliver relevant
                advertisements and track campaign performance
              </li>
            </ul>
          </Section>

          <Section id="cookie-management" title="Managing Your Cookies">
            <p>
              Most web browsers allow you to control cookies through their
              settings preferences. You can set your browser to refuse cookies,
              delete cookies, or alert you when cookies are being sent. However,
              if you disable or refuse cookies, some parts of our service may
              become inaccessible or not function properly.
            </p>
            <p>
              For more information about managing cookies with specific
              browsers, you can find this information on the browsers'
              respective websites.
            </p>
          </Section>

          <Section id="third-party" title="Third-Party Websites">
            <p>
              Our website and applications may contain links to other websites,
              apps, and services. This privacy policy applies only to
              CineNiche's services. We are not responsible for the privacy
              practices or content of third-party sites. We encourage you to
              read the privacy statements of any third-party sites you visit.
            </p>
          </Section>

          <Section id="changes" title="Changes to Our Privacy Policy">
            <p>
              CineNiche keeps its privacy policy under regular review and places
              any updates on this web page. We will notify you of any
              significant changes to this policy through a service notification
              or email. This privacy policy was last updated on April 5, 2025.
            </p>
          </Section>

          <Section id="contact" title="Contact Information">
            <p>
              If you have any questions about CineNiche's privacy policy or the
              data we hold about you, or if you would like to exercise one of
              your data protection rights, please contact us:
            </p>
            <ul className="privacy-list contact-info">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
              </li>
              <li>
                <strong>Phone:</strong> +1 (888) CINE-PRIVACY (246-3774)
              </li>
              <li>
                <strong>Mail:</strong> CineNiche Privacy Office, 123 Cinema
                Street, Los Angeles, CA 90210
              </li>
            </ul>
          </Section>

          <Section id="authorities" title="Regulatory Authorities">
            <p>
              If you have concerns about our handling of your personal data and
              we have not addressed your concern satisfactorily, you may contact
              your local data protection authority:
            </p>
            <ul className="privacy-list">
              <li>
                <strong>European Union:</strong> European Data Protection Board
                (
                <a
                  href="https://edpb.europa.eu/about-edpb/board/members_en"
                  target="_blank"
                  rel="noreferrer"
                >
                  list of authorities
                </a>
                )
              </li>
              <li>
                <strong>United Kingdom:</strong> Information Commissioner's
                Office (
                <a href="https://ico.org.uk/" target="_blank" rel="noreferrer">
                  ico.org.uk
                </a>
                )
              </li>
              <li>
                <strong>United States:</strong> Federal Trade Commission (
                <a href="https://www.ftc.gov/" target="_blank" rel="noreferrer">
                  ftc.gov
                </a>
                ) or your state attorney general
              </li>
              <li>
                <strong>Canada:</strong> Office of the Privacy Commissioner (
                <a
                  href="https://www.priv.gc.ca/"
                  target="_blank"
                  rel="noreferrer"
                >
                  priv.gc.ca
                </a>
                )
              </li>
              <li>
                <strong>Australia:</strong> Office of the Australian Information
                Commissioner (
                <a
                  href="https://www.oaic.gov.au/"
                  target="_blank"
                  rel="noreferrer"
                >
                  oaic.gov.au
                </a>
                )
              </li>
            </ul>
          </Section>
        </div>

        <div className="privacy-footer">
          <p>© {new Date().getFullYear()} CineNiche. All rights reserved.</p>
          <p>
            <a href="#" onClick={scrollToSection('top')}>
              Back to top
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`privacy-section ${className || ''}`}>
    <h3 className="section-title">{title}</h3>
    {children}
  </section>
);

export default PrivacyPolicy;
