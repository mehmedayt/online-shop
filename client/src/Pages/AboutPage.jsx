/* eslint-disable react/no-unescaped-entities */
import "./CSSPages/AboutPage.css";

const About = () => {
  return (
    <div className="about">
      <h1>About Us</h1>
      <section>
        <h2>Our Story</h2>
        <p>
          We started as a small company with a big dream. Today, we are proud to be a leader in our industry,
          serving customers worldwide.
        </p>
      </section>
      <section>
        <h2>Our Team</h2>
        <p>
          Our team is made up of passionate individuals who are dedicated to achieving excellence.
          Together, we work hard to meet our customers' needs.
        </p>
      </section>
      <section>
        <h2>Our Impact</h2>
        <p>
          We are committed to making a positive impact in the community and the environment.
          Sustainability is at the core of our operations.
        </p>
      </section>
    </div>
  );
};

export default About;
