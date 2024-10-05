import "./CSSPages/OfficesPage.css";

const Offices = () => {
  return (
    <div className="offices">
      <h1>Our Offices</h1>
      <section>
        <h2>Global Presence</h2>
        <p>
          We have offices located in major cities across the globe, ensuring that we are close to our customers.
        </p>
      </section>
      <section>
        <h2>Office Locations</h2>
        <ul>
          <li>New York, USA</li>
          <li>London, UK</li>
          <li>Tokyo, Japan</li>
          <li>Berlin, Germany</li>
          <li>Paris, France</li>
        </ul>
      </section>
      <section>
        <h2>Visit Us</h2>
        <p>We welcome visitors to our offices. Please schedule an appointment before your visit.</p>
      </section>
    </div>
  );
};

export default Offices;
