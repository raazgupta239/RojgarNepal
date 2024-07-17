import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/componentCss/FHeader.css';

const freelancername = localStorage.getItem("fullName");
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const FHeader = () => {
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/freelancer/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            userId: userId
          }
        });

        if (response.data.success) {
   
          setActiveProjects(response.data.activeProjects.count);
          setCompletedProjects(response.data.completedProjects.count);
        } else {
          console.error('Failed to fetch project stats');
        }
      } catch (error) {
        console.error('Error fetching project stats:', error);
      }
    };

    fetchStats();
  }, [token, userId]);

  return (
    <header className="Fheader">
      <div className="greeting-section">
        <div className="greeting">
          <h1>Hello <span className="freelancer-name">{freelancername}</span>! 👋</h1>
          <p className="motive">Ready to find your next opportunity and showcase your skills?</p>
          <p className="stats">
            Your Active Projects: {activeProjects}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='completedprojects'>Completed Projects: {completedProjects}</span>
          </p>
          <a href="./../pages/freelancerdashboard" className="new-action">View Status</a>
        </div>
        <button className="post-job-button">
          <a href='../freelancerdashboard'>+ Complete Profile</a>
        </button>
      </div>
    </header>
  );
};

export default FHeader;
