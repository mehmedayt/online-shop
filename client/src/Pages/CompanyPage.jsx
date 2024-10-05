import "./CSSPages/CompanyPage.css";

const Company = () => {
  return (
    <div className="company">
      <h1>Our Company</h1>
      <section>
        <h2>Mission</h2>
        <p>
          Our mission is to deliver high-quality products that enhance the lives of our customers.
          We strive for excellence and innovation in everything we do.
        </p>
      </section>
      <section>
        <h2>Vision</h2>
        <p>
          We envision a world where our products empower individuals and communities to achieve their goals.
          Our vision drives our commitment to sustainability and social responsibility.
        </p>
      </section>
      <section>
        <h2>Values</h2>
        <ul>
          <li>Integrity</li>
          <li>Customer Focus</li>
          <li>Innovation</li>
          <li>Sustainability</li>
          <li>Teamwork</li>
        </ul>
      </section>
      <section>
        <h2>Our History</h2>
        <p>
          Founded in 2000, we have grown from a small startup to a leading company in our industry.
          Our journey has been marked by milestones that showcase our commitment to quality and service.
        </p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out!</p>
      </section>
    </div>
  );
};

export default Company;
