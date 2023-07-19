import devtrecLogo from "../assets/devtrec_logo_cropped.png";

const Header = () => {
  return (
    <header className="header-container">
      <img className="devtrec-logo" src={devtrecLogo} alt="Devtrec App Logo" />
      <p className="logo-subline">Find your favorite dev events</p>
    </header>
  );
};

export default Header;
