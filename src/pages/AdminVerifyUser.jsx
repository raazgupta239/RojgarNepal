import React, { useState, useEffect } from 'react'; // Importing React and hooks for state and lifecycle management
import SideBar from '../component/SideBar'; // Importing the SideBar component
import TopSearchBar from '../component/TopSearchBar'; // Importing the TopSearchBar component
import Header from '../component/Header'; // Importing the Header component
import './../css/pageCss/AdminVerifyUser.css'; // Importing the CSS file for styling the component
import kishorthapa from '../images/kishorthapa.jpg'; // Importing images for user profiles
import nirmalhamal from '../images/nirmalhamal.jpg';
import rajendraadhikari from '../images/rajendraadhikari.jpg';
import ritakhadka from '../images/ritakhadka.jpg';
import santoshadhikari from '../images/santoshadhikari.jpg';
import sitamagar from '../images/sitamagar.jpg';
import akashmanandar from '../images/profile_electrician.png';
import rubyshrestha from '../images/babysitter.png';
import dipeshranjit from '../images/dipeshranjit.jpg';
import minalama from '../images/minalama.jpg';

// Defining an array of freelancer objects with details such as id, name, profile picture, email, and documents
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
  const [requests, setRequests] = useState(freelancers); // State to manage the list of verification requests
  const [bookings, setBookings] = useState([]); // State to manage the list of verified users
  const [declineInfo, setDeclineInfo] = useState({ userId: null, reason: '' }); // State to manage the information for declining a user

  useEffect(() => {
    // Optionally fetch initial data or counts from a backend or local storage
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Function to handle accepting a user's verification request
  const handleAccept = async (userId) => {
    try {
      console.log(`User ${userId} accepted`); // Logging the acceptance action
      const userToAccept = requests.find(user => user.id === userId); // Finding the user to accept from the requests array

      if (userToAccept) {
        setBookings(prevBookings => [...prevBookings, userToAccept]); // Adding the user to the bookings array
        setRequests(prevRequests => prevRequests.filter(user => user.id !== userId)); // Removing the user from the requests array
        await fetch(`/api/sendVerificationEmail/${userId}`, { method: 'POST' }); // Sending a verification email via an API call
      }
    } catch (error) {
      console.error('Error accepting user:', error); // Logging any errors
    }
  };

  // Function to handle declining a user's verification request
  const handleDecline = (userId) => {
    setDeclineInfo({ userId, reason: '' }); // Setting the declineInfo state with the user ID and an empty reason
  };

  // Function to confirm the decline action
  const confirmDecline = async () => {
    const { userId, reason } = declineInfo; // Destructuring userId and reason from declineInfo
    if (!reason) return; // If no reason is provided, exit the function

    try {
      console.log(`User ${userId} declined with reason: ${reason}`); // Logging the decline action
      setRequests(prevRequests => prevRequests.filter(user => user.id !== userId)); // Removing the user from the requests array
      await fetch(`/api/sendDeclineEmail/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }), // Sending the decline reason via an API call
      });
      setDeclineInfo({ userId: null, reason: '' }); // Resetting the declineInfo state
    } catch (error) {
      console.error('Error declining user:', error); // Logging any errors
    }
  };

  // Function to cancel the decline action
  const cancelDecline = () => {
    setDeclineInfo({ userId: null, reason: '' }); // Resetting the declineInfo state
  };

  return (
    <div className='admin-verify-user'>
      <SideBar /> {/* Rendering the SideBar component */}
      <main className="content">
        <TopSearchBar /> {/* Rendering the TopSearchBar component */}
        <Header bookings={bookings} pagename='Verified Users' /> {/* Rendering the Header component with bookings and page name */}
        <div className="verification-requests">
          <h2>Verification Requests:</h2> {/* Heading for the verification requests section */}
          {requests.map((user, index) => (
            <div key={user.id} className="verification-card"> {/* Creating a card for each verification request */}
              <img src={user.profile} alt={`${user.name}'s profile`} className="profile-pic" /> {/* Displaying the user's profile picture */}
              <div className='divfornameanddocuments'>
                <div className="user-info">
                  <h3>{user.name}</h3> {/* Displaying the user's name */}
                  <p className='useremail'>{user.mail}</p> {/* Displaying the user's email */}
                  <div>
                    <button onClick={() => handleAccept(user.id)} className="accept-button">Accept</button> {/* Accept button */}
                    <button onClick={() => handleDecline(user.id)} className="decline-button">Decline</button> {/* Decline button */}
                  </div>
                </div>
                <div className="documents">
                  <div className="document-section">
                    <h4>Identity Documents</h4> {/* Heading for identity documents */}
                    <a href={user.documents.nid} target="_blank" rel="noopener noreferrer">View CD/NID</a> {/* Link to view the user's ID */}
                  </div>
                  <div className="document-section">
                    <h4>Training Certificates</h4> {/* Heading for training certificates */}
                    {user.documents.trainingCertificates.map((doc, idx) => (
                      <a key={idx} href={doc} target="_blank" rel="noopener noreferrer">View Certificate {idx + 1}</a> 
                    ))}
                  </div>
                </div>
              </div>
              <div className='adminindex'>{index + 1}</div> {/* Displaying the index of the user */}
              {declineInfo.userId === user.id && (
                <div className="decline-reason">
                  <textarea
                    placeholder="Enter the reason to decline"
                    value={declineInfo.reason}
                    onChange={(e) => setDeclineInfo(prev => ({ ...prev, reason: e.target.value }))} // Updating the decline reason
                  />
                  <button onClick={confirmDecline} className="confirm-decline-button">Confirm Decline</button> {/* Confirm decline button */}
                  <button onClick={cancelDecline} className="cancel-decline-button">Cancel</button> {/* Cancel decline button */}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="verified-users">
          <h2>Verified Users:</h2> {/* Heading for the verified users section */}
          {bookings.map((user) => (
            <div key={user.id} className="verification-card"> {/* Creating a card for each verified user */}
              <img src={user.profile} alt={`${user.name}'s profile`} className="profile-pic" /> {/* Displaying the user's profile picture */}
              <h3>{user.name}</h3> {/* Displaying the user's name */}
              <div className="user-info">
                <div className="documents">
                  <div className="document-section">
                    <h4>CD/NID</h4> {/* Heading for identity documents */}
                    <a href={user.documents.nid} target="_blank" rel="noopener noreferrer">myfile.pdf</a> {/* Link to view the user's ID */}
                  </div>
                  <div className="document-section">
                    <h4>Training Certificates</h4> {/* Heading for training certificates */}
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

export default AdminVerifyUser; // Exporting the component for use
