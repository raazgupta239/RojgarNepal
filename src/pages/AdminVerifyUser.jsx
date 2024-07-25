import React, { useState, useEffect } from 'react';
import SideBar from '../component/SideBar';
import TopSearchBar from '../component/TopSearchBar';
import Header from '../component/Header';
import './../css/pageCss/AdminVerifyUser.css';
import kishorthapa from '../images/kishorthapa.jpg';
import nirmalhamal from '../images/nirmalhamal.jpg';
import rajendraadhikari from '../images/rajendraadhikari.jpg';
import ritakhadka from '../images/ritakhadka.jpg';
import santoshadhikari from '../images/santoshadhikari.jpg';
import sitamagar from '../images/sitamagar.jpg';
import akashmanandar from '../images/profile_electrician.png';
import rubyshrestha from '../images/babysitter.png';
import dipeshranjit from '../images/dipeshranjit.jpg';
import minalama from '../images/minalama.jpg';

const freelancers = [
  {
    id: 1,
    name: "Nirmal Hamal",
    profile: nirmalhamal,
    mail: "nirmal34@gmail.com",
    documents: {
      nid: 'path_to_nirmalhamal_nid.jpg',
      trainingCertificates: ['path_to_nirmalhamal_cert1.jpeg', 'path_to_nirmalhamal_cert2.jpeg'],
    },
  },
  {
    id: 2,
    name: "Rita Khadka",
    profile: ritakhadka,
    mail: "reeta34@gmail.com",
    documents: {
      nid: 'path_to_ritakhadka_nid.pdf',
      trainingCertificates: ['path_to_ritakhadka_cert1.pdf'],
    },
  },
  // Add additional freelancers as needed
];

const AdminVerifyUser = () => {
  const [requests, setRequests] = useState(freelancers);
  const [bookings, setBookings] = useState([]);
  const [declineInfo, setDeclineInfo] = useState({ userId: null, reason: '' });

  useEffect(() => {
    // Optionally fetch initial data or counts from a backend or local storage
  }, []);

  const handleAccept = async (userId) => {
    try {
      console.log(`User ${userId} accepted`);
      const userToAccept = requests.find(user => user.id === userId);

      if (userToAccept) {
        setBookings(prevBookings => [...prevBookings, userToAccept]);
        setRequests(prevRequests => prevRequests.filter(user => user.id !== userId));
        await fetch(`/api/sendVerificationEmail/${userId}`, { method: 'POST' });
      }
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleDecline = (userId) => {
    setDeclineInfo({ userId, reason: '' });
  };

  const confirmDecline = async () => {
    const { userId, reason } = declineInfo;
    if (!reason) return;

    try {
      console.log(`User ${userId} declined with reason: ${reason}`);
      setRequests(prevRequests => prevRequests.filter(user => user.id !== userId));
      await fetch(`/api/sendDeclineEmail/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      setDeclineInfo({ userId: null, reason: '' });
    } catch (error) {
      console.error('Error declining user:', error);
    }
  };

  const cancelDecline = () => {
    setDeclineInfo({ userId: null, reason: '' });
  };

  return (
    <div className='admin-verify-user'>
      <SideBar />
      <main className="content">
        <TopSearchBar />
        <Header bookings={bookings} pagename='Verified Users' />
        <div className="verification-requests">
          <h2>Verification Requests:</h2>
          {requests.map((user, index) => (
            <div key={user.id} className="verification-card">
              <img src={user.profile} alt={`${user.name}'s profile`} className="profile-pic" />
              <div className='divfornameanddocuments'>
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p className='useremail'>{user.mail}</p>
                  <div>
                    <button onClick={() => handleAccept(user.id)} className="accept-button">Accept</button>
                    <button onClick={() => handleDecline(user.id)} className="decline-button">Decline</button>
                  </div>
                </div>
                <div className="documents">
                  <div className="document-section">
                    <h4>Identity Documents</h4>
                    <a href={user.documents.nid} target="_blank" rel="noopener noreferrer">View CD/NID</a>
                  </div>
                  <div className="document-section">
                    <h4>Training Certificates</h4>
                    {user.documents.trainingCertificates.map((doc, idx) => (
                      <a key={idx} href={doc} target="_blank" rel="noopener noreferrer">View Certificate {idx + 1}</a>
                    ))}
                  </div>
                </div>
              </div>
              <div className='adminindex'>{index + 1}</div>
              {declineInfo.userId === user.id && (
                <div className="decline-reason">
                  <textarea
                    placeholder="Enter the reason to decline"
                    value={declineInfo.reason}
                    onChange={(e) => setDeclineInfo(prev => ({ ...prev, reason: e.target.value }))}
                  />
                  <button onClick={confirmDecline} className="confirm-decline-button">Confirm Decline</button>
                  <button onClick={cancelDecline} className="cancel-decline-button">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="verified-users">
          <h2>Verified Users:</h2>
          {bookings.map((user) => (
            <div key={user.id} className="verification-card">
              <img src={user.profile} alt={`${user.name}'s profile`} className="profile-pic" />
              <h3>{user.name}</h3>
              <div className="user-info">
                <div className="documents">
                  <div className="document-section">
                    <h4>CD/NID</h4>
                    <a href={user.documents.nid} target="_blank" rel="noopener noreferrer">myfile.pdf</a>
                  </div>
                  <div className="document-section">
                    <h4>Training Certificates</h4>
                    {user.documents.trainingCertificates.map((doc, idx) => (
                      <a key={idx} href={doc} target="_blank" rel="noopener noreferrer">mytrfile.pdf</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminVerifyUser;
