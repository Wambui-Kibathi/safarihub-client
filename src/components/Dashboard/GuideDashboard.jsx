import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getGuideDashboard,
  getGuideProfile,
  getAssignedDestinations,
  getGuideBookings
} from "../../api/guideApi";
import "../../styles/dashboard.css";

const GuideDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashData = await getGuideDashboard(auth.token);
        const profileData = await getGuideProfile(auth.token);
        const destData = await getAssignedDestinations(auth.token);
        const bookingsData = await getGuideBookings(auth.token);

        setDashboard(dashData);
        setProfile(profileData);
        setDestinations(destData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [auth.token]);

  return (
    <div className="guide-dashboard">
      <h1>Guide Dashboard</h1>
      {error && <p className="error">{error}</p>}

      <section>
        <h2>Profile</h2>
        <p>Name: {profile.full_name}</p>
        <p>Email: {profile.email}</p>
        <img src={profile.profile_pic} alt="Profile" width={100} />
      </section>

      <section>
        <h2>Overview</h2>
        <p>Total Bookings: {dashboard.total_bookings}</p>
      </section>

      <section>
        <h2>Assigned Destinations</h2>
        <ul>
          {destinations.map(d => (
            <li key={d.id}>{d.name} ({d.country}) - ${d.price}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Bookings for My Destinations</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Traveler ID</th>
              <th>Destination ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.traveler_id}</td>
                <td>{b.destination_id}</td>
                <td>{b.start_date}</td>
                <td>{b.end_date}</td>
                <td>{b.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GuideDashboard;
