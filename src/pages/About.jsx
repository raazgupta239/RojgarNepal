import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import './../css/pageCss/About.css';
import about1 from './../images/aboutimg5.jpg';
import about2 from './../images/aboutimg2.jpg';
import about3 from './../images/aboutimg1.jpg';
import about4 from './../images/aboutimage3.jpg';

import aayusha from './../images/aayusha.jpg';
import sandesh from './../images/sandesh.jpg';
import raaz from './../images/raaz.jpg';
import abhinab from './../images/abhinab.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartLine, faCommentDots, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-us">
        <section className="intro">
          <h1>About Us</h1>
          <p>Discover RojgarNepal - Where Innovation Meets Opportunity</p>
        </section>

        <section className="journey-story card">
          <div className="card-content left-image">
            <div className="card-image">
              <img src={about1} alt="Journey Story" />
            </div>
            <div className="card-text">
            <span className="icon">
                  <FontAwesomeIcon icon={faBook} />
                </span>
              <h2>
                The RojgarNepal Journey Story 
               
              </h2>
              <p>RojgarNepal is a web-based freelancing platform that caters to the requirements of the Nepali market. Our platform addresses services often challenging to locate locally, creating opportunities for freelancers and clients alike.</p>
            </div>
          </div>
        </section>

        <section className="objectives card">
          <div className="card-content right-image">
            <div className="card-text">
            <span className="icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </span>
              <h2>
                Objectives 
                
              </h2>
              <ul>
                <li>To provide a reliable platform for freelancers and clients to connect.</li>
                <li>To foster the growth of freelance opportunities in Nepal.</li>
                <li>To ensure quality and secure transactions between freelancers and clients.</li>
              </ul>
            </div>
            <div className="card-imagealternate">
              <img src={about2} alt="Objectives" />
            </div>
          </div>
        </section>

        <section className="vision card">
          <div className="card-content left-image">
            <div className="card-image">
              <img src={about3} alt="Vision" />
            </div>
            <div className="card-text">
            <span className="icon">
                  <FontAwesomeIcon icon={faCommentDots} />
                </span>
              <h2>
                Vision 
                
              </h2>
              <p>Our vision is to become the leading freelancing platform in Nepal, empowering individuals to achieve their professional goals through seamless and trustworthy online interactions.</p>
            </div>
          </div>
        </section>

        <section className="mission card">
          <div className="card-content right-image">
            <div className="card-text">
            <span className="icon">
                  <FontAwesomeIcon icon={faClipboardList} />
                </span>
              <h2>
                Mission 
                
              </h2>
              <p>Our mission is to bridge the gap between freelancers and clients by providing a platform that ensures quality, trust, and growth. We aim to support the Nepali market by creating sustainable freelance opportunities.</p>
            </div>
            <div className="card-imagealternate">
              <img src={about4} alt="Mission" />
            </div>
          </div>
        </section>

        <section className="our-team">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={aayusha} alt="Team Member 1" />
              <p>Aayusha Regmi</p>
            </div>
            <div className="team-member">
              <img src={sandesh} alt="Team Member 2" />
              <p>Sandesh Khatiwada</p>
            </div>
            <div className="team-member">
              <img src={raaz} alt="Team Member 3" />
              <p>Raaz Gupta</p>
            </div>
            <div className="team-member">
              <img src={abhinab} alt="Team Member 4" />
              <p>Abhinab Khanal</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
