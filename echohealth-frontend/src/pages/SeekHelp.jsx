import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './SeekHelp.css';

const containerStyle = {
  width: '100%',
  height: '350px',
};

// Dummy data: 15 specialists
const doctors = [
  { id: 1, name: 'Dr. Anita Singh',  address: 'C-15, Sector 7, Panchkula, Haryana, India',   rating: 4.7, distance: '12 km' },
  { id: 2, name: 'Dr. Rohit Verma',  address: 'Plot No.23, Sector 31, Gurugram, Haryana, India', rating: 4.5, distance: '8 km'  },
  { id: 3, name: 'Dr. Neha Sharma',  address: 'A-120, Janakpuri, Delhi, India',                 rating: 4.8, distance: '5 km'  },
  { id: 4, name: 'Dr. Rahul Mehta',  address: 'B-45, Karol Bagh, Delhi, India',                  rating: 4.6, distance: '7 km'  },
  { id: 5, name: 'Dr. Priya Kapoor', address: 'C-78, Lajpat Nagar, Delhi, India',               rating: 4.9, distance: '6 km'  },
  { id: 6, name: 'Dr. Sunil Jain',    address: 'D-12, Saket, Delhi, India',                      rating: 4.4, distance: '9 km'  },
  { id: 7, name: 'Dr. Anjali Rao',    address: 'E-34, Rohini, Delhi, India',                    rating: 4.7, distance: '10 km' },
  { id: 8, name: 'Dr. Vikram Seth',   address: 'F-56, Vasant Kunj, Delhi, India',               rating: 4.3, distance: '11 km' },
  { id: 9, name: 'Dr. Kavita Joshi',  address: 'G-90, Dwarka, Delhi, India',                   rating: 4.8, distance: '4 km'  },
  { id:10, name: 'Dr. Manish Gupta',  address: 'H-22, Munirka, Delhi, India',                  rating: 4.5, distance: '7 km'  },
  { id:11, name: 'Dr. Ritu Sharma',   address: 'J-11, Mayur Vihar, Delhi, India',               rating: 4.6, distance: '8 km'  },
  { id:12, name: 'Dr. Karan Patel',   address: 'K-33, Laxmi Nagar, Delhi, India',               rating: 4.7, distance: '6 km'  },
  { id:13, name: 'Dr. Suman Yadav',   address: 'L-44, Pitampura, Delhi, India',                  rating: 4.4, distance: '9 km'  },
  { id:14, name: 'Dr. Amit Bhatia',   address: 'M-55, Shahdara, Delhi, India',                   rating: 4.5, distance: '10 km' },
  { id:15, name: 'Dr. Richa Verma',   address: 'N-66, Punjabi Bagh, Delhi, India',               rating: 4.8, distance: '5 km'  },
];

export default function SeekHelp() {
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.2090 });
  const [search, setSearch] = useState('Delhi, India');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }),
        () => console.warn('Geolocation denied or unavailable')
      );
    }
  }, []);

  return (
    <Layout>
      <div className="seek-container">
        <h1 className="title">Find Voice Specialists Near You</h1>
        <p className="subtitle">
          Connect with certified voice specialists in your area for professional help
        </p>

        <div className="search-box">
          <label className="search-label">Search Location</label>
          <p className="search-subtext">
            Enter your location to find voice specialists nearby
          </p>
          <div className="search-input-group">
            <input
              type="text"
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
        </div>

        <div className="results-grid">
          <div className="map-wrapper">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
              >
                {doctors.map(doc => (
                  <Marker
                    key={doc.id}
                    position={{
                      lat: center.lat + (Math.random() - 0.5) * 0.1,
                      lng: center.lng + (Math.random() - 0.5) * 0.1
                    }}
                    label={doc.name}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="right-panel">
            <h2 className="panel-header">Voice Specialists</h2>
            <p className="panel-sub">{doctors.length} specialists found</p>
            {doctors.map(doc => (
              <div key={doc.id} className="doctor-card">
                <div className="doctor-info">
                  <span className="doctor-name">{doc.name}</span>
                  <p className="doctor-address">{doc.address}</p>
                  <p className="doctor-rating">Rating: {doc.rating}/5</p>
                  <p className="doctor-distance">{doc.distance} away</p>
                </div>
                <button className="contact-btn">Contact</button>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-note">
          <strong>Specialists found:</strong> Found {doctors.length} voice specialists near you
        </div>
      </div>
    </Layout>
  );
}
