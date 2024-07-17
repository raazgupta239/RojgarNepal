import React from 'react';
import FHeader from '../component/FHeader';
import FSuggestedJobs from '../component/FSuggestedJobs';
import './../css/pageCss/FHome.css';
import Footer from '../component/Footer';
import Navbarfreelancer from "../component/Navbarfreelancer";


function FreelancerHome() {
  return (
    <>
    <Navbarfreelancer/>
    <div className="freelancer-home">
      <FHeader/>
      <FSuggestedJobs />
    </div>
    <Footer/>
    </>
  );
}
/*--*/
export default FreelancerHome;
