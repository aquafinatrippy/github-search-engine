const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div>Logo comes here</div>
      <p>Copyright &copy; Tanel Tekko</p>
    </footer>
  );
};

export default Footer;
