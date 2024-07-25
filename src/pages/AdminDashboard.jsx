// src/page/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import SideBar from '../component/SideBar';
import TopSearchBar from '../component/TopSearchBar';
import './../css/pageCss/AdminDashboard.css';
import Filter from '../component/Filter';
import BookingTable from '../component/BookingTable';
import Header from '../component/Header';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [jobPosts, setJobPosts] = useState([]); // Add state for job posts

  useEffect(() => {
    // Simulating an API call with dummy data
    const dummyBookings = [
      {
        id: 1,
        clientName: 'John Doe',
        clientEmail: 'john.doe@example.com',
        freelancerName: 'Jane Smith',
        freelancerEmail: 'jane.smith@example.com',
        bookedDate: '2023-07-01',
        projectTitle: 'Website Development',
        projectStatus: 'Active',
        paymentStatus: 'Done'
      },
      // Other booking data
    ];

    const dummyJobPosts = [
      // Add your job posts data here
      { id: 1, title: 'Front-end Developer' },
      { id: 2, title: 'Back-end Developer' },
      { id: 3, title: 'Full Stack Developer' }
    ];

    setBookings(dummyBookings);
    setJobPosts(dummyJobPosts);
  }, []);

  return (
    <div className="admin-dashboard">
      <SideBar/>
      <main className="content">
        <TopSearchBar />
        <Header bookings={bookings} />
        <Filter />
        <BookingTable bookings={bookings} />
      </main>
    </div>
  );
};

export default AdminDashboard;
