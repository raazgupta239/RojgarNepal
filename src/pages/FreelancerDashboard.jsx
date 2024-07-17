import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbarfreelancer from '../component/Navbarfreelancer';
import Footer from '../component/Footer';
import styles from '../css/pageCss/FreelancerDashboard.module.css';
import image from "../images/caretaker.png";

const FreelancerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const freelancerName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchBookings();
    fetchBookingRequests();
  }, []);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/freelancer/bookings?freelanceruid=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingRequests = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/freelancer/booking-requests?freelanceruid=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch booking requests");
      }

      const data = await response.json();
      setBookingRequests(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (index, brid) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/freelancer/booking?brid=${brid}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to accept booking request");
      }

      const updatedBookingRequests = [...bookingRequests];
      updatedBookingRequests.splice(index, 1);
      setBookingRequests(updatedBookingRequests);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReject = async (index, brid) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/freelancer/booking-request?brid=${brid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reject booking request");
      }

      const updatedBookingRequests = [...bookingRequests];
      updatedBookingRequests.splice(index, 1);
      setBookingRequests(updatedBookingRequests);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleViewBooking = (booking) => {
    localStorage.removeItem('selectedBooking');
    localStorage.setItem('selectedBooking', JSON.stringify(booking));
    navigate('/booking');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbarfreelancer />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.profileInfo}>
            <img src={image} alt="Profile" className={styles.profileImage} />
            <h2 className={styles.freelancerName}>{freelancerName}</h2>
            <p className={styles.email}><i className="fas fa-envelope"></i> {email}</p>
            <p className={styles.phone}><i className="fas fa-phone"></i> Phone Number</p>
            <p className={styles.location}><i className="fas fa-map-marker-alt"></i> Location</p>
            <p className={styles.description}>Description</p>
            <p className={styles.rating}><i className="fas fa-star"></i> Rating</p>
          </div>
        </div>
        <div className={styles.mainContent}>
          <h1>Hello <span className={styles.freelancerNameHighlight}>{freelancerName}</span>! 👋</h1>

          <h2>Your <span className={styles.highlight}>Bookings</span></h2>
          {bookings.length === 0 ? (
            <div className={styles.section}>You don't have any bookings yet.</div>
          ) : (
            bookings.map((booking, index) => (
              <div key={index} className={styles.section}>
                <div className={styles.booking}>
                  <p>Job Title: {booking.jobTitle}</p>
                  <p>Date: {booking.date}</p>
                  <p>Time: {booking.time}</p>
                  <p>Location: {booking.location}</p>
                  {booking.latitude && booking.longitude ? (
                    <MapContainer center={[booking.latitude, booking.longitude]} zoom={13} scrollWheelZoom={false} className={styles.map}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[booking.latitude, booking.longitude]}>
                        <Popup>
                          {booking.location}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                    <div className={styles.noLocation}>No map location available</div>
                  )}
                  <p>Pay Amount: {booking.payAmount}</p>
                  <p>Duration: {booking.duration}</p>
                  <button className={styles.viewButton} onClick={() => handleViewBooking(booking)}>
                    <i className="fas fa-eye"></i> View
                  </button>
                </div>
              </div>
            ))
          )}

          <h2>Your <span className={styles.highlight}>Booking Requests</span></h2>
          {bookingRequests.length === 0 ? (
            <div className={styles.section}>You don't have any booking requests yet.</div>
          ) : (
            bookingRequests.map((request, index) => (
              <div key={index} className={styles.section}>
                <div className={styles.bookingRequest}>
                  <p>Booking Request: {request.brid}</p>
                  <p>Job Title: {request.jobTitle}</p>
                  <p>Date: {request.date}</p>
                  <p>Time: {request.time}</p>
                  <p>Location: {request.location}</p>
                  {request.latitude && request.longitude ? (
                    <MapContainer center={[request.latitude, request.longitude]} zoom={13} scrollWheelZoom={false} className={styles.map}>
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[request.latitude, request.longitude]}>
                        <Popup>
                          {request.location}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                    <div className={styles.noLocation}>No map location available</div>
                  )}
                  <p>Pay Amount: {request.payAmount}</p>
                  <p>Duration: {request.duration}</p>
                  <div className={styles.buttons}>
                    <button className={styles.acceptButton} onClick={() => handleAccept(index, request.brid)}>
                      Accept
                    </button>
                    <button className={styles.rejectButton} onClick={() => handleReject(index, request.brid)}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreelancerDashboard;
