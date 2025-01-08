import "../blocks/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__author">Developed by Luckylin V</p>
      <p className="footer__year">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
