import { useState, useEffect } from "react";

import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import UploadCard from "../components/UploadCard";
import Gate from "../components/Gate";

import "../styles/Dashboard.css";

function Dashboard() {
  // Dashboard Statistics
  const [activeVehicles, setActiveVehicles] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [availableSpaces, setAvailableSpaces] = useState(100);
  const [todayEntries, setTodayEntries] = useState(0);

  // Gate
  const [gateOpen, setGateOpen] = useState(false);

  // Parking Sessions
  const [sessions, setSessions] = useState([]);

  // Activity Log
  const [logs, setLogs] = useState([]);

  const loadDashboard = async () => {
    try {
      const response = await fetch(
        "https://fcbkhejhqe.execute-api.us-west-1.amazonaws.com/default"
      );

      const data = await response.json();

      setActiveVehicles(data.activeVehicles);
      setRevenue(data.revenue);
      setTodayEntries(data.todayEntries);
      setSessions(data.sessions);

    } catch (error) {
      console.error("Dashboard Load Error:", error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Entry Upload
  const handleEntryUpload = (plate) => {
    setLogs((prev) => [
      `${new Date().toLocaleTimeString()} - Vehicle ${plate} entered`,
      ...prev,
    ]);

    setActiveVehicles((prev) => prev + 1);
    setAvailableSpaces((prev) => prev - 1);
    setTodayEntries((prev) => prev + 1);

    setSessions((prev) => [
      {
        plate,
        entry: new Date().toLocaleTimeString(),
        exit: "-",
        duration: "-",
        fee: "-",
        status: "Active",
      },
      ...prev,
    ]);

    setGateOpen(true);

    setTimeout(() => {
      setGateOpen(false);
    }, 3000);
    setTimeout(() => {
      loadDashboard();
    }, 3000);

  };

  // Exit Upload
  const handleExitUpload = (plate) => {
    setLogs((prev) => [
      `${new Date().toLocaleTimeString()} - Vehicle ${plate} exited`,
      ...prev,
    ]);

    setActiveVehicles((prev) => Math.max(prev - 1, 0));
    setAvailableSpaces((prev) => prev + 1);
    setRevenue((prev) => prev + 20);

    setSessions((prev) =>
      prev.map((session) =>
        session.plate === plate && session.status === "Active"
          ? {
              ...session,
              exit: new Date().toLocaleTimeString(),
              duration: "1 Hour",
              fee: "R20",
              status: "Completed",
            }
          : session
      )
    );

    setGateOpen(true);

    setTimeout(() => {
      setGateOpen(false);
    }, 3000);
    setTimeout(() => {
      loadDashboard();
    }, 3000);

  };

  

  return (
    <>
      <Header />

      <div className="dashboard">

        <div className="stats-grid">

          <StatsCard
            title=" Active Vehicles"
            value={activeVehicles}
            color="#0a0a0a"
          />

          <StatsCard
            title=" Revenue"
            value={`R${revenue}`}
            color="#0b0e0c"
          />

          <StatsCard
            title=" Available Spaces"
            value={availableSpaces}
            color="#110f0e"
          />

          <StatsCard
            title=" Today's Entries"
            value={todayEntries}
            color="#101011"
          />

        </div>

        <div className="upload-grid">

          <UploadCard
            title="Vehicle Entry"
            buttonText="Upload Entry Image"
            onUpload={handleEntryUpload}
          />

          <UploadCard
            title=" Vehicle Exit"
            buttonText="Upload Exit Image"
            onUpload={handleExitUpload}
          />

        </div>

        <Gate isOpen={gateOpen} />

        <div className="bottom-grid">

          <div className="table-card">
            <h2>Parking Sessions</h2>

            <table>

              <thead>
                <tr>
                  <th>Plate</th>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th>Duration</th>
                  <th>Fee</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {sessions.map((session, index) => (

                  <tr key={index}>
                    <td>{session.plate}</td>
                    <td>{session.entry}</td>
                    <td>{session.exit}</td>
                    <td>{session.duration}</td>
                    <td>{session.fee}</td>
                    <td>
                        <span
                            className={
                            session.status === "Active"
                                ? "status-active"
                                : "status-completed"
                            }
                        >
                            {session.status}
                        </span>
                        </td>
                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <div className="log-card">

            <h2>System Activity</h2>

            {logs.length === 0 ? (
              <p>No activity yet.</p>
            ) : (
              logs.map((log, index) => (
                <p key={index}>{log}</p>
              ))
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;