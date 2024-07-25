import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import Filter from '../component/Filter';
import './../css/componentCss/AllJobPosts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faTrashCan, faMoneyBill, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function AllJobPosts() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const jobs = [
      {
        id: 1,
        clientName: 'Samikshya',
        title: 'Electrician Required For Repairs.',
        location: 'Bharatpur, Chitwan',
        time: '2 hours ago',
        payment: '4000-8000',
        jobDescription: 'The ideal candidate will have a thorough knowledge of plumbing systems, tools, and equipment. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing systems in residential, commercial, and industrial structures.',
        proposals: '10',
        date: '2024/08/18',
        estimatedHours: '7 Hours'
      },
      {
        id: 2,
        clientName: 'Ravi',
        title: 'Plumber Required For Repairs.',
        location: 'Sorakhutte, Kathmandu',
        time: '4 hours ago',
        payment: '2000-10000',
        jobDescription: 'The ideal candidate will have a thorough knowledge of plumbing systems, tools, and equipment. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing systems in residential, commercial, and industrial structures.',
        proposals: '10',
        date: '2024/08/18',
        estimatedHours: '8 Hours'
      },
      {
        id: 3,
        clientName: 'Kritik',
        title: 'Electrician Required For Repairs.',
        location: 'NewBaneswor, Kathmandu',
        time: '6 hours ago',
        payment: '1200 - 2200',
        jobDescription: 'The ideal candidate will have a thorough knowledge of plumbing systems, tools, and equipment. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing systems in residential, commercial, and industrial structures.',
        proposals: '10',
        date: '2024/06/25',
        estimatedHours: '2 Hours'
      },
      {
        id: 4,
        clientName: 'Prashansa',
        title: 'Electrician Required For Repairs.',
        location: 'Thapathali, Kathmandu',
        time: '8 hours ago',
        payment: '1500-6000',
        jobDescription: 'The ideal candidate will have a thorough knowledge of plumbing systems, tools, and equipment. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing systems in residential, commercial, and industrial structures.',
        proposals: '10',
        date: '2024/08/18',
        estimatedHours: '5 Hours'
      },
      {
        id: 5,
        clientName: 'Yogesh',
        title: 'Electrician Required For Repairs.',
        location: 'Tripureshwor, Kathmandu',
        time: '8 hours ago',
        payment: '8000-10000',
        jobDescription: 'The ideal candidate will have a thorough knowledge of plumbing systems, tools, and equipment. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing systems in residential, commercial, and industrial structures.',
        proposals: '40',
        date: '2024/08/18',
        estimatedHours: '9 Hours'
      },
      {
        id: 6,
        clientName: 'Himal',
        title: 'Electrician Required For Repairs.',
        location: 'Dallas, USA',
        time: '12 hours ago',
        payment: '7000-9000',
        jobDescription: 'The ideal candidate will have a thorough knowledge of plumbing systems, tools, and equipment. Responsibilities include installing, repairing, and maintaining pipes, fixtures, and other plumbing systems in residential, commercial, and industrial structures.',
        proposals: '50',
        date: '2024/07/18',
        estimatedHours: '14 Hours'
      },
    ];
  
    setBookings(jobs);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState('');
  const jobsPerPage = 4;

  const bookingsWithFirstLetter = bookings.map(booking => ({
    ...booking,
    clientNameFirstLetter: booking.clientName.charAt(0),
  }));

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = bookingsWithFirstLetter.slice(indexOfFirstJob, indexOfLastJob);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookings.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (jobId) => {
    setJobToDelete(jobId);
  };

  const handleReasonChange = (e) => {
    setDeleteReason(e.target.value);
  };

  const handleDeleteConfirm = () => {
    console.log('Job ID:', jobToDelete, 'Reason:', deleteReason);
    setJobToDelete(null);
    setDeleteReason('');
    setBookings(prevBookings => prevBookings.filter(booking => booking.id !== jobToDelete));
  };

  return (
    <div className="reasontodelete">
      <Header bookings={bookings} pagename=" Job Posts" />
      <Filter />
      {jobToDelete ? (
        <div className="delete-form">
          <h3>Reason for deleting the job:</h3>
          <br />
          <textarea value={deleteReason} onChange={handleReasonChange} placeholder="Type your reason here..."></textarea>
          <br />
          <button className='admin-confirmdelete' onClick={handleDeleteConfirm}>Confirm Delete</button>
          <button className='admin-cancel' onClick={() => setJobToDelete(null)}>Cancel</button>
        </div>
      ) : (
        <div className="adminjobs">
          {currentJobs.map(job => (
            <div className="job-card" key={job.id}>
              <span className='client-initials'>{job.clientNameFirstLetter}</span>
              <button className="delete-btn" onClick={() => handleDeleteClick(job.id)}>Delete<span className='trashcan'><FontAwesomeIcon icon={faTrashCan} /></span></button>
              <div className="jobpost-details">
                <h3 className='jobpost-title'>{job.title}</h3> <span className="time"><FontAwesomeIcon icon={faClock} /> {job.time}</span>
                <br /><p className="job-description">"{job.jobDescription}"</p>
                <p className="proposals"><span className='proposal-label'>Proposals:</span> <span className='proposal-no'>{job.proposals}</span> </p>
                <div className='pdel'>
                  <p className="payment"><FontAwesomeIcon icon={faMoneyBill} />&nbsp;&nbsp;Nrs.{job.payment}</p>
                  <p className="date">Date: {job.date}</p>
                  <p className="estimated-hours">Estimated Hours: {job.estimatedHours}</p>
                  <p className="location" title='View on Map'><FontAwesomeIcon icon={faLocationDot} /> <span className='location-details'>{job.location}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="adminpagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>{">"}</button>
      </div>
    </div>
  );
}

export default AllJobPosts;
