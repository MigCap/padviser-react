import React from 'react';
import { Link } from 'react-router-dom';

import './HomeLanding.scss'; 

const HomePage = ({ history }) => {
  return (
    <div className="masthead">
      <div className="ui-container">
        <Link to="/rentals">
          <img
            src={process.env.PUBLIC_URL + 'img/worldmapblue.png'}
            alt="worldmap"
          />
        </Link>
        <h2>
          Book or Rent WorldWide any AV equipement just with a few clicks.
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
