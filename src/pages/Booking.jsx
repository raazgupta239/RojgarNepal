import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Paper, Grid, Button, TextField, Rating, Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import NavbarClient from '../component/Navbarclient';
import NavbarFreelancer from '../component/Navbarfreelancer';
import Footer from '../component/Footer';
const useStyles = {
  root: {
    flexGrow: 1,
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',


  },
  paper: {
    padding: 2,
    width: '80%',
    '@media (max-width:600px)': {
      width: '95%',
    },
   marginTop:'50px',
   padding:40,


  },
  mapContainer: {
    height: '400px',
    width: '100%',
   marginTop:'10px',

  },
  noMapData: {
    padding: 2,
    textAlign: 'center',
    color: 'textSecondary',
  },
  freelancerInfo: {
    marginTop: 50,
    padding:40,

  },
  makePaymentButton: {
    marginTop: 20,


  },
  reviewSection: {
    marginTop: 50,
    padding: 2,
    padding:40,
    marginBottom:50,

  },
  ratingStars: {
    display: 'flex',
    justifyContent: 'center',

  },
  reviewTextarea: {
    width: '100%',

  },

};

const Booking = () => {
  const classes = useStyles;
  const location = useLocation();
  const selectedBooking = JSON.parse(localStorage.getItem('selectedBooking'));
  const userType = localStorage.getItem("userType");
  const latitude = selectedBooking.latitude;
  const longitude = selectedBooking.longitude;

  const freelancer = {
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: 'https://via.placeholder.com/150',
    phone: '123-456-7890',
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [ratingMessage, setRatingMessage] = useState('');

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
    let message = '';
    switch (newRating) {
      case 1:
        message = 'Bad';
        break;
      case 2:
        message = 'Below Average';
        break;
      case 3:
        message = 'Satisfactory';
        break;
      case 4:
        message = 'Good';
        break;
      case 5:
        message = 'Excellent';
        break;
      default:
        message = '';
    }
    setRatingMessage(message);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    console.log(`Rating: ${rating}, Review: ${review}`);
    // Add your submit logic here
  };

  return (
    <div>
      {userType === 'Client' && <NavbarClient />}
      {userType === 'Freelancer' && <NavbarFreelancer />}
      <div style={classes.root}>
        <Paper elevation={3} style={classes.paper}>
          <Typography variant="h4" gutterBottom fontWeight={"bold"} className='heading'>
           <span className='highlight'>Booking</span>  Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Job Title:</Typography>
              <Typography variant="body1">{selectedBooking.jobTitle}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Date:</Typography>
              <Typography variant="body1">{selectedBooking.date}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Time:</Typography>
              <Typography variant="body1">{selectedBooking.time}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Location:</Typography>
              <Typography variant="body1">{selectedBooking.location}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Pay Amount:</Typography>
              <Typography variant="body1">{selectedBooking.payAmount}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Duration:</Typography>
              <Typography variant="body1">{selectedBooking.duration}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Map Location:</Typography>
              {latitude && longitude ? (
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={classes.mapContainer}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[latitude, longitude]}>
                    <Popup>{selectedBooking.location}</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <Typography variant="body1" style={classes.noMapData}>
                  No map data found
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Freelancer Information */}
        <Paper elevation={3} style={{ ...classes.paper, ...classes.freelancerInfo }}>
          <Typography variant="h4" gutterBottom fontWeight={"bold"} className='heading'>
            <span className='highlight'>Freelancer</span> Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Name:</Typography>
              <Typography variant="body1">{freelancer.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email:</Typography>
              <Typography variant="body1">{freelancer.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone:</Typography>
              <Typography variant="body1">{freelancer.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Profile Image:</Typography>
              <img src={freelancer.profileImage} alt="Profile" style={{ width: '100px', height: '100px' }} />
            </Grid>
          </Grid>
        </Paper>

        {/* Make Payment Button */}
        <div style={classes.makePaymentButton}>
          <Button variant="contained" color="primary" >
            Make Payment
          </Button>
        </div>

        {/* Review Section */}
        <Paper elevation={3} style={{ ...classes.paper, ...classes.reviewSection }}>
          <Typography variant="h4" gutterBottom fontWeight={"bold"} className='header'>
            Review <span className="highlight">Freelancer</span> 
          </Typography>
          <div style={classes.ratingStars}>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={handleRatingChange}
              size="large"
            />
          </div>
          <Typography variant="body1" align="center">{ratingMessage}</Typography>
          <TextField
            label="Review"
            multiline
            rows={4}
            variant="outlined"
            style={classes.reviewTextarea}
            value={review}
            onChange={handleReviewChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Paper>
      </div>
      <Footer />

    </div>
  );
};

export default Booking;
