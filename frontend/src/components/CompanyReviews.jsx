import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import ReviewCarousel from './ReviewCarousel'; // Import the ReviewCarousel component

const companies = [
  { 
    name: 'Bella', 
    reviews: 2220, 
    rating: 3, 
    review: 'Innovative and inclusive work environment that fosters growth and creativity.',
    size: '201 to 500',
    revenue: 'more than ₹ 10B',
    industry: 'Technology',
    headquarters: 'Mumbai',
    link: 'https://bella.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Bella is a leading software company specializing in high-quality software engineering projects'
  },
  { 
    name: 'Amazon', 
    reviews: 725, 
    rating: 4, 
    review: 'Dynamic workplace with a focus on technology and customer satisfaction.',
    size: '1,000,001 and more',
    revenue: 'more than ₹ 1T',
    industry: 'E-commerce',
    headquarters: 'Seattle',
    link: 'https://amazon.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Amazon is a global leader in e-commerce, cloud computing, and artificial intelligence. We are dedicated to providing a vast selection of products and services to our customers worldwide.'
  },
  { 
    name: 'Google', 
    reviews: 257, 
    rating: 4, 
    review: 'Leading tech giant with excellent career advancement opportunities and a great culture.',
    size: '10,001 to 50,000',
    revenue: 'more than ₹ 500B',
    industry: 'Technology',
    headquarters: 'Mountain View',
    link: 'https://google.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Google is a technology leader specializing in internet services, including search, advertising, and cloud computing. We foster a culture of innovation and creativity.'
  },
  { 
    name: 'Microsoft', 
    reviews: 506, 
    rating: 4, 
    review: 'Strong focus on innovation and empowering employees to achieve their best.',
    size: '10,001 to 50,000',
    revenue: 'more than ₹ 1T',
    industry: 'Technology',
    headquarters: 'Redmond',
    link: 'https://microsoft.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Microsoft is a global technology company known for its software products, including Windows and Office. We are committed to empowering people and organizations through technology.'
  },
  { 
    name: 'Instagram', 
    reviews: 781, 
    rating: 5, 
    review: 'Creative and vibrant work environment with a focus on cutting-edge social media technology.',
    size: '1,001 to 5,000',
    revenue: 'more than ₹ 100B',
    industry: 'Social Media',
    headquarters: 'Menlo Park',
    link: 'https://instagram.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Instagram is a leading social media platform that connects people through photos and videos. We focus on creativity and innovation to enhance the user experience.'
  },
  { 
    name: 'Facebook', 
    reviews: 10040, 
    rating: 5, 
    review: 'Exceptional company with a collaborative culture and numerous opportunities for professional development.',
    size: '10,001 to 50,000',
    revenue: 'more than ₹ 1T',
    industry: 'Social Media',
    headquarters: 'Menlo Park',
    link: 'https://facebook.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Facebook is a major social media company that connects people and communities worldwide. We are dedicated to fostering a collaborative work environment and career growth.'
  },
  { 
    name: 'IBM', 
    reviews: 9634, 
    rating: 5, 
    review: 'World leader in technology and consulting with a commitment to excellence and innovation.',
    size: '50,001 and more',
    revenue: 'more than ₹ 800B',
    industry: 'Technology & Consulting',
    headquarters: 'Armonk',
    link: 'https://ibm.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'IBM is a global technology and consulting company specializing in IT services, cloud solutions, and AI. We strive for excellence and innovation in every aspect of our business.'
  },
  { 
    name: 'Apple', 
    reviews: 2953, 
    rating: 4, 
    review: 'Innovative and design-focused company with a strong emphasis on user experience and cutting-edge technology.',
    size: '1,001 to 5,000',
    revenue: 'more than ₹ 800B',
    industry: 'Technology',
    headquarters: 'Cupertino',
    link: 'https://apple.com',
    email: 'multinational.companycp@gmail.com', // Add email property
    description: 'Apple is a leader in technology and consumer electronics, known for its innovative products and design excellence. We focus on creating exceptional user experiences.'
  }
];

const renderStars = (rating) => {
  return [...Array(5)].map((_, index) => (
    <svg
      key={index}
      className={`w-6 h-6 ${index < rating ? 'text-yellow-400' : 'text-gray-300'} mr-1`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
    </svg>
  ));
};

const CompanyReviews = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/all`, { withCredentials: true });
        if (res.data.success) {
          console.log('Fetched Jobs:', res.data.jobs); // Debugging line
          setJobs(res.data.jobs);
          setFilteredJobs(res.data.jobs); // Initialize filteredJobs with all jobs
        }
      } catch (error) {
        console.log('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = jobs;

      // Filter by selected company if any
      if (selectedCompany) {
        filtered = filtered.filter(job => job.company === selectedCompany);
      }

      console.log('Filtered Jobs:', filtered); // Debugging line
      setFilteredJobs(filtered);
    };

    applyFilters();
  }, [selectedCompany, jobs]);

  const handleOpenJobsClick = (company) => {
    console.log('Selecting company:', company.name); // Debugging line
    setCurrentCompany(company);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCompany(null);
  };

  const Modal = ({ isOpen, onClose, company }) => {
    if (!isOpen || !company) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl mx-auto transform transition-all scale-95 ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-pink-800">{company.name}</h2>
          <div className="flex items-center mb-4">
            {renderStars(company.rating)}
          </div>
          <p className="text-gray-800 mb-4 italic">"{company.review}"</p>
          <div className="text-gray-700 mb-4">
            <p className="font-semibold text-pink-600">About the company:</p>
            <p>{company.description}</p>
          </div>
          <div className="text-gray-700 mb-4">
            <p className="font-semibold text-pink-600">Company size:</p>
            <p>{company.size}</p>
          </div>
          <div className="text-gray-700 mb-4">
            <p className="font-semibold text-pink-600">Revenue:</p>
            <p>{company.revenue}</p>
          </div>
          <div className="text-gray-700 mb-4">
            <p className="font-semibold text-pink-600">Industry:</p>
            <p>{company.industry}</p>
          </div>
          <div className="text-gray-700 mb-4">
            <p className="font-semibold text-pink-600">Headquarters:</p>
            <p>{company.headquarters}</p>
          </div>
          <div className="flex justify-between items-center">
            <a
              href={`mailto:${company.email}`} 
              className="text-pink-500 hover:text-pink-600 text-lg"
            >
              Queries
            </a>
            <a
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600 text-lg"
            >
              Visit Company
            </a>
            <button
              onClick={onClose}
              className="text-pink-500 hover:text-pink-600 text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <ReviewCarousel companies={companies} onCompanyClick={handleOpenJobsClick} />
      <div className="max-w-7xl mx-auto my-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Top-Rated Companies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-300 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleOpenJobsClick(company)}
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">{company.name}</h3>
              <div className="flex items-center mb-4">
                {renderStars(company.rating)}
              </div>
              <p className="text-gray-600 mb-4">{company.reviews} reviews</p>
              <p className="text-gray-800 mb-4 italic">"{company.review}"</p>
              <div className="flex justify-between items-center">
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying company reviews */}
      {currentCompany && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          company={currentCompany}
        />
      )}
    </div>
  );
};

export default CompanyReviews;
