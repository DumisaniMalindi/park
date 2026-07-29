import "../styles/Header.css";

function Header() {
  const today = new Date();

  const date = today.toLocaleDateString();
  const time = today.toLocaleTimeString();

  return (
    <header className="header">

      <div className="header-left">

        <h1>Smart Parking Management System</h1>

        <p>
          Vehicle Entry, Exit and Registration Monitoring
        </p>

      </div>

      <div className="header-right">

        <div className="status">
          ● System Online
        </div>

        <h3>{date}</h3>

        <p>{time}</p>

      </div>

    </header>
  );
}

export default Header;