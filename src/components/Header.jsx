import "../styles/Header.css";

function Header() {
  const today = new Date();

  const date = today.toLocaleDateString();

  const time = today.toLocaleTimeString();

  return (
    <header className="header">

      <div className="logo">

        <span className="car">🚗</span>

        <div>
          <h1>Smart Ticketless Parking</h1>
          <p>AI Powered Parking Management System</p>
        </div>

      </div>

      <div className="datetime">

        <h3>{date}</h3>

        <p>{time}</p>

      </div>

    </header>
  );
}

export default Header;