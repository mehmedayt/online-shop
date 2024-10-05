import "./CSSPages/ContactPage.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <section>
        <h2>Get in Touch</h2>
        <p>
          We would love to hear from you! Please reach out through any of the following channels.
        </p>
      </section>
      <section>
        <h2>Contact Information</h2>
        <p>Email: support@company.com</p>
        <p>Phone: +1 234 567 890</p>
      </section>
      <section>
        <h2>Follow Us</h2>
        <p>Stay connected with us on social media!</p>
        <ul>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
      </section>
    </div>
  );
};

export default Contact;
